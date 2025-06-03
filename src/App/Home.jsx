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
import Scholar from "../assets/scholar.png";
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

    return () => clearInterval(interval); // cleanup on unmount
  }, [currentIndex]); // reset timer when currentIndex changes

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
    <div className="bg-gradient-to-br from-blue-600 to-emerald-500 min-w-screen min-h-screen overflow-hidden">
      <div>
        {/* Hero Section */}
        <section
          id="hero"
          className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 text-white py-20 md:py-32 overflow-hidden"
        >
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Connect with Top{" "}
                <span className="text-green-300">Engineering Mentors</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Get personalized guidance from recently hired professionals at
                top tech companies. Accelerate your career with expert
                mentorship.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-evenly items-center">
                <button
                  onClick={() => scrollToSection("booking")}
                  className="bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center cursor-pointer"
                >
                  Book Free Session <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button
                  onClick={() => scrollToSection("mentors")}
                  className="border-2 border-white text-white px-16 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 cursor-pointer"
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
                    <Users className="h-8 w-8 text-[#73FBFD]" />
                  </div>
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-lg opacity-90">Students Helped</div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={400}>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Star className="h-8 w-8 text-[#73FBFD]" />
                  </div>
                  <div className="text-3xl font-bold">4.9/5</div>
                  <div className="text-lg opacity-90">Average Rating</div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={600}>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <img src={Headset} alt="Support" className="h-8 w-8" />
                  </div>
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-lg opacity-90">Support Available</div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={800}>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <img src={Up} alt="Support" className="h-8 w-auto py-1" />
                  </div>
                  <div className="text-3xl font-bold">100+</div>
                  <div className="text-lg opacity-90">Mentors Available</div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={1000}>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <img src={Scholar} alt="Support" className="h-8 w-auto" />
                  </div>
                  <div className="text-3xl font-bold">100+</div>
                  <div className="text-lg opacity-90">Mentors Available</div>
                </div>
              </ScrollReveal>
            </div>

            {/* Reviews Box */}
            <ScrollReveal delay={700}>
              <div className="overflow-hidden py-2 flex flex-row items-center justify-center bg-white rounded-4xl max-w-4xl max-h-fit md:h-[144px] md:max-h-[144px] mx-auto mt-10">
                <button onClick={handleprev} className="cursor-pointer">
                  <ChevronLeft className="text-black" />
                </button>

                <div
                  key={currentUser.id}
                  className={`flex flex-col gap-3 justify-center items-center md:py-2 md:flex-row  bg-[#D4EEFF] rounded-3xl w-full max-w-5xl max-h-fit md:max-h-[128px] py-1 px-4 transition-transform duration-500 ease-in-out ${
                    direction === "right"
                      ? "animate-slide-in-right"
                      : "animate-slide-in-left"
                  }`}
                >
                  <div id="user" className="flex items-center gap-3 w-1/3">
                    <img
                      src={currentUser.Profile}
                      alt={currentUser.name}
                      className="w-auto h-24 object-cover border-2 border-white"
                    />
                    <div className="text-black md:-mt-8 ">
                      <h3 className="text-lg font-semibold">
                        {currentUser.name}
                      </h3>
                      <p className="text-sm font-medium">{currentUser.role}</p>
                      <p className="text-sm font-medium">
                        {currentUser.company}
                      </p>
                    </div>
                  </div>

                  <div
                    id="user-review"
                    className="flex flex-col md:justify-center max-h-[128px] text-md font-medium items-start text-black"
                  >
                    {currentUser.review.map((line, idx) => (
                      <p key={idx}>"{line}"</p>
                    ))}
                  </div>
                </div>

                <button onClick={handlenext} className=" cursor-pointer">
                  <ChevronRight className="text-black" />
                </button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
