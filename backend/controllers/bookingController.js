import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createBooking = async (req, res) => {
  console.log(req.body);
  const { name, email, contact, mentor } = req.body;

  if (!name || !email || !contact || !mentor) {
    console.log(error);
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newBooking = await prisma.bookingRequest.create({
      data: { name, email, contact, mentor },
    });
    console.log(newBooking)
    res.status(201).json({ message: "Booking request submitted", booking: newBooking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong", details: err.message });
  }
};
