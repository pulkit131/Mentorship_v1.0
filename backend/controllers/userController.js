import { PrismaClient } from '@prisma/client';
import * as userService from '../services/userService.js';
const prisma = new PrismaClient();

export const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const { role } = req.query;
    let users;
    if (role) {
      users = await userService.getAllUsersByRole(role);
    } else {
      users = await userService.getAllUsers();
    }
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const subscribeUserToPlan = async (req, res) => {
  try {
    const { email, planId } = req.body;
    if (!email || !planId) {
      return res.status(400).json({ error: 'email and planId are required' });
    }

    const result = await userService.subscribeToPlan({ email, planId });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const checkBookingAllowedByEmailController = async (req, res) => {
  try {
    const { email } = req.params;
    const result = await userService.checkSessionBookingAllowedByEmail(email);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const checkUserExists = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      return res.status(200).json({ exists: true, user });
    } else {
      return res.status(404).json({ exists: false });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
};

