import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createSession = async ({ userId, mentorId, timeSlot }) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error('User not found');

  if (user.planType === 'BASIC' && user.freeSessions <= 0) {
    throw new Error('Free session limit exceeded');
  }

  const session = await prisma.session.create({
    data: { userId, mentorId, timeSlot: new Date(timeSlot) },
  });

  if (user.planType === 'BASIC') {
    await prisma.user.update({
      where: { id: userId },
      data: { freeSessions: { decrement: 1 } },
    });
  }

  return {
    message: 'Session booked successfully',
    session,
    remainingFreeSessions: user.planType === 'BASIC' ? user.freeSessions - 1 : null,
  };
};

export const getSessionsByUser = async (userId) => {
  return await prisma.session.findMany({ where: { userId } });
};

export const getSessionsByMentor = async (mentorId) => {
  return await prisma.session.findMany({ where: { mentorId } });
};