import React from "react";
import { useNavigate } from "react-router-dom";

const TermsModal = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-8 relative">
        <h1 className="text-2xl font-bold text-[#0A142F] mb-4 text-center">Terms and Conditions</h1>
        <div className="space-y-5 text-gray-800 max-h-[60vh] overflow-y-auto pr-2">
          <section>
            <h2 className="text-lg font-semibold text-[#2196f3] mb-1">Acceptance of Terms</h2>
            <p>By using <span className="font-semibold">LetsGetMentor.com</span>, you agree to these terms.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[#2196f3] mb-1">Services</h2>
            <p>We provide a platform to connect mentees with mentors for guidance and support.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[#2196f3] mb-1">User Responsibilities</h2>
            <ul className="list-disc ml-5">
              <li>Provide accurate information during registration.</li>
              <li>Use the platform respectfully and lawfully.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[#2196f3] mb-1">Payment Terms</h2>
            <ul className="list-disc ml-5">
              <li>Fees for premium mentorship are non-refundable unless specified.</li>
              <li>Payments are processed securely via Razorpay.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[#2196f3] mb-1">Termination</h2>
            <p>We reserve the right to terminate accounts that violate these terms.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[#2196f3] mb-1">Liability</h2>
            <p>LetsGetMentor.com is not liable for any indirect damages arising from platform use.</p>
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

export default TermsModal;
