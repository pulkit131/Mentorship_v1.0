// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// /**
//  * Assigns a student to a mentor if slots are available.
//  * Adds to waitlist if all mentors are full.
//  */
// export const assignStudentToMentor = async (studentId) => {
//   // Check if student already assigned
//   const existing = await prisma.mentorshipAssignment.findFirst({
//     where: { studentId },
//   });
//   if (existing) {
//     return { message: 'Already assigned to a mentor.' };
//   }

//   // Get all mentors
//   const mentors = await prisma.user.findMany({
//     where: { role: 'MENTOR' },
//   });

//   for (const mentor of mentors) {
//     const count = await prisma.mentorshipAssignment.count({
//       where: { mentorId: mentor.id },
//     });

//     if (count < 20) {
//       const assignment = await prisma.mentorshipAssignment.create({
//         data: {
//           studentId,
//           mentorId: mentor.id,
//         },
//       });

//       return {
//         message: `Assigned to mentor ${mentor.name}`,
//         mentorId: mentor.id,
//         assignment,
//       };
//     }
//   }

//   // If no mentor has room, add to waitlist
//   const waitlist = await prisma.waitlistEntry.create({
//     data: {
//       userId: studentId,
//     },
//   });

//   return {
//     message: 'All mentors are full. Student added to waitlist.',
//     waitlist,
//   };
// };

// /**
//  * Move a student from the waitlist to an available mentor slot
//  */
// export const fillMentorSlotFromWaitlist = async () => {
//   const mentors = await prisma.user.findMany({
//     where: { role: 'MENTOR' },
//   });

//   for (const mentor of mentors) {
//     const count = await prisma.mentorshipAssignment.count({
//       where: { mentorId: mentor.id },
//     });

//     if (count < 20) {
//       const nextStudent = await prisma.waitlistEntry.findFirst({
//         orderBy: { createdAt: 'asc' },
//       });

//       if (!nextStudent) return { message: 'Waitlist is empty' };

//       const assignment = await prisma.mentorshipAssignment.create({
//         data: {
//           studentId: nextStudent.userId,
//           mentorId: mentor.id,
//         },
//       });

//       await prisma.waitlistEntry.delete({
//         where: { id: nextStudent.id },
//       });

//       return {
//         message: `Moved waitlisted student to mentor ${mentor.name}`,
//         assignment,
//       };
//     }
//   }

//   return { message: 'No available mentor slots' };
// };
