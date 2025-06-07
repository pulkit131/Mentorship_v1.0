import React, { useState, useEffect } from "react";
import ScrollReveal from "../Components/ScrollReveal";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Headset from "../assets/headset.png";
import Up from "../assets/up-stocks.png";
import Google from "../assets/google.png";
import User from "../assets/user.png";
import Rating from "../assets/star.png";

const userReviews = [
  {
    id: 1,
    name: "Riya Sharma",
    role: "Frontend Developer",
    company: "Flipkart",
    review: [
      "Mentorship Connect truly changed my career path.",
      "My mentor guided me through interviews, projects, and resume building.",
      "The sessions were super insightful.",
    ],
  },
  {
    id: 2,
    name: "Ankit Verma",
    role: "UI/UX Designer",
    company: "Zomato",
    review: [
      "Another amazing experience with Mentorship Connect!",
      "Great advice and hands-on support.",
      "Helped me boost my confidence in interviews.",
      "Highly recommended!",
    ],
  },
  {
    id: 3,
    name: "Sneha Nair",
    role: "ML Engineer",
    company: "TCS",
    review: [
      "Mentors were very helpful.",
      "The program gave me the clarity I needed in my career.",
      "I learned how to effectively showcase my skills.",
      "Totally worth the time and effort!",
    ],
  },
  {
    id: 4,
    name: "Aditya Rao",
    role: "Backend Developer",
    company: "Adobe",
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
    }, 5000);
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
    <div className="bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#16A34A] min-w-screen min-h-screen overflow-hidden">
      <section id="hero" className="relative bg-transparent text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-0"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Connect with Top <span className="text-[#2AB74A]">Engineering Mentors</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Get personalized guidance from recently hired professionals at top tech companies. Accelerate your career with expert mentorship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-evenly items-center">
              <button
                onClick={() => scrollToSection("booking")}
                className="bg-[#2AB74A] text-white px-12 py-4 rounded-full text-lg font-bold hover:bg-[#21e6c1] transform hover:scale-105 transition-all duration-300 flex items-center cursor-pointer border-3 border-white"
              >
                Book Free Session
              </button>
              <button
                onClick={() => scrollToSection("mentors")}
                className="bg-[#018EE2] text-white px-16 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-blue-600 border-2 border-[#1976d2] transition-all duration-300 cursor-pointer border-3 border-white"
              >
                View Mentors
              </button>
            </div>
          </ScrollReveal>

          <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 max-w-4xl mx-auto">
            <ScrollReveal delay={200}>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <img src={User} alt="Users" className="h-8 w-8 object-contain" />
                </div>
                <div className="text-2xl font-bold text-white">50k+</div>
                <div className="text-base opacity-90 text-white">Students Helped</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <img src={Rating} alt="Star" className="h-8 w-8" />
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
                  <img src={Up} alt="Support" className="h-8 w-8" />
                </div>
                <div className="text-2xl font-bold text-white">90%</div>
                <div className="text-base opacity-90 text-white">Session Satisfaction</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={1000}>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <img src={Google} alt="Support" className="h-8 w-auto" />
                </div>
                <div className="text-2xl font-bold text-white">Top</div>
                <div className="text-base opacity-90 text-white">Mentors from GOOGLE</div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={200}>
            <div className="overflow-hidden py-2 flex flex-row items-center justify-center bg-white/90 rounded-3xl shadow-xl max-w-4xl mx-auto mt-6 md:mt-10 transition-all duration-700 border-8 border-gray-300">
              <button onClick={handleprev} className="group p-2 mx-1 sm:mx-2 flex-shrink-0 cursor-pointer z-10" aria-label="Previous review">
                <ChevronLeft className="h-7 w-7 text-gray-500" />
              </button>

              <div
                key={currentUser.id}
                className={`flex flex-col md:flex-row justify-center items-start bg-grey-100 rounded-2xl w-0 flex-grow px-4 sm:px-6 py-5 min-w-0 transition-all duration-700 ease-in-out ${direction === "right" ? "animate-slide-in-right" : "animate-slide-in-left"} gap-6`}
              >
                <div className="flex flex-col items-start min-w-[120px] sm:min-w-[150px]">
                  <h3 className="text-2xl font-bold text-gray-900">{currentUser.name}</h3>
                  <p className="text-lg font-medium text-gray-600">{currentUser.role}</p>
                  <p className="text-base font-bold text-[#1976d2]">{currentUser.company}</p>
                </div>
                <div className="flex-1 relative w-full">
                  <span className="absolute -left-4 -top-2 text-5xl text-gray-400 font-serif font-bold select-none pointer-events-none" aria-hidden="true">&#8216;&#8216;</span>
                  <div className="text-sm md:text-lg font-normal text-gray-800 italic text-left pl-8 pr-10">
                    {currentUser.review.join(" ")}
                  </div>
                  <span className="absolute -right-1 -bottom-6 text-5xl text-gray-400 font-serif font-bold select-none pointer-events-none" aria-hidden="true">&#8217;&#8217;</span>
                </div>
              </div>

              <button onClick={handlenext} className="group p-2 mx-1 sm:mx-2 flex-shrink-0 cursor-pointer z-10" aria-label="Next review">
                <ChevronRight className="h-7 w-7 text-gray-500" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
