import React from "react";
import { useNavigate } from "react-router-dom";

const CancellationRefundModal = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 relative">
        <h1 className="text-2xl font-bold text-[#0A142F] mb-4 text-center">
          Cancellation and Refund Policy
        </h1>
        <div className="space-y-5 text-gray-800 max-h-[70vh] overflow-y-auto pr-2">
          <section>
            <h2 className="text-lg font-semibold text-[#2196f3] mb-1">Cancellation</h2>
            <ul className="list-disc ml-5">
              <li>Mentorship sessions can be cancelled 24 hours prior to the scheduled time.</li>
              <li>Cancellations within 24 hours are subject to a cancellation fee.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[#2196f3] mb-1">Refund Policy</h2>
            <ul className="list-disc ml-5">
              <li>Full refunds are available for cancellations made 48 hours in advance.</li>
              <li>No refunds for cancellations within 24 hours, except in exceptional circumstances at our discretion.</li>
              <li>Refund requests must be submitted via <a href="mailto:support@letsgetmentor.com" className="text-[#2196f3] underline">support@letsgetmentor.com</a> within 7 days.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[#2196f3] mb-1">Processing Time</h2>
            <p>Refunds, if approved, will be processed within 5-10 business days.</p>
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

export default CancellationRefundModal;
