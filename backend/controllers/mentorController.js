import { checkMentorIsFull } from '../services/mentorService.js';

export const isMentorFull = async (req, res) => {
  try {
    const { mentorId } = req.params;
    const isFull = await checkMentorIsFull(mentorId);
    return res.status(200).json({ isFull });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
