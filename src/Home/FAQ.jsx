import React, { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I book a mentorship session?",
    answer:
      "Simply fill out the booking form with your details, select your preferred mentor and time slot. You'll receive a confirmation email with the session details.",
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
    question:"Can i cancel my subscription in between ?",
    answer:"Your monthly subscription ,once payment is processed, cannot be cancelled.",
  },
  {
    question: "What happens if all slots are full when I register?",
    answer:
      "If all mentor batches are full, you’ll be added to the waitlist. We’ll notify you as soon as the next batch opens — usually within a month.",
  },
  {
    question: "Can I get a refund if I don’t want to continue after the first session?",
    answer:
      "Yes. If you decide not to continue after your first session, we’ll initiate a full refund asap.",
  },
  
  {
    question: "When will the mentors be available ?",
    answer:
      "Mentors are available on weekends only. During these weekend sessions, you’ll have dedicated time to ask any and all of your doubts and get clear, personalized guidance from your mentor.",
  }

];

const FAQ = () => {
  const [openAnswer, setOpenAnswer] = useState({});
  const answerRefs = useRef([]);

  const toggleAnswer = (id) => {
    setOpenAnswer((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="faq"
      className="py-10 min-h-screen bg-gradient-to-t from-white to-emerald-300"
    >
      <div className="max-w-4xl mx-auto px-2">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-sans text-gray-900 mb-6 leading-tight">
            Frequently Asked Question(s)
          </h2>
          <p className="text-xl font-medium text-gray-800 mt-0 mb-6">
            Everything you need to know about our mentorship platform.
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="w-full overflow-hidden rounded-[2rem] shadow border-2 border-black bg-white"
            >
              {/* Question Row */}
              <div
                className="flex items-center justify-between w-full px-6 py-3"
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
              {/* Animated Dropdown */}
              <div
                ref={(el) => (answerRefs.current[index] = el)}
                style={{
                  maxHeight: openAnswer[index]
                    ? (answerRefs.current[index]?.scrollHeight ?? 0) + 48 + "px"
                    : "0px",
                  opacity: openAnswer[index] ? 1 : 0,
                  paddingTop: openAnswer[index] ? "1.5rem" : "0rem", // 1.5rem = py-6 top
                  paddingBottom: openAnswer[index] ? "1.5rem" : "0rem", // 1.5rem = py-6 bottom
                  transition:
                    "max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s, padding-top 0.4s, padding-bottom 0.4s",
                  willChange:
                    "max-height, opacity, padding-top, padding-bottom",
                }}
                className="overflow-hidden text-gray-800 text-base sm:text-lg font-sans font-normal px-6"
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
