import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Main booking function - handles all logic
 */
export const bookSession = async (data) => {
  const { userId, mentorId, timeSlot } = data;

  try {
    // 1. Get user with current plan info
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        mentorAssignment: true
      }
    });

    if (!user) {
      return {
        success: false,
        error: 'User not found',
        statusCode: 404
      };
    }

    // 2. Check if user has valid plan and payment
    if (user.planType === 'BASIC') {
      return {
        success: false,
        error: 'Basic plan users cannot book sessions. Please upgrade your plan.',
        statusCode: 403
      };
    }

    // Check if user has made a payment
    const latestPayment = await prisma.payment.findFirst({
      where: { 
        userEmail: user.email,
        status: 'completed'
      },
      orderBy: { createdAt: 'desc' }
    });

    if (!latestPayment) {
      return {
        success: false,
        error: 'No payment found. Please make a payment before booking sessions.',
        statusCode: 403
      };
    }

    // Check if payment is still valid (not expired)
    const now = new Date();
    if (now > latestPayment.subscriptionEnds) {
      return {
        success: false,
        error: 'Your payment has expired. Please renew your subscription.',
        statusCode: 403
      };
    }

    // 3. Check if user's plan is active and has sessions left
    // const planCheck = await checkUserPlanStatus(user);
    // if (!planCheck.valid) {
    //   return {
    //     success: false,
    //     error: planCheck.error,
    //     statusCode: 403
    //   };
    // }

    // 4. Check mentor exists and is actually a mentor
    const mentor = await prisma.user.findUnique({
      where: { id: mentorId },
      include: {
        assignedStudents: true
      }
    });

    if (!mentor || mentor.role !== 'MENTOR') {
      return {
        success: false,
        error: 'Invalid mentor',
        statusCode: 404
      };
    }

    // 5. Check if mentor has capacity (less than 20 students)
    if (mentor.assignedStudents.length >= 20) {
      // Add to waitlist for this specific mentor
      const waitlistEntry = await addToWaitlist(userId, mentorId);
      return {
        success: false,
        error: 'Mentor is full. You have been added to the waitlist.',
        waitlistEntry,
        statusCode: 202
      };
    }

    // 6. Check time slot availability
    const timeConflict = await checkTimeSlotAvailability(mentorId, userId, timeSlot);
    if (!timeConflict.available) {
      return {
        success: false,
        error: timeConflict.error,
        statusCode: 409
      };
    }

    // 7. Assign user to mentor (if not already assigned)
    if (!user.mentorAssignment) {
      await prisma.assignment.create({
        data: {
          studentId: userId,
          mentorId: mentorId
        }
      });
    } else if (user.mentorAssignment.mentorId !== mentorId) {
      return {
        success: false,
        error: 'You are already assigned to a different mentor',
        statusCode: 403
      };
    }

    // 8. Create session and update user session count
    const [session, updatedUser] = await prisma.$transaction([
      prisma.session.create({
        data: {
          userId,
          mentorId,
          timeSlot: new Date(timeSlot)
        },
        include: {
          user: { select: { id: true, name: true, email: true } },
          mentor: { select: { id: true, name: true, email: true } }
        }
      }),
      prisma.user.update({
        where: { id: userId },
        data: {
          sessionCount: user.sessionCount + 1
        }
      })
    ]);

    return {
      success: true,
      message: 'Session booked successfully',
      session,
      sessionsRemaining: 4 - (user.sessionCount + 1),
      statusCode: 201
    };

  } catch (error) {
    console.error('Error in bookSession:', error);
    return {
      success: false,
      error: 'Internal server error',
      statusCode: 500
    };
  }
};

/**
 * Check if user has valid plan and sessions remaining
 */
export const checkUserPlanStatus = async (user) => {
  // Get user's latest payment
  const latestPayment = await prisma.payment.findFirst({
    where: { 
      userEmail: user.email,
      status: 'completed' // or whatever status indicates successful payment
    },
    orderBy: { createdAt: 'desc' }
  });

  if (!latestPayment) {
    return {
      valid: false,
      error: 'No valid payment found. Please purchase a plan.'
    };
  }

  const now = new Date();
  
  // Check if plan is expired
  if (now > latestPayment.subscriptionEnds) {
    return {
      valid: false,
      error: 'Your plan has expired. Please renew your subscription.'
    };
  }

  // Check if user has sessions remaining
  if (user.sessionCount >= 4) {
    return {
      valid: false,
      error: 'You have used all 4 sessions for this billing period.'
    };
  }

  return { valid: true };
};

/**
 * Check if the time slot is available
 */
const checkTimeSlotAvailability = async (mentorId, userId, timeSlot) => {
  const targetTime = new Date(timeSlot);

  // Check if mentor has another session at this time
  const mentorConflict = await prisma.session.findFirst({
    where: {
      mentorId,
      timeSlot: targetTime
    }
  });

  if (mentorConflict) {
    return {
      available: false,
      error: 'Mentor already has a session at this time slot'
    };
  }

  // Check if user has another session at this time
  const userConflict = await prisma.session.findFirst({
    where: {
      userId,
      timeSlot: targetTime
    }
  });

  if (userConflict) {
    return {
      available: false,
      error: 'You already have a session at this time slot'
    };
  }

  return { available: true };
};

/**
 * Add user to waitlist for specific mentor
 */
const addToWaitlist = async (userId, mentorId) => {
  // Check if already on waitlist for this mentor
  const existing = await prisma.waitlistEntry.findFirst({
    where: { userId, mentorId }
  });

  if (existing) {
    return existing;
  }

  return await prisma.waitlistEntry.create({
    data: { userId, mentorId }
  });
};

/**
 * Auto-assign from waitlist when mentor gets capacity
 */
export const processWaitlistForMentor = async (mentorId) => {
  try {
    // Get mentor's current student count
    const mentor = await prisma.user.findUnique({
      where: { id: mentorId },
      include: {
        assignedStudents: true
      }
    });

    if (!mentor || mentor.assignedStudents.length >= 20) {
      return { message: 'Mentor is still full' };
    }

    // Get oldest waitlist entry for this mentor
    const waitlistEntry = await prisma.waitlistEntry.findFirst({
      where: { mentorId },
      orderBy: { createdAt: 'asc' },
      include: { user: true }
    });

    if (!waitlistEntry) {
      return { message: 'No one on waitlist for this mentor' };
    }

    // Create assignment and remove from waitlist
    const [assignment] = await prisma.$transaction([
      prisma.assignment.create({
        data: {
          studentId: waitlistEntry.userId,
          mentorId: mentorId
        }
      }),
      prisma.waitlistEntry.delete({
        where: { id: waitlistEntry.id }
      })
    ]);

    return {
      message: 'Successfully assigned student from waitlist',
      assignment,
      student: waitlistEntry.user
    };

  } catch (error) {
    console.error('Error processing waitlist:', error);
    throw error;
  }
};

/**
 * Get user's sessions
 */
export const getUserSessions = async (userId) => {
  return await prisma.session.findMany({
    where: { userId },
    include: {
      mentor: { select: { id: true, name: true, email: true } }
    },
    orderBy: { timeSlot: 'asc' }
  });
};

/**
 * Get mentor's sessions
 */
export const getMentorSessions = async (mentorId) => {
  return await prisma.session.findMany({
    where: { mentorId },
    include: {
      user: { select: { id: true, name: true, email: true } }
    },
    orderBy: { timeSlot: 'asc' }
  });
};

/**
 * Get user's current plan status
 */
export const getUserPlanStatus = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    return { error: 'User not found' };
  }

  const latestPayment = await prisma.payment.findFirst({
    where: { 
      userEmail: user.email,
      status: 'completed'
    },
    orderBy: { createdAt: 'desc' }
  });

  return {
    planType: user.planType,
    sessionCount: user.sessionCount,
    sessionsRemaining: user.planType === 'BASIC' ? 0 : Math.max(0, 4 - user.sessionCount),
    planActive: latestPayment ? new Date() <= latestPayment.subscriptionEnds : false,
    planEndDate: latestPayment?.subscriptionEnds
  };
};