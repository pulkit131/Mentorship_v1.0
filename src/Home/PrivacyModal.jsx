import React from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicyModal = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 relative">
        <h1 className="text-2xl font-bold text-[#0A142F] mb-4 text-center">Privacy Policy</h1>
        <div className="space-y-5 text-gray-800 max-h-[70vh] overflow-y-auto pr-2">
          <section>
            <h2 className="text-lg font-semibold text-[#2196f3] mb-1">Introduction</h2>
            <p>
              Welcome to LetsGetMentor.com. We are committed to protecting your privacy and ensuring the security of your personal information.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[#2196f3] mb-1">Information We Collect</h2>
            <ul className="list-disc ml-5">
              <li>Personal details (name, email, contact number) when you register.</li>
              <li>Communication data from mentor-mentee interactions.</li>
              <li>Usage data (e.g., pages visited) collected via cookies.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[#2196f3] mb-1">How We Use Your Information</h2>
            <ul className="list-disc ml-5">
              <li>To provide and improve our mentorship services.</li>
              <li>To communicate with you about your account or services.</li>
              <li>To ensure the safety and security of our platform.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[#2196f3] mb-1">Data Security</h2>
            <p>We use industry-standard encryption and security measures to protect your data.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[#2196f3] mb-1">Your Rights</h2>
            <p>
              You can request access, correction, or deletion of your data by contacting us at <a href="mailto:support@letsgetmentor.com" className="text-[#2196f3] underline">support@letsgetmentor.com</a>.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[#2196f3] mb-1">Changes to This Policy</h2>
            <p>We may update this policy periodically. Check back for the latest version.</p>
          </section>
        </div>
        <button
          className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-red-500"
          onClick={() => navigate(-1)}
          aria-label="Close"
        >
          &times;
        </button>
        <button
          className="mt-6 w-full bg-[#0A142F] text-white py-2 rounded hover:bg-[#2196f3] transition"
          onClick={() => navigate(-1)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;
