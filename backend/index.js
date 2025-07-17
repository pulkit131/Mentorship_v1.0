// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user/index.js';
import planRoutes from './routes/plan/index.js';
import sessionRoutes from './routes/session/index.js';
import mentorshipRoutes from './routes/mentorship/index.js';
import paymentRoutes from './routes/payment/index.js';
import Razorpay from 'razorpay';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import bookingRoutes from './routes/booking/index.js';

dotenv.config({ path: './.env' });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Route bindings
app.use('/api/users', userRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/mentorship', mentorshipRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/bookings', bookingRoutes);
// Health check
app.get('/', (req, res) => {
  res.send('Mentorship backend is up and running 🚀');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
