import express from 'express';
import Razorpay from 'razorpay';
import bodyParser from 'body-parser';
import cors from 'cors';
import crypto from 'crypto';
import dotenv from 'dotenv'

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID; //rzp_test_bYQNJrLCnioqrF --> use these keys
const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET;//jHZVXNk7ydjBl84iilybIOZS

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_SECRET,
});


app.post('/create-order', async (req, res) => {
  const { amount, currency = 'INR', receipt } = req.body;
  try {
    const options = {
      amount: amount * 100, // amount in paise
      currency,
      receipt: receipt || `rcptid_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id, amount: order.amount, currency: order.currency, key: RAZORPAY_KEY_ID });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order', details: err.message });
  }
});

app.post('/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const generated_signature = crypto.createHmac('sha256', RAZORPAY_SECRET)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');
  if (generated_signature === razorpay_signature) {
    res.json({ success: true, message: 'Payment verified successfully' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid signature, payment verification failed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



