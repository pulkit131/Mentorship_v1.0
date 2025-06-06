import React, { useState } from "react";
import ScrollReveal from "../Components/ScrollReveal";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I book a mentorship session?",
    answer:
      "Simply fill out the booking form with your details, select your preferred mentor and time slot. You'll receive a confirmation email with the session details.",
  },
  {
    question: "Are the sessions free?",
    answer:
      "Yes! We offer free mentorship sessions to help engineering students. We also have premium plans available for extended support and additional features.",
  },
  {
    question: "How long is each session?",
    answer:
      "Each mentorship session is 1 hour long, giving you enough time to discuss your goals, get advice, and ask questions.",
  },
  {
    question: "Can I reschedule my session?",
    answer:
      "Yes, you can reschedule your session up to 24 hours before the scheduled time by contacting our support team.",
  },
  {
    question: "What should I prepare for the session?",
    answer:
      "Come with specific questions or topics you'd like to discuss. Having your resume and any projects you're working on ready can make the session more productive.",
  },
];

const FAQ = () => {
  const [openAnswer, setOpenAnswer] = useState({});

  const toggleAnswer = (id) => {
    setOpenAnswer((e) => ({
      ...e,
      [id]: !e[id],
    }));
  };
  return (
    <div id="faq">
      {/* FAQ Section */}

      <section className="py-20 bg-gradient-to-t from-white to-emerald-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our mentorship platform.
            </p>
          </div>

          <div className="space-y-6 max-w-fit">
            {faqs.map((faq, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className=" bg-white rounded-xl shadow-lg p-6 overflow-hidden">
                  <div className="flex flex-row justify-between items-center gap-5">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {faq.question}
                    </h3>
                    <button
                      onClick={() => toggleAnswer(index)}
                      className="p-1 bg-gradient-to-br from-blue-300 to-emerald-300 rounded-full cursor-pointer"
                    >
                      <ChevronDown
                        className={`transform transition-transform duration-300 ${
                          openAnswer[index] ? "rotate-180" : "rotate-0"
                        }`}
                      ></ChevronDown>
                    </button>
                  </div>
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      openAnswer[index]
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="py-2 border-t border-gray-200">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
