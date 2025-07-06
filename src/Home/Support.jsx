import React from "react";
import EmailIcon from "../assets/email.png";

const SupportSection = () => {
  return (
    <section id="contact">
      <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-t from-blue-200 to-white px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[1200px] text-center mt-10 sm:mt-16 md:mt-[50px] md:w-[1200px]">
          <h1 className="text-3xl sm:text-[32px] md:text-[40px] lg:text-[44px] font-semibold text-black mb-3 leading-tight w-full mx-auto md:w-[801px]">
            Connect with Industry-Proven Mentors
          </h1>
          <p className="text-[#0018A8] text-xl sm:text-[20px] md:text-[22px] lg:text-[24px] font-normal w-full">
            Have questions? We're here to help you succeed in your career journey.
          </p>
        </div>
        <div className="w-full max-w-[1020px] flex flex-col items-center mt-8 gap-8 md:mt-[48px] lg:mt-[60px]">
          <div className="w-full bg-white border-[3px] border-[#3577FF] rounded-[30px] flex flex-col items-center justify-center text-center space-y-4 py-8 px-4 sm:max-w-[450px] sm:h-[280px] sm:py-8 sm:px-6 md:h-[300px] lg:w-[480px] lg:h-[370px] lg:py-0 lg:px-0">
            <img
              src={EmailIcon}
              alt="Email Icon"
              className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px] lg:w-[90px] lg:h-[90px]"
            />
            <h2 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-semibold text-black">
              Email Support
            </h2>
            <p className="text-gray-500 text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] px-2">
              Get help with bookings and general inquiries
            </p>
            <a
              href="mailto:Connect@letsgetmentor.com"
              className="text-[#3577FF] underline text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-medium break-all px-2"
            >
              connect@letsgetmentor.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;