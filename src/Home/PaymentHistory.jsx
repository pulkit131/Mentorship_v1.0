import React from "react";
import {
  Calendar,
  CreditCard,
  User,
  Package,
} from "lucide-react";

const PaymentHistory = () => {
  // Placeholder data
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-3 sm:p-5 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Payment History
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Track all your mentorship payments and subscription details
          </p>
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
                            <span className="font-medium truncate">{payment.plan}</span>
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
                      <div className="flex items-center gap-2">
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
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;