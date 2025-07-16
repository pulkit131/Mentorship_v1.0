import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createPlan = async ({ name, description, price, features }) => {
  return await prisma.plan.create({
    data: { name, description, price, features },
  });
};

export const getAllPlans = async () => {
  return await prisma.plan.findMany();
};