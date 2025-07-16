import { useEffect, useState } from 'react';
//import plans from "../data/plans.json";
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import Confetti from 'react-confetti'

const getAuthToken = () => `Bearer ${localStorage.getItem('token')}`;

const Subscriptions= () => {
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;
    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [showConfetti, setShowConfetti] = useState(false);  // State for triggering confetti
    const API_URL = 'https://boardly-be.vercel.app';
    const plans=[
    {
        "name": "Free",
        "price": 0,
        "description": "Try Boardly For Free",
        "features": [
            {
                "text": "PYQs",
                "value": "5",
                "available": true
            },
            {
                "text": "Topic Wise Questions",
                "value": "",
                "available": false
            },
            {
                "text": "Video Solution",
                "value": "",
                "available": false
            },
            {
                "text": "Toppers Solution",
                "value": "",
                "available": false
            }
        ]
    },
    {
        "name": "Plus",
        "id": "PLAN1",
        "price": 99,
        "description": "Try our Plus plan",
        "features": [
            {
                "text": "PYQs",
                "value": "50",
                "available": true
            },
            {
                "text": "Topic Wise Questions",
                "value": "",
                "available": true
            },
            {
                "text": "Video Solution",
                "value": "",
                "available": true
            },
            {
                "text": "Toppers Solution",
                "value": "",
                "available": true
            }
        ]
    }
]
    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    };

    const fetchSubscriptionStatus = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/payment/subscription-status`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getAuthToken(),
                },
            });

            const subscriptionData = await response.json();

            if (response.ok) {
                setSubscription(subscriptionData);
            } else {
                throw new Error(subscriptionData.error || 'Failed to fetch subscription status');
            }
        } catch (error) {
            showMessage('error', 'Failed to retrieve subscription status. Please try again later.');
            console.error('Subscription status error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePaymentSuccess = async (response) => {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

        if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            showMessage('error', 'Invalid payment response. Please contact support.');
            return;
        }

        setLoading(true);
        showMessage('info', 'Verifying payment, please wait...');
        try {
            const verifyResponse = await fetch(`${API_URL}/payment/verify-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getAuthToken(),
                },
                body: JSON.stringify({ razorpay_payment_id, razorpay_order_id, razorpay_signature }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyResponse.ok) {
                showMessage('success', 'Payment successful and subscription updated!');
                await fetchSubscriptionStatus();
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 5000);
            } else {
                throw new Error(verifyData.error || 'Payment verification failed');
            }
        } catch (error) {
            showMessage('error', 'Payment verification failed. Please contact support.');
            console.error('Payment verification error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async (planId, planPrice) => {
        setLoading(true);
        showMessage('info', 'Processing payment, please do not press back or refresh...');
        try {
            const response = await fetch(`${API_URL}/payment/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getAuthToken(),
                },
                body: JSON.stringify({ planType: planId }),
            });

            const orderData = await response.json();

            if (response.ok) {
                const options = {
                    key: razorpayKey,
                    amount: planPrice * 100,
                    currency: "INR",
                    name: "Boardly.in",
                    description: `Payment for ${planId}`,
                    order_id: orderData.orderId,
                    handler: async (response) => {
                        await handlePaymentSuccess(response);
                    },
                    prefill: {
                        name: orderData.customerName,
                        email: orderData.customerEmail,
                    },
                    theme: {
                        color: "#3399cc",
                    },
                };

                const razorpay = new window.Razorpay(options);
                razorpay.open();
            } else {
                throw new Error(orderData.error || 'Failed to create order');
            }
        } catch (error) {
            showMessage('error', 'Failed to initiate payment. Please try again later.');
            console.error('Payment initiation error:', error);
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    }

    useEffect(() => {
        const initialize = async () => {
            await fetchSubscriptionStatus();
        };

        initialize();

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="subscription-component p-8 bg-gray-50 min-h-[75vh]">
            {loading ? (
                <div className="flex justify-center items-center mt-12">
                    <div className="animate-spin mt-12 rounded-full h-20 w-20 border-t-4 border-orange-500 border-solid"></div>
                </div>
            ) : (
                <div className="w-3/4 mx-auto">
                    {showConfetti && <Confetti />}

                    {subscription && (
                        <div className="subscription-info mb-8 bg-white p-6 rounded-lg shadow-md">
                            <p className="text-lg font-medium text-gray-700">
                                Current Plan: <span className="font-bold">{subscription.currentPlan || 'Free'}</span>
                            </p>
                            {subscription.isActive ? (
                                <p className="text-gray-600">
                                    Expires on: {new Date(subscription.expiryDate).toLocaleDateString()}
                                </p>
                            ) : (
                                <p className="text-red-500">No active subscription!</p>
                            )}
                        </div>
                    )}

                    <section className="py-16 px-4 sm:px-6 lg:px-8 w-full bg-gray-50">
                        <div className="w-full mx-auto">
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid md:grid-cols-2 2xl:grid-cols-4 gap-8"
                            >
                                {plans.map((tier) => (
                                    <motion.div
                                        key={tier.name}
                                        variants={cardVariants}
                                        whileHover={{
                                            scale: 1.03,
                                            transition: { duration: 0.2 }
                                        }}
                                        className="relative bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
                                    >
                                        {tier.isRecommended && (
                                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#9AE6B4] text-green-800 px-4 py-1 rounded-full text-sm font-medium">
                                                Recommended
                                            </div>
                                        )}

                                        <div className="text-center mb-6">
                                            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                                                {tier.name}
                                            </h3>
                                            <div className="flex items-baseline justify-center gap-1">
                                                <span className="text-lg">₹</span>
                                                <span className="text-4xl font-bold">{tier.price}</span>
                                            </div>
                                            <p className="text-gray-600 mt-2">{tier.description}</p>
                                        </div>

                                        <ul className="space-y-4 mb-8">
                                            {tier.features.map((feature, index) => (
                                                <li key={index} className="flex items-center gap-3">
                                                    {feature.available ? (
                                                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                    ) : (
                                                        <X className="h-5 w-5 text-red-500 flex-shrink-0" />
                                                    )}
                                                    <span className="text-gray-600">
                                                        {feature.value && `${feature.value} `}{feature.text}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>

                                        {tier.name === "Plus" ? (
                                            <div className="flex flex-col gap-3">
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => handlePayment(tier.id, tier.price)}
                                                    className="w-full bg-black text-white rounded-lg py-3 font-medium hover:bg-gray-800 transition-colors"
                                                >
                                                    Subscribe Now
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => handlePayment(tier.id, tier.price)}
                                                    className="w-full bg-orange-500 text-white rounded-lg py-3 font-medium hover:bg-orange-600 transition-colors"
                                                >
                                                    Subscribe (Alt)
                                                </motion.button>
                                            </div>
                                        ) : (
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handlePayment(tier.id, tier.price)}
                                                className="w-full bg-black text-white rounded-lg py-3 font-medium hover:bg-gray-800 transition-colors"
                                            >
                                                GO
                                            </motion.button>
                                        )}
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </section>

                    {message.text && (
                        <div
                            className={`message mt-6 p-4 rounded-md text-center font-medium ${message.type === 'success' ? 'bg-green-100 text-green-700' : message.type === 'info' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                                }`}
                        >
                            {message.text}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Subscriptions;
