import React from "react";
import TickBox from "../assets/TickBox.png";
import { Star, Users, Target } from "lucide-react";
import { usePaymentStore } from "../store/usePaymentStore";
import { useUserStore } from "../store/useUserStore";
import RazorpayLogo from "../assets/razorpay.png";

const PremiumPlans = () => {
  //earlier points
  // const beginnerFeatures = [
  //   "4 live mentorship sessions in small, structured batches (15–20 students)",
  //   "Personalized learning guidance - curated free resources, tailored to your goals and level",
  //   "Project-first approach - build resume-worthy, mentor-reviewed projects",
  //   "Weekly task check-ins - stay on track with consistent accountability",
  //   "Early resume building support - structure it right, right from the start",
  //   "Peer WhatsApp group - get help, discuss problems, and grow together"
  // ];

  // const placementFeatures = [
  //   "Everything in the Base Plan, plus:",
  //   "Placement-centric strategy - based on your current level and time left",
  //   "High-impact learning focus - what to study, what to skip, what matters in real hiring",
  //   "Resume sharpening - real-world advice on what recruiters look for",
  //   "Faster-paced roadmap - tailored to your urgency and gaps",
  //   "Referral potential - outstanding students may be recommended by mentors"
  // ];

  const user = useUserStore((state) => state.user);
  const userEmail = localStorage.getItem("userEmail");
  const checkUserHasPlan = useUserStore((state) => state.checkUserHasPlan);

  const handleSubscribe = async (planType, amount, email) => {
    if (!user) {
      alert("no user!");
    }
    if (!email) {
      alert("Please log in to subscribe.");
      return;
    }
    const { createOrder, verifyPayment } = usePaymentStore.getState();

    const orderData = await createOrder({ amount }); // amount in INR (₹)
    if (!orderData) return;

    const options = {
      key: orderData.key,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Mentorship",
      description: planType,
      order_id: orderData.orderId,
      handler: async (response) => {
        const result = await verifyPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          email,
          planType,
        });
        if (result.success) {
          // check if the user plan
          const planStatus = await checkUserHasPlan(email);

          console.log("Plan status after payment:", planStatus);
          alert("Payment successful! Your plan is now active.");
        } else {
          alert("Payment verification failed.");
        }
      },
      prefill: {
        name: email.split("@")[0],
        email: email,
      },
      theme: {
        color: "#155efb",
      },
    };

    if (!window.Razorpay) {
      alert(
        "Razorpay SDK failed to load. Please check your internet connection and try again."
      );
      return;
    }

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const beginnerFeatures = [
    "4 live sessions in small batches (15–20 students)",
    "Personalized guidance with curated free resources",
    "Project-first learning with mentor feedback",
    "Weekly task check-ins for accountability",
    "Start resume building from day one",
    "Peer WhatsApp group for support & growth",
  ];

  const placementFeatures = [
    "All Base Plan features, +:",
    "Strategy based on level & time left",
    "Focus on what matters for hiring",
    "Resume polishing with recruiter insights",
    "Faster roadmap based on your urgency",
    "Top students may get mentor referrals",
  ];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-2 sm:px-4 py-8">
      <div className="w-full flex justify-center mt-8">
        <div className="bg-[#24282f] text-[#0047ab] text-xl font-semibold rounded-full px-6 py-2 text-sm flex items-center gap-2 shadow-sm">
          <span role="img" aria-label="celebration">
            🎉
          </span>
          Early Bird Offer – Limited Time Only!
        </div>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4 text-center">
        Choose Your Plan
      </h1>
      <p className="text-xl sm:text-lg text-black text-center mb-8 font-medium max-w-2xl">
        Get unlimited access to mentors, priority booking, and exclusive
        resources.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full max-w-5xl">
        <div className="bg-white border border-3 border-[#dbeafe] rounded-[32px] sm:rounded-[43px] w-full flex flex-col items-center px-4 sm:px-8 pt-8 pb-6 justify-between">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-semibold text-black mb-1">
              Beginner Techy Plan
            </h2>
            <div className="flex items-start justify-center gap-1">
              <p className="text-3xl sm:text-4xl font-bold text-gray-600 line-through">
                ₹1100
              </p>
              <span className="text-xl sm:text-2xl text-black mt-3">/</span>
              <p className="text-2xl sm:text-3xl font-bold text-[#0025f6] mt-3">
                ₹599
              </p>
            </div>
            <p className="text-xs sm:text-sm text-black mb-1">per month</p>
          </div>
          <div className="bg-[#f0f9ff] border-l-4 border-[#155efb] rounded-lg p-3 w-full mb-4">
            <p className="text-sm sm:text-base font-semibold text-[#0025f6] text-left">
              Best suited for:{" "}
              <span className="font-bold text-black">
                Students in 1st–3rd year or early-stage learners needing
                direction, consistency, and real output
              </span>
            </p>
          </div>

          <div className="flex flex-col gap-2 w-full px-1 mt-4">
            <p className="text-sm sm:text-base font-semibold text-black mb-2 text-left">
              Monthly Includes:
            </p>
            {beginnerFeatures.map((text, index) => (
              <div
                key={index}
                className="flex items-start gap-3 text-black text-sm sm:text-base font-medium"
              >
                <img
                  src={TickBox}
                  alt="TickBox"
                  className="w-6 h-8 mt-0.5 flex-shrink-0"
                />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center w-full mt-6">
            <button
              className="w-full sm:w-[90%] h-12 sm:h-[56px] bg-[#155efb] text-white rounded-xl font-semibold mb-2 text-lg sm:text-2xl leading-tight hover:bg-[#1346c2] transition duration-300"
              onClick={() => handleSubscribe("BEGINNER_TECHY", 599, userEmail)}
            >
              Subscribe Now
            </button>
            <p className="text-xl font-semibold text-black text-center mt-1 flex items-center justify-center gap-1">
              Secure payment powered by
              <img
                src={RazorpayLogo}
                alt="Razorpay"
                className="h-11 object-contain"
              />
            </p>
          </div>
        </div>

        <div className="bg-white border border-3 border-[#dbeafe] rounded-[32px] sm:rounded-[43px] w-full flex flex-col items-center px-4 sm:px-8 pt-8 pb-6 justify-between relative">
          <div className="absolute -top-4 bg-[#155efb] text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
            <Star className="w-4 h-4" />
            Most Popular
          </div>

          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-semibold text-black mb-1">
              Placement-Focused Plan
            </h2>
            <div className="flex items-start justify-center gap-1">
              <p className="text-3xl sm:text-4xl font-bold text-gray-600 line-through">
                ₹1500
              </p>
              <span className="text-xl sm:text-2xl text-black mt-3">/</span>
              <p className="text-2xl sm:text-3xl font-bold text-[#0025f6] mt-3">
                ₹799
              </p>
            </div>
            <p className="text-xs sm:text-sm text-black mb-1">per month</p>
          </div>

          <div className="bg-[#f0f9ff] border-l-4 border-[#155efb] rounded-lg p-3 w-full mb-4">
            <p className="text-sm sm:text-base font-semibold text-[#0025f6] text-left">
              Best suited for:{" "}
              <span className="font-bold text-black">
                Final-year students, late-stage upskillers, or those preparing
                to enter the job market
              </span>
            </p>
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
                <img
                  src={TickBox}
                  alt="TickBox"
                  className="w-6 h-8 mt-0.5 flex-shrink-0"
                />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center w-full mt-6">
            <button
              className="w-full sm:w-[90%] h-12 sm:h-[56px] bg-[#155efb] text-white rounded-xl font-semibold mb-2 text-lg sm:text-2xl leading-tight hover:bg-[#1346c2] transition duration-300"
              onClick={() =>
                handleSubscribe("PLACEMENT_FOCUSED", 799, userEmail)
              }
            >
              Subscribe Now
            </button>
            <p className="text-xl font-semibold text-black text-center mt-1 flex items-center justify-center gap-1">
              Secure payment powered by
              <img
                src={RazorpayLogo}
                alt="Razorpay"
                className="h-11 object-contain"
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumPlans;
