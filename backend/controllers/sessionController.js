// import * as sessionService from '../services/sessionService.js';

// export const createSession = async (req, res) => {
//   try {
//     const { userId, mentorId, timeSlot } = req.body;
//     const result = await sessionService.handleSession({ userId, mentorId, timeSlot });
//     res.status(201).json(result);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: err.message });
//   }
// };

// export const getSessionsByUser = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const sessions = await sessionService.getSessionsByUser(userId);
//     res.status(200).json(sessions);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const getSessionsByMentor = async (req, res) => {
//   try {
//     const { mentorId } = req.params;
//     const sessions = await sessionService.getSessionsByMentor(mentorId);
//     res.status(200).json(sessions);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };