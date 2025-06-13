import React from "react";
import EmailIcon from "../assets/email.png";
import PhoneIcon from "../assets/phone.png";

const SupportSection = () => {
  return (
    <div
      id="contact"
      className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-t from-blue-200 to-white px-4"
    >
      <div className="w-full max-w-[1200px] text-center mt-10 md:mt-[120px] md:w-[1200px]">
        <h1 className="text-[28px] font-semibold text-black mb-3 leading-tight w-full mx-auto md:text-[40px] md:w-[801px]">
          Connect with Industry-Proven Mentors
        </h1>
        <p className="text-[#0018A8] text-[18px] font-normal w-full md:text-[22px]">
          Have questions? We're here to help you succeed in your career journey.
        </p>
      </div>
      <div
        className="
        w-full max-w-[1020px] flex flex-col items-center mt-8 gap-8
        md:flex-row md:justify-between md:items-center md:mt-[48px] md:gap-0 md:w-[1020px] md:h-[350px]
      "
      >
        <div
          className="
          w-full bg-white border-[3px] border-[#3577FF] rounded-[30px]
          flex flex-col items-center justify-center text-center space-y-4
          py-8 px-4
          md:w-[450px] md:h-[350px] md:py-0 md:px-0
        "
        >
          <img
            src={EmailIcon}
            alt="Email Icon"
            className="w-[60px] h-[60px] md:w-[80px] md:h-[80px]"
          />
          <h2 className="text-[24px] md:text-[32px] font-semibold text-black">
            Email Support
          </h2>
          <p className="text-gray-500 text-[16px] md:text-[20px]">
            Get help with bookings and general inquiries
          </p>
          <a
            href="mailto:support@mentorshipconnect.com"
            className="text-[#3577FF] underline text-[16px] md:text-[20px] font-medium break-all"
          >
            support@mentorshipconnect.com
          </a>
        </div>
        <div
          className="
          w-full bg-white border-[3px] border-[#0ACF32] rounded-[30px]
          flex flex-col items-center justify-center text-center space-y-4
          py-8 px-4
          md:w-[450px] md:h-[350px] md:py-0 md:px-0
        "
        >
          <img
            src={PhoneIcon}
            alt="Phone Icon"
            className="w-[50px] h-[60px] md:w-[60px] md:h-[70px]"
          />
          <h2 className="text-[24px] md:text-[32px] font-semibold text-black">
            Phone Support
          </h2>
          <p className="text-gray-500 text-[16px] md:text-[20px]">
            Speak directly with our support team
          </p>
          <a
            href="tel:+919876543210"
            className="text-[#0ACF32] text-[16px] md:text-[20px] font-medium"
          >
            +91 98765 43210
          </a>
        </div>
      </div>
    </div>
  );
};

export default SupportSection;
