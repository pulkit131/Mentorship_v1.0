// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// export const getBookingByUser = async (req, res) => {
//   const { email } = req.params;

//   try {
//     const booking = await prisma.bookingRequest.findFirst({
//       where: { email },
//       orderBy: { createdAt: 'desc' }, // in case of multiple bookings
//     });

//     if (!booking) {
//       return res.status(404).json({ error: 'No booking found for this user' });
//     }

//     return res.json({
//       mentor: booking.mentor,
//       date: booking.createdAt,
//     });
//   } catch (err) {
//     console.error('Error fetching booking:', err);
//     return res.status(500).json({ error: 'Server error while fetching booking' });
//   }
// };

// export const createBooking = async (req, res) => {
//   console.log(req.body);
//   const { name, email, contact, mentor } = req.body;

//   if (!name || !email || !contact || !mentor) {
//     console.log(error);
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   try {
//     const newBooking = await prisma.bookingRequest.create({
//       data: { name, email, contact, mentor },
//     });
//     console.log(newBooking)
//     res.status(201).json({ message: "Booking request submitted", booking: newBooking });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Something went wrong", details: err.message });
//   }
// };


import * as bookingService from '../services/bookingService.js';

/**
 * Book a session with specific mentor
 */
export const bookSession = async (req, res) => {
  try {
    const { userId, mentorId, timeSlot } = req.body;

    // Validate required fields
    if (!userId || !mentorId || !timeSlot) {
      return res.status(400).json({
        error: 'userId, mentorId, and timeSlot are required'
      });
    }

    // Validate timeSlot format
    const timeSlotDate = new Date(timeSlot);
    if (isNaN(timeSlotDate.getTime())) {
      return res.status(400).json({
        error: 'Invalid timeSlot format'
      });
    }

    // Check if timeSlot is in the future
    if (timeSlotDate <= new Date()) {
      return res.status(400).json({
        error: 'Time slot must be in the future'
      });
    }

    const result = await bookingService.bookSession({ userId, mentorId, timeSlot });

    if (result.success) {
      return res.status(result.statusCode).json({
        message: result.message,
        session: result.session,
        sessionsRemaining: result.sessionsRemaining
      });
    } else {
      return res.status(result.statusCode).json({
        error: result.error,
        waitlistEntry: result.waitlistEntry
      });
    }

  } catch (error) {
    console.error('Error in bookSession controller:', error);
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
};

/**
 * Get user's sessions
 */
export const getUserSessions = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        error: 'userId is required'
      });
    }

    const sessions = await bookingService.getUserSessions(userId);
    res.status(200).json(sessions);

  } catch (error) {
    console.error('Error in getUserSessions controller:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

/**
 * Get mentor's sessions
 */
export const getMentorSessions = async (req, res) => {
  try {
    const { mentorId } = req.params;

    if (!mentorId) {
      return res.status(400).json({
        error: 'mentorId is required'
      });
    }

    const sessions = await bookingService.getMentorSessions(mentorId);
    res.status(200).json(sessions);

  } catch (error) {
    console.error('Error in getMentorSessions controller:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

/**
 * Get user's plan status and remaining sessions
 */
export const getUserPlanStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        error: 'userId is required'
      });
    }

    const planStatus = await bookingService.getUserPlanStatus(userId);
    
    if (planStatus.error) {
      return res.status(404).json({
        error: planStatus.error
      });
    }

    res.status(200).json(planStatus);

  } catch (error) {
    console.error('Error in getUserPlanStatus controller:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};

/**
 * Process waitlist for a mentor (admin function)
 */
export const processWaitlist = async (req, res) => {
  try {
    const { mentorId } = req.params;

    if (!mentorId) {
      return res.status(400).json({
        error: 'mentorId is required'
      });
    }

    const result = await bookingService.processWaitlistForMentor(mentorId);
    res.status(200).json(result);

  } catch (error) {
    console.error('Error in processWaitlist controller:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};