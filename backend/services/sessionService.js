// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// // Import the assign function
// import { assignStudentToMentor } from './mentorshipService.js';

// export const handleSession = async (data) => {
//   const { userId, mentorId, timeSlot } = data;

//   // Check if student is already assigned to this mentor
//   const existingAssignment = await prisma.mentorshipAssignment.findFirst({
//     where: {
//       studentId: userId,
//     },
//   });

//   if (!existingAssignment) {
//     // Try to assign to a mentor
//     const result = await assignStudentToMentor(userId);

//     if (result?.assignment) {
//       // Reassign mentorId to the assigned one
//       if (result.mentorId !== mentorId) {
//         return res.status(400).json({
//           error: `Student auto-assigned to mentor ${result.mentorId}. You must book with them.`,
//         });
//       }
//     } else {
//       // Student was added to waitlist
//       return res.status(403).json({
//         error: 'All mentors are full. You have been added to the waitlist.',
//       });
//     }
//   } else {
//     // Student is assigned, check if mentorId matches
//     if (existingAssignment.mentorId !== mentorId) {
//       return res.status(403).json({
//         error: 'Student is not assigned to this mentor',
//       });
//     }
//   }

//   // Proceed to create session
//   const session = await prisma.session.create({
//     data: {
//       userId,
//       mentorId,
//       timeSlot: new Date(timeSlot),
//     },
//   });

//   return res.status(200).json({ message: 'Session booked', session });
// };



// export const getSessionsByUser = async (userId) => {
//   return await prisma.session.findMany({ where: { userId } });
// };

// export const getSessionsByMentor = async (mentorId) => {
//   return await prisma.session.findMany({ where: { mentorId } });
// };