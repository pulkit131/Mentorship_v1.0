import * as planService from '../services/planService.js';

export const createPlan = async (req, res) => {
  try {
    const { name, description, price, features } = req.body;
    const plan = await planService.createPlan({ name, description, price, features });
    res.status(201).json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllPlans = async (req, res) => {
  try {
    const plans = await planService.getAllPlans();
    res.status(200).json(plans);
    console.log(plans)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};