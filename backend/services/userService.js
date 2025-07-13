import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const PLAN_PRICING = {
  BASIC: 0,
  BEGINNER_TECHY: 599,
  PLACEMENT_FOCUSED: 799,
};

const VALID_ROLES = ['USER', 'MENTOR'];
const VALID_PLAN_TYPES = Object.keys(PLAN_PRICING);

/**
 * Create a new user
 */
export const createUser = async ({ name, email, profileImage, role = 'USER', planType = 'BASIC' }) => {
  if (!VALID_ROLES.includes(role)) {
    throw new Error('Invalid role. Allowed values: USER, MENTOR');
  }

  if (!VALID_PLAN_TYPES.includes(planType)) {
    throw new Error('Invalid planType. Allowed values: BASIC, BEGINNER_TECHY, PLACEMENT_FOCUSED');
  }

  const planPrice = PLAN_PRICING[planType];
  const freeSessions = planType === 'BASIC' ? 4 : 0;

  return await prisma.user.create({
    data: {
      name,
      email,
      profileImage,
      role,
      planType,
      planPrice,
      freeSessions,
    },
  });
};

/**
 * Get all users
 */
export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

/**
 * Delete a user
 */
export const deleteUser = async (id) => {
  return await prisma.user.delete({ where: { id } });
};
