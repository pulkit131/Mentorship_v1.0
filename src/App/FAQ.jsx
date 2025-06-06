import React, { useState } from "react";
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
    question: "What should I prepare for the session?",
    answer:
      "Come with specific questions or topics you'd like to discuss. Having your resume and any projects you're working on ready can make the session more productive.",
  },
  {
    question: "Can I reschedule my session?",
    answer:
      "Yes, you can reschedule your session up to 24 hours before the scheduled time by contacting our support team.",
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
    <section className="py-10 min-h-screen bg-gradient-to-t from-white to-emerald-300">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold font-sans text-gray-900 mb-6 leading-tight">
            Frequently Asked Question(s)
          </h2>
          <p className="text-base font-medium text-gray-800 mt-0 mb-6">
            Everything you need to know about our mentorship platform.
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="flex items-center justify-between w-full bg-white border-2 border-black rounded-[2rem] shadow px-6 py-3"
              style={{
                minHeight: "56px",
              }}
            >
              <span className="font-semibold text-gray-900 text-lg sm:text-xl font-sans tracking-tight">
                {faq.question}
              </span>
              <button
                onClick={() => toggleAnswer(index)}
                className="ml-4 flex items-center justify-center w-8 h-8 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] transition"
                aria-label={openAnswer[index] ? "Collapse" : "Expand"}
              >
                <ChevronDown
                  className={`text-white w-5 h-5 transition-transform duration-300 ${
                    openAnswer[index] ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
