import * as waitlistService from '../services/waitlistService.js';

/**
 * Add user to waitlist
 */
export const addToWaitlist = async (req, res) => {
  try {
    const { userId, mentorId } = req.body;

    if (!userId || !mentorId) {
      return res.status(400).json({
        error: 'userId and mentorId are required'
      });
    }

    const result = await waitlistService.addToWaitlist(userId, mentorId);

    if (result.success) {
      return res.status(result.statusCode).json({
        message: result.message,
        waitlistEntry: result.waitlistEntry
      });
    } else {
      return res.status(result.statusCode).json({
        error: result.error
      });
    }

  } catch (error) {
    console.error('Error in addToWaitlist controller:', error);
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
};

/**
 * Remove user from waitlist
 */
export const removeFromWaitlist = async (req, res) => {
  try {
    const { userId, mentorId } = req.body;

    if (!userId || !mentorId) {
      return res.status(400).json({
        error: 'userId and mentorId are required'
      });
    }

    const result = await waitlistService.removeFromWaitlist(userId, mentorId);

    if (result.success) {
      return res.status(result.statusCode).json({
        message: result.message
      });
    } else {
      return res.status(result.statusCode).json({
        error: result.error
      });
    }

  } catch (error) {
    console.error('Error in removeFromWaitlist controller:', error);
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
};

/**
 * Get user's waitlist entries
 */
export const getUserWaitlistEntries = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        error: 'userId is required'
      });
    }

    const result = await waitlistService.getUserWaitlistEntries(userId);

    if (result.success) {
      return res.status(result.statusCode).json({
        waitlistEntries: result.waitlistEntries
      });
    } else {
      return res.status(result.statusCode).json({
        error: result.error
      });
    }

  } catch (error) {
    console.error('Error in getUserWaitlistEntries controller:', error);
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
};

/**
 * Get mentor's waitlist entries
 */
export const getMentorWaitlistEntries = async (req, res) => {
  try {
    const { mentorId } = req.params;

    if (!mentorId) {
      return res.status(400).json({
        error: 'mentorId is required'
      });
    }

    const result = await waitlistService.getMentorWaitlistEntries(mentorId);

    if (result.success) {
      return res.status(result.statusCode).json({
        waitlistEntries: result.waitlistEntries
      });
    } else {
      return res.status(result.statusCode).json({
        error: result.error
      });
    }

  } catch (error) {
    console.error('Error in getMentorWaitlistEntries controller:', error);
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
}; 