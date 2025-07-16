import {
  assignStudentToMentor,
  fillMentorSlotFromWaitlist,
} from '../services/mentorshipService.js';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const assignMentorController = async (req, res) => {
  try {
    const { studentId } = req.body;
    if (!studentId) {
      return res.status(400).json({ error: 'studentId is required' });
    }

    const result = await assignStudentToMentor(studentId);
    res.status(200).json(result);
  } catch (err) {
    console.error('Error assigning mentor:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const fillSlotFromWaitlistController = async (req, res) => {
  try {
    const result = await fillMentorSlotFromWaitlist();
    res.status(200).json(result);
  } catch (err) {
    console.error('Error filling mentor slot:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const viewAssignmentsController = async (req, res) => {
  const assignments = await prisma.mentorshipAssignment.findMany({
    include: {
      student: true,
      mentor: true,
    },
  });
  res.json(assignments);
};

export const viewWaitlistController = async (req, res) => {
  const waitlist = await prisma.waitlistEntry.findMany({
    include: {
      user: true,
    },
  });
  res.json(waitlist);
};
