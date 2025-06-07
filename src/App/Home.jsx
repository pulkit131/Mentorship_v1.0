import React, { useState, useEffect } from "react";
import ScrollReveal from "../Components/ScrollReveal";
import {
  ArrowRight,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Headset from "../assets/headset.png";
import Up from "../assets/up-stocks.png";
import Scholar from "../assets/user.png";
import Henry from "../assets/henry.png";

const userReviews = [
  {
    id: 1,
    Profile: Henry,
    name: "Henry Cavill",
    role: "Software Engineer",
    company: "Amazon",
    review: [
      "Mentorship Connect truly changed my career path.",
      "My mentor guided me through interviews, projects, and resume building.",
      "The sessions were super personalized and insightful.",
      "I finally got an offer from my dream company—couldn’t be happier!",
    ],
  },
  {
    id: 2,
    Profile: Henry,
    name: "Henry Cavill",
    role: "Software Engineer",
    company: "Amazon",
    review: [
      "Another amazing experience with Mentorship Connect!",
      "Great advice and hands-on support.",
      "Helped me boost my confidence in interviews.",
      "Highly recommended!",
    ],
  },
  {
    id: 3,
    Profile: Henry,
    name: "Henry Cavill",
    role: "Software Engineer",
    company: "Amazon",
    review: [
      "Mentors were very approachable and helpful.",
      "The program gave me the clarity I needed in my career.",
      "I learned how to effectively showcase my skills.",
      "Totally worth the time and effort!",
    ],
  },
  {
    id: 4,
    Profile: Henry,
    name: "Henry Cavill",
    role: "Software Engineer",
    company: "Amazon",
    review: [
      "The personalized mentorship boosted my confidence.",
      "I got practical tips on interview preparation.",
      "Great community and support.",
      "I landed a job at a top tech company!",
    ],
  },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right");

  useEffect(() => {
    const interval = setInterval(() => {
      handlenext();
    }, 4000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [currentIndex]);

  function handleprev() {
    setDirection("left");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? userReviews.length - 1 : prevIndex - 1
    );
  }

  function handlenext() {
    setDirection("right");
    setCurrentIndex((prevIndex) =>
      prevIndex === userReviews.length - 1 ? 0 : prevIndex + 1
    );
  }

  const currentUser = userReviews[currentIndex];

  function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div
      className="
        bg-gradient-to-b
        from-[#2196f3]
        via-[#90cdf4]
        to-[#21e6c1]
        md:from-[#2196f3]
        md:via-[#60a5fa]
        md:to-[#21e6c1]
        min-w-screen min-h-screen overflow-hidden
      "
    >
      {/* Hero Section */}
      <section
        id="hero"
        className="relative bg-transparent text-white py-20 md:py-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-0"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Connect with Top{" "}
              <span className="text-[#21e6c1]">Engineering Mentors</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Get personalized guidance from recently hired professionals at
              top tech companies. Accelerate your career with expert
              mentorship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-evenly items-center">
              <button
                onClick={() => scrollToSection("booking")}
                className="bg-[#39d353] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#21e6c1] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center cursor-pointer"
              >
                Book Free Session <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button
                onClick={() => scrollToSection("mentors")}
                className="bg-[#1976d2] text-white px-16 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-[#1976d2] border-2 border-[#1976d2] transition-all duration-300 cursor-pointer"
              >
                View Mentors
              </button>
            </div>
          </ScrollReveal>

          {/* Statistics */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 max-w-4xl mx-auto">
            <ScrollReveal delay={200}>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Users className="h-8 w-8 text-[#1976d2]" />
                </div>
                <div className="text-2xl font-bold text-white">50k+</div>
                <div className="text-base opacity-90 text-white">Students Helped</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Star className="h-8 w-8 text-[#1976d2]" />
                </div>
                <div className="text-2xl font-bold text-white">4.9/5</div>
                <div className="text-base opacity-90 text-white">Average Rating</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={600}>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <img src={Headset} alt="Support" className="h-8 w-8" />
                </div>
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-base opacity-90 text-white">Support Available</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={800}>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <img src={Up} alt="Support" className="h-8 w-auto py-1" />
                </div>
                <div className="text-2xl font-bold text-white">90%</div>
                <div className="text-base opacity-90 text-white">Session Satisfaction</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={1000}>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <img src={Scholar} alt="Support" className="h-8 w-auto" />
                </div>
                <div className="text-2xl font-bold text-white">Top</div>
                <div className="text-base opacity-90 text-white">Mentors from GOOGLE</div>
              </div>
            </ScrollReveal>
          </div>

          {/* Reviews Box */}
          <ScrollReveal delay={700}>
            <div className="overflow-hidden py-2 flex flex-row items-center justify-center bg-white/90 rounded-3xl shadow-xl max-w-4xl mx-auto mt-6 md:mt-10 transition-all duration-700 border border-gray-200">
              {/* Prev Arrow */}
              <button
                onClick={handleprev}
                className="group rounded-full p-2 bg-gray-100 hover:bg-blue-100 transition-colors duration-300 shadow hover:shadow-lg mx-1 sm:mx-2 flex-shrink-0 cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft className="h-7 w-7 text-[#21e6c1] group-hover:text-[#1976d2] transition-colors" />
              </button>
              {/* Review Card */}
              <div
                key={currentUser.id}
                className={`
                  flex flex-col md:flex-row gap-3 justify-center items-center
                  bg-white/0 rounded-2xl w-0 flex-grow px-2 sm:px-4 py-3
                  min-w-0 transition-all duration-700 ease-in-out
                  ${direction === "right" ? "animate-slide-in-right" : "animate-slide-in-left"}
                `}
              >
                <div
                  id="user"
                  className="flex items-center gap-3 w-full md:w-1/3 min-w-0"
                >
                  <img
                    src={currentUser.Profile}
                    alt={currentUser.name}
                    className="w-16 h-16 md:w-20 md:h-24 object-cover border-4 border-[#21e6c1] rounded-full shadow flex-shrink-0"
                  />
                  <div className="text-gray-900 min-w-0">
                    <h3 className="text-base md:text-lg font-semibold truncate">
                      {currentUser.name}
                    </h3>
                    <p className="text-xs md:text-sm font-medium text-gray-600 truncate">
                      {currentUser.role}
                    </p>
                    <p className="text-xs md:text-sm font-medium text-[#1976d2] truncate">
                      {currentUser.company}
                    </p>
                  </div>
                </div>
                <div
                  id="user-review"
                  className="flex flex-col md:justify-center text-sm md:text-md font-medium items-start text-gray-800 w-full md:w-2/3 min-w-0 overflow-hidden"
                >
                  {currentUser.review.map((line, idx) => (
                    <p
                      key={idx}
                      className="italic break-words whitespace-pre-line max-w-full"
                      style={{ wordBreak: "break-word" }}
                    >
                      "{line}"
                    </p>
                  ))}
                </div>
              </div>

              {/* Next Arrow */}
              <button
                onClick={handlenext}
                className="group rounded-full p-2 bg-gray-100 hover:bg-blue-100 transition-colors duration-300 shadow hover:shadow-lg mx-1 sm:mx-2 flex-shrink-0 cursor-pointer"
                aria-label="Next review"
              >
                <ChevronRight className="h-7 w-7 text-[#21e6c1] group-hover:text-[#1976d2] transition-colors" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Home;