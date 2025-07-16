import * as userService from '../services/userService.js';

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
    const users = await userService.getAllUsers();
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

export const hasPlanController = async (req, res) => {
  try {
    const { email } = req.params;
    const result = await userService.checkUserHasPlan(email);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
