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

  return await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
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

/* Delete a user
*/
export const deleteUser = async (id) => {
 
 try {
   const user = await prisma.user.findUnique({ where: { id } });

   if (!user) {
     throw new Error("User not found");
   }

   if (user.role !== "USER") {
     return { success: false, message: "Only USER-role users can be deleted." };
   }

   // 1. Delete Sessions where this user is a participant
   await prisma.session.deleteMany({
     where: {
       OR: [{ userId: id }, { mentorId: id }],
     },
   });

   // 2. Delete Assignments
   await prisma.assignment.deleteMany({
     where: {
       OR: [{ studentId: id }, { mentorId: id }],
     },
   });

   // 3. Delete MentorshipAssignments
   await prisma.mentorshipAssignment.deleteMany({
     where: {
       OR: [{ studentId: id }, { mentorId: id }],
     },
   });

   // 4. Delete Waitlist Entries
   await prisma.waitlistEntry.deleteMany({
     where: {
       OR: [{ userId: id }, { mentorId: id }],
     },
   });

   // 5. Delete the User (Payment not touched)
   await prisma.user.delete({ where: { id } });

   return { success: true, message: "USER-role user deleted successfully" };
 } catch (error) {
   console.error("Error deleting user:", error);
   throw error;
 }
};

export const getAllUsersByRole = async (role) => {
  return await prisma.user.findMany({
    where: { role },
    select: { id: true, name: true, email: true, profileImage: true }
  });
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


