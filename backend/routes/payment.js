import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/payments/history?email=...
router.get("/history", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  try {
    const payments = await prisma.payment.findMany({
      where: {
        userEmail: email,
      },
      orderBy: {
        createdAt: "desc", // optional: latest first
      },
    });

    return res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching payment history:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
