import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const checkMentorIsFull = async (mentorId) => {
  const mentor = await prisma.user.findUnique({
    where: { id: mentorId },
    include: {
      assignedStudents: true,
    },
  });

  if (!mentor) {
    console.log("Mentor not found");
    throw new Error('Mentor not found');
  }

  return mentor.assignedStudents.length >= 20;
};
