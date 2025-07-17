import React from "react";
import TickBox from "../assets/TickBox.png";
import { Star, Users, Target } from "lucide-react";
import { usePaymentStore } from '../store/usePaymentStore';
import { useUserStore } from '../store/useUserStore';
import RazorpayLogo from "../assets/razorpay.png";



const PremiumPlans = () => {
  const { plans, fetchPlans, isLoading } = usePlanStore();
  
  useEffect(() => {
  console.log("Fetching plans...");
  fetchPlans(); // ✅ Correct: this version comes from usePlanStore()
}, [fetchPlans]);

  console.log("Plans:", plans); 


  return (
    
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-2 sm:px-4 py-8">
      <div className="w-full flex justify-center mt-8">
  <div className="bg-[#24282f] text-[#0047ab] text-xl font-semibold rounded-full px-6 py-2 text-sm flex items-center gap-2 shadow-sm">
    <span role="img" aria-label="celebration">🎉</span>
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

      {isLoading ? (
        <p className="text-black">Loading plans...</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full max-w-5xl">
          {plans.map((plan) => {
            const isPopular = plan.name === "PLACEMENT_FOCUSED";
            const fakeOriginalPrice = plan.price !== 0 ? plan.price + 300 : null;

            return (
              <div
                key={plan.id}
                className="bg-[#dbeafe] rounded-[32px] sm:rounded-[43px] w-full flex flex-col items-center px-4 sm:px-8 pt-8 pb-6 justify-between relative"
              >
                {isPopular && (
                  <div className="absolute -top-4 bg-[#155efb] text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                )}

                <div className="text-center">
                  <h2 className="text-xl sm:text-2xl font-semibold text-black mb-1">
                    {plan.name.replace("_", " ")}
                  </h2>
                  <div className="flex items-start justify-center gap-1">
                    {fakeOriginalPrice && (
                      <p className="text-3xl sm:text-4xl font-bold text-gray-600 line-through">
                        ₹{fakeOriginalPrice}
                      </p>
                    )}
                    <span className="text-xl sm:text-2xl text-black mt-3">/</span>
                    <p className="text-2xl sm:text-3xl font-bold text-[#0025f6] mt-3">
                      ₹{plan.price}
                    </p>
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
          
         
          <div className="flex flex-col items-center w-full mt-6">
            <button className="w-full sm:w-[90%] h-12 sm:h-[56px] bg-[#155efb] text-white rounded-xl font-semibold mb-2 text-lg sm:text-2xl leading-tight hover:bg-[#1346c2] transition duration-300"onClick={() => handleSubscribe(799, "PLACEMENT_FOCUSED")}>
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
