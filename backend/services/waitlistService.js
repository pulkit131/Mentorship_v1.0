import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Add user to waitlist without payment requirement
 */
export const addToWaitlist = async (userId, mentorId) => {
  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return {
        success: false,
        error: 'User not found',
        statusCode: 404
      };
    }

    // Check if mentor exists and is actually a mentor
    const mentor = await prisma.user.findUnique({
      where: { id: mentorId }
    });

    if (!mentor || mentor.role !== 'MENTOR') {
      return {
        success: false,
        error: 'Invalid mentor',
        statusCode: 404
      };
    }

    // Check if already on waitlist for this mentor
    const existing = await prisma.waitlistEntry.findFirst({
      where: { userId, mentorId }
    });

    if (existing) {
      return {
        success: true,
        message: 'Already on waitlist for this mentor',
        waitlistEntry: existing,
        statusCode: 200
      };
    }

    // Create waitlist entry
    const waitlistEntry = await prisma.waitlistEntry.create({
      data: { userId, mentorId },
      include: {
        user: { select: { id: true, name: true, email: true } },
        mentor: { select: { id: true, name: true, email: true } }
      }
    });

    return {
      success: true,
      message: 'Successfully added to waitlist',
      waitlistEntry,
      statusCode: 201
    };

  } catch (error) {
    console.error('Error in addToWaitlist:', error);
    return {
      success: false,
      error: 'Internal server error',
      statusCode: 500
    };
  }
};

/**
 * Remove user from waitlist
 */
export const removeFromWaitlist = async (userId, mentorId) => {
  try {
    const waitlistEntry = await prisma.waitlistEntry.findFirst({
      where: { userId, mentorId }
    });

    if (!waitlistEntry) {
      return {
        success: false,
        error: 'Not found on waitlist for this mentor',
        statusCode: 404
      };
    }

    await prisma.waitlistEntry.delete({
      where: { id: waitlistEntry.id }
    });

    return {
      success: true,
      message: 'Successfully removed from waitlist',
      statusCode: 200
    };

  } catch (error) {
    console.error('Error in removeFromWaitlist:', error);
    return {
      success: false,
      error: 'Internal server error',
      statusCode: 500
    };
  }
};

/**
 * Get user's waitlist entries
 */
export const getUserWaitlistEntries = async (userId) => {
  try {
    const waitlistEntries = await prisma.waitlistEntry.findMany({
      where: { userId },
      include: {
        mentor: { select: { id: true, name: true, email: true } }
      },
      orderBy: { createdAt: 'asc' }
    });

    return {
      success: true,
      waitlistEntries,
      statusCode: 200
    };

  } catch (error) {
    console.error('Error in getUserWaitlistEntries:', error);
    return {
      success: false,
      error: 'Internal server error',
      statusCode: 500
    };
  }
};

/**
 * Get mentor's waitlist entries
 */
export const getMentorWaitlistEntries = async (mentorId) => {
  try {
    const waitlistEntries = await prisma.waitlistEntry.findMany({
      where: { mentorId },
      include: {
        user: { select: { id: true, name: true, email: true } }
      },
      orderBy: { createdAt: 'asc' }
    });

    return {
      success: true,
      waitlistEntries,
      statusCode: 200
    };

  } catch (error) {
    console.error('Error in getMentorWaitlistEntries:', error);
    return {
      success: false,
      error: 'Internal server error',
      statusCode: 500
    };
  }
};

/**
 * Process waitlist when user makes payment
 */
export const processWaitlistAfterPayment = async (userId) => {
  try {
    // Get user's waitlist entries
    const waitlistEntries = await prisma.waitlistEntry.findMany({
      where: { userId },
      include: {
        mentor: {
          include: {
            assignedStudents: true
          }
        }
      }
    });

    const results = [];

    for (const entry of waitlistEntries) {
      // Check if mentor has capacity
      if (entry.mentor.assignedStudents.length < 20) {
        // Create assignment
        await prisma.assignment.create({
          data: {
            studentId: userId,
            mentorId: entry.mentorId
          }
        });

        // Remove from waitlist
        await prisma.waitlistEntry.delete({
          where: { id: entry.id }
        });

        results.push({
          mentorId: entry.mentorId,
          mentorName: entry.mentor.name,
          action: 'assigned'
        });
      } else {
        results.push({
          mentorId: entry.mentorId,
          mentorName: entry.mentor.name,
          action: 'still_on_waitlist'
        });
      }
    }

    return {
      success: true,
      message: 'Processed waitlist entries after payment',
      results,
      statusCode: 200
    };

  } catch (error) {
    console.error('Error in processWaitlistAfterPayment:', error);
    return {
      success: false,
      error: 'Internal server error',
      statusCode: 500
    };
  }
}; 