import React from "react";
import TickBox from "../assets/TickBox.png";
import { Star, Users, Target } from "lucide-react";
import { useState } from "react";

const getAuthToken = () => `Bearer ${localStorage.getItem('token')}`;

const PremiumPlans = () => {
  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;
  const API_URL = 'https://boardly-be.vercel.app';
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handlePaymentSuccess = async (response) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      showMessage('error', 'Invalid payment response. Please contact support.');
      return;
    }
    setLoading(true);
    showMessage('info', 'Verifying payment, please wait...');
    try {
      const verifyResponse = await fetch(`${API_URL}/payment/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getAuthToken(),
        },
        body: JSON.stringify({ razorpay_payment_id, razorpay_order_id, razorpay_signature }),
      });
      const verifyData = await verifyResponse.json();
      if (verifyResponse.ok) {
        showMessage('success', 'Payment successful and subscription updated!');
      } else {
        throw new Error(verifyData.error || 'Payment verification failed');
      }
    } catch (error) {
      showMessage('error', 'Payment verification failed. Please contact support.');
      console.error('Payment verification error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (planId, planPrice) => {
    setLoading(true);
    showMessage('info', 'Processing payment, please do not press back or refresh...');
    try {
      const response = await fetch(`${API_URL}/payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getAuthToken(),
        },
        body: JSON.stringify({ planType: planId }),
      });
      const orderData = await response.json();
      if (response.ok) {
        const options = {
          key: razorpayKey,
          amount: planPrice * 100,
          currency: "INR",
          name: "Boardly.in",
          description: `Payment for ${planId}`,
          order_id: orderData.orderId,
          handler: async (response) => {
            await handlePaymentSuccess(response);
          },
          prefill: {
            name: orderData.customerName,
            email: orderData.customerEmail,
          },
          theme: {
            color: "#3399cc",
          },
        };
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        throw new Error(orderData.error || 'Failed to create order');
      }
    } catch (error) {
      showMessage('error', 'Failed to initiate payment. Please try again later.');
      console.error('Payment initiation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const beginnerFeatures = [
    "4 live mentorship sessions in small, structured batches (15–20 students)",
    "Personalized learning guidance - curated free resources, tailored to your goals and level",
    "Project-first approach - build resume-worthy, mentor-reviewed projects",
    "Weekly task check-ins - stay on track with consistent accountability",
    "Early resume building support - structure it right, right from the start",
    "Peer WhatsApp group - get help, discuss problems, and grow together"
  ];

  const placementFeatures = [
    "Everything in the Base Plan, plus:",
    "Placement-centric strategy - based on your current level and time left",
    "High-impact learning focus - what to study, what to skip, what matters in real hiring",
    "Resume sharpening - real-world advice on what recruiters look for",
    "Faster-paced roadmap - tailored to your urgency and gaps",
    "Referral potential - outstanding students may be recommended by mentors"
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-2 sm:px-4 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4 text-center">
        Choose Your Plan
      </h1>
      <p className="text-xl sm:text-lg text-black text-center mb-8 font-medium max-w-2xl">
        Get unlimited access to mentors, priority booking, and exclusive resources.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full max-w-5xl">
        <div className="bg-[#dbeafe] rounded-[32px] sm:rounded-[43px] w-full flex flex-col items-center px-4 sm:px-8 pt-8 pb-6 justify-between">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-semibold text-black mb-1">
              Beginner Techy Plan
            </h2>
            <div className="flex items-start justify-center gap-1">
              <p className="text-3xl sm:text-4xl font-bold text-gray-600 line-through">₹1100</p>
              <span className="text-xl sm:text-2xl text-black mt-3">/</span>
              <p className="text-2xl sm:text-3xl font-bold text-[#0025f6] mt-3">₹599</p>
            </div>
            <p className="text-xs sm:text-sm text-black mb-1">per month</p>
          </div>
          
          <div className="flex flex-col gap-2 w-full px-1 mt-4">
            <p className="text-sm sm:text-base font-semibold text-black mb-2 text-left">Monthly Includes:</p>
            {beginnerFeatures.map((text, index) => (
              <div
                key={index}
                className="flex items-start gap-3 text-black text-sm sm:text-base font-medium"
              >
                <img src={TickBox} alt="TickBox" className="w-6 h-8 mt-0.5 flex-shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>
          
          <div className="bg-[#f0f9ff] rounded-2xl p-4 mt-4 w-full">
            <p className="text-sm font-semibold text-[#0025f6] text-center">
              Best suited for: Students in 1st–3rd year or early-stage learners needing direction, consistency, and real output
            </p>
          </div>
          
          <div className="flex flex-col items-center w-full mt-6">
            <button className="w-full sm:w-[90%] h-12 sm:h-[56px] bg-[#155efb] text-white rounded-xl font-semibold mb-2 text-lg sm:text-2xl leading-tight hover:bg-[#1346c2] transition duration-300"
              onClick={() => handlePayment('BEGINNER', 599)}
              disabled={loading}
            >
              Subscribe Now
            </button>
            <p className="text-xs font-semibold text-black text-center mt-1">
              Secure payment powered by Razorpay | Early bird offer
            </p>
          </div>
        </div>

        <div className="bg-[#dbeafe] rounded-[32px] sm:rounded-[43px] w-full flex flex-col items-center px-4 sm:px-8 pt-8 pb-6 justify-between relative">
          <div className="absolute -top-4 bg-[#155efb] text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
            <Star className="w-4 h-4" />
            Most Popular
          </div>
          
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-semibold text-black mb-1">
              Placement-Focused Plan
            </h2>
            <div className="flex items-start justify-center gap-1">
              <p className="text-3xl sm:text-4xl font-bold text-gray-600 line-through">₹1500</p>
              <span className="text-xl sm:text-2xl text-black mt-3">/</span>
              <p className="text-2xl sm:text-3xl font-bold text-[#0025f6] mt-3">₹799</p>
            </div>
            <p className="text-xs sm:text-sm text-black mb-1">per month</p>
          </div>
          
          <div className="flex flex-col gap-2 w-full px-1 mt-4">
            <p className="text-sm sm:text-base font-semibold text-black mb-2 text-left">
              Monthly Includes:
            </p>
            {placementFeatures.map((text, index) => (
              <div
                key={index}
                className="flex items-start gap-3 text-black text-sm sm:text-base font-medium"
              >
                <img src={TickBox} alt="TickBox" className="w-6 h-8 mt-0.5 flex-shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>
          
          <div className="bg-[#f0f9ff] rounded-2xl p-4 mt-4 w-full">
            <p className="text-sm font-semibold text-[#0025f6] text-center">
              Best suited for: Final-year students, late-stage upskillers, or those preparing to enter the job market
            </p>
          </div>
          
          <div className="flex flex-col items-center w-full mt-6">
            <button className="w-full sm:w-[90%] h-12 sm:h-[56px] bg-[#155efb] text-white rounded-xl font-semibold mb-2 text-lg sm:text-2xl leading-tight hover:bg-[#1346c2] transition duration-300"
              onClick={() => handlePayment('PLACEMENT', 799)}
              disabled={loading}
            >
              Subscribe Now
            </button>
            <p className="text-xs font-semibold text-black text-center mt-1">
              Secure payment powered by Razorpay | Early bird offer
            </p>
          </div>
        </div>
      </div>
      {message.text && (
        <div
          className={`message mt-6 p-4 rounded-md text-center font-medium ${message.type === 'success' ? 'bg-green-100 text-green-700' : message.type === 'info' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
};

export default PremiumPlans;