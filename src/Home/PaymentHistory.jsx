import React, { useState } from "react";
import { Calendar, CreditCard, User, Package, X } from "lucide-react";

const PaymentHistory = () => {
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [refundInitiated, setRefundInitiated] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackReason, setFeedbackReason] = useState("");
  const [additionalFeedback, setAdditionalFeedback] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const paymentHistory = [
    {
      id: 1,
      mentorName: "Hameedullah Khan Pathan",
      plan: "Beginner Techy Plan",
      startedOn: "2024-01-15",
      expiresBy: "2024-04-15",
      payment: "success",
    },
    {
      id: 2,
      mentorName: "Ravi Kumar",
      plan: "Advanced Developer Plan",
      startedOn: "2023-12-01",
      expiresBy: "2024-03-01",
      payment: "failed",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 border-green-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleRefundClick = () => {
    setShowFeedbackModal(true);
    setRefundInitiated(false);
    setSelectedMentor(null);
  };

  const handleFeedbackSubmit = () => {
    const trimmedFeedback = additionalFeedback.trim();
    const wordCount = trimmedFeedback ? trimmedFeedback.split(/\s+/).length : 0;

    if (!feedbackReason) {
      setErrorMessage("Please select a reason.");
      return;
    }

    if (
      feedbackReason === "Other (please share below)" &&
      trimmedFeedback &&
      wordCount > 50
    ) {
      setErrorMessage("Feedback should be within 50 words.");
      return;
    }

    setErrorMessage("");
    setShowFeedbackModal(false);
    setShowRefundModal(true);
  };

  const handleMentorSelect = (mentor) => {
    setSelectedMentor(mentor);
    setShowRefundModal(false);
    setShowPolicyModal(true);
  };

  const confirmRefund = () => {
    setShowPolicyModal(false);
    setRefundInitiated(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-3 sm:p-5 md:p-6 lg:p-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Payment History
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              Track all your mentorship payments and subscription details
            </p>
          </div>
          <button
            onClick={handleRefundClick}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
          >
            Request Refund
          </button>
        </div>

        <div className="grid gap-4 md:gap-6">
          {paymentHistory.length === 0 ? (
            <div className="rounded-2xl p-8 sm:p-12 text-center">
              <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
                No payments found
              </h3>
            </div>
          ) : (
            paymentHistory.map((payment) => (
              <div
                key={payment.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden w-full max-w-sm mx-auto md:max-w-4xl"
              >
                <div className="p-4 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8">
                    <div className="flex-1 space-y-3 md:space-y-4">
                      <div className="flex items-start gap-3 md:gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1 truncate">
                            {payment.mentorName}
                          </h3>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Package className="w-4 h-4 flex-shrink-0" />
                            <span className="font-medium truncate">
                              {payment.plan}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 space-y-2 md:space-y-3">
                      <div className="flex items-center gap-2 md:gap-3">
                        <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <div className="text-xs sm:text-sm">
                          <span className="text-gray-500">Started:</span>
                          <span className="ml-2 font-medium text-gray-900">
                            {formatDate(payment.startedOn)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3">
                        <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <div className="text-xs sm:text-sm">
                          <span className="text-gray-500">Expires:</span>
                          <span className="ml-2 font-medium text-gray-900">
                            {formatDate(payment.expiresBy)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row md:flex-col gap-2 md:gap-4 md:items-end">
                      <span
                        className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${getStatusColor(
                          payment.payment
                        )}`}
                      >
                        {payment.payment.charAt(0).toUpperCase() +
                          payment.payment.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {showFeedbackModal && (
          <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  We’d love your feedback
                </h3>
                <button onClick={() => setShowFeedbackModal(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              {errorMessage && (
                <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                  {errorMessage}
                </div>
              )}

              <form className="space-y-4">
                {[
                  "I didn’t feel enough clarity or direction",
                  "I expected more interaction with the mentor",
                  "The session felt too fast / too slow",
                  "The mentor’s style didn’t match my learning preference",
                  "Timing didn’t work for me",
                  "Not ready to continue with the subscription",
                  "I plan to rejoin in the future",
                  "Other (please share below)",
                ].map((option, idx) => (
                  <label key={idx} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="feedback"
                      value={option}
                      checked={feedbackReason === option}
                      onChange={(e) => setFeedbackReason(e.target.value)}
                    />
                    {option}
                  </label>
                ))}

                <textarea
                  placeholder="Tell us more... (max 50 characters)"
                  className={`w-full border rounded-md p-2 text-sm ${
                    feedbackReason !== "Other (please share below)"
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-black"
                  }`}
                  rows="3"
                  maxLength={50}
                  disabled={feedbackReason !== "Other (please share below)"}
                  value={additionalFeedback}
                  onChange={(e) => setAdditionalFeedback(e.target.value)}
                ></textarea>

                <div className="text-right">
                  <button
                    type="button"
                    onClick={handleFeedbackSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                  >
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showRefundModal && (
          <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  Select Mentor for Refund
                </h3>
                <button onClick={() => setShowRefundModal(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-2">
                {paymentHistory.map((payment) => (
                  <button
                    key={payment.id}
                    disabled={payment.payment !== "success"}
                    title={
                      payment.payment !== "success"
                        ? "Refund not available for failed payments"
                        : ""
                    }
                    onClick={() =>
                      payment.payment === "success" &&
                      handleMentorSelect(payment)
                    }
                    className={`w-full px-4 py-2 rounded-lg border flex justify-between items-center transition-all duration-200 ${
                      payment.payment === "success"
                        ? "hover:bg-gray-100 text-gray-800"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <span>{payment.mentorName}</span>
                    <span className="text-sm font-medium">{payment.plan}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {showPolicyModal && selectedMentor && (
          <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  Refund Terms & Conditions
                </h3>
                <button onClick={() => setShowPolicyModal(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-700 mb-6">
                Refunds will be processed within 5–7 business days. Refunds are
                only available for plans with a successful payment status and
                must be requested before attending second session.
              </p>
              <div className="text-right">
                <button
                  onClick={confirmRefund}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition"
                >
                  Confirm Refund
                </button>
              </div>
            </div>
          </div>
        )}

        {refundInitiated && (
          <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md animate-fade-in text-center">
              <h3 className="text-lg font-semibold mb-4">
                Refund Initiated ✅
              </h3>
              <p className="text-sm text-gray-600">
                Your refund request for{" "}
                <strong>{selectedMentor.mentorName}</strong> has been initiated.
                You will be notified once it is processed.
              </p>
              <div className="mt-4">
                <button
                  onClick={() => setRefundInitiated(false)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
