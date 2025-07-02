import React from "react";
import { useNavigate } from "react-router-dom";

const ShippingPolicyModal = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 relative">
        <h1 className="text-2xl font-bold text-[#0A142F] mb-4 text-center">Shipping and Delivery Policy</h1>
        <div className="space-y-5 text-gray-800 max-h-[70vh] overflow-y-auto pr-2">
          <section>
            <h2 className="text-lg font-semibold text-[#2196f3] mb-1">Applicability</h2>
            <p>
              This policy applies to any physical materials (e.g., books, certificates) provided as part of mentorship programs.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[#2196f3] mb-1">Delivery</h2>
            <ul className="list-disc ml-5">
              <li>Physical items will be shipped within 5-7 business days after purchase.</li>
              <li>Delivery times vary by location (typically 7-14 business days).</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[#2196f3] mb-1">Shipping Costs</h2>
            <ul className="list-disc ml-5">
              <li>Shipping is free for orders above $50; otherwise, a flat fee of $5 applies.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[#2196f3] mb-1">Tracking</h2>
            <p>
              A tracking number will be provided once the item is shipped. Contact <a href="mailto:support@letsgetmentor.com" className="text-[#2196f3] underline">support@letsgetmentor.com</a> for updates.
            </p>
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

export default ShippingPolicyModal;
