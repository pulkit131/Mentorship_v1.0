import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getBookingByUser = async (req, res) => {
  const { email } = req.params;

  try {
    const booking = await prisma.bookingRequest.findFirst({
      where: { email },
      orderBy: { createdAt: 'desc' }, // in case of multiple bookings
    });

    if (!booking) {
      return res.status(404).json({ error: 'No booking found for this user' });
    }

    return res.json({
      mentor: booking.mentor,
      date: booking.createdAt,
    });
  } catch (err) {
    console.error('Error fetching booking:', err);
    return res.status(500).json({ error: 'Server error while fetching booking' });
  }
};

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
