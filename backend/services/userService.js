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

export const subscribeToPlan = async ({ email, planId }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');

  const plan = await prisma.plan.findUnique({ where: { id: planId } });
  if (!plan) throw new Error('Plan not found');

  let freeSessions = 0;
  if (plan.name === 'BASIC') freeSessions = 4;

  const updatedUser = await prisma.user.update({
    where: { email },
    data: {
      planType: plan.name,
      planPrice: Math.floor(plan.price),
      freeSessions,
    },
  });

  return {
    message: `Subscribed to ${plan.name}`,
    user: updatedUser,
  };
};

export const checkSessionBookingAllowedByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) throw new Error('User not found');

  return {
    allowed: user.planType !== 'BASIC',
    planType: user.planType,
  };
};


