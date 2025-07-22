// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user/index.js';
import planRoutes from './routes/plan/index.js';
//import sessionRoutes from './routes/session/index.js';
//import mentorshipRoutes from './routes/mentorship/index.js';
import paymentRoutes from './routes/payment/index.js';
import bookingRoutes from './routes/booking/index.js';
import waitlistRoutes from './routes/waitlist/index.js';
import mentorRoutes from './routes/mentor/index.js';
import paymentHistoryRoutes from "./routes/payment.js";
//import mentorshipRoutes from './routes/mentorship/index.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'https://letsgetmentor.com', credentials: true }));
app.use(express.json());

// Route bindings
app.use('/api/users', userRoutes);
app.use('/api/plans', planRoutes);
//app.use('/api/sessions', sessionRoutes);
//app.use('/api/mentorship', mentorshipRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/waitlist', waitlistRoutes);
app.use('/api/mentors', mentorRoutes);
app.use("/api/payments", paymentHistoryRoutes);
// Health check
app.get('/', (req, res) => {
  res.send('Mentorship backend is up and running 🚀');
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

