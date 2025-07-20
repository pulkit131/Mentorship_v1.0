import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getMentorWaitlistStatus = async (req, res) => {
  const { mentorId } = req.params;
  if (!mentorId) return res.status(400).json({ error: 'mentorId is required' });
  try {
    // Count sessions for this mentor
    const sessionCount = await prisma.session.count({ where: { mentorId } });
    res.json({ waitlist: sessionCount >= 20 });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};


import * as bookingService from '../services/bookingService.js';

/**
 * Book a session with specific mentor
 */
export const bookSession = async (req, res) => {
  try {
    const { userId, mentorId } = req.body;

    // Validate required fields
    if (!userId || !mentorId) {
      return res.status(400).json({
        error: 'userId and mentorId are required'
      });
    }

    // Call booking service (without timeSlot)
    const result = await bookingService.bookSession({ userId, mentorId });

    if (result.success) {
      return res.status(result.statusCode).json({
        message: result.message,
        session: result.session,
        sessionsRemaining: result.sessionsRemaining
      });
    } else {
      return res.status(result.statusCode).json({
        error: result.error,
        waitlistEntry: result.waitlistEntry,
        requiresPayment: result.requiresPayment
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