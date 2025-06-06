import React from "react";
import StarImage from "../assets/Vector.png";
import Mentor1 from "../assets/mentor/mentor1.png";
import Mentor2 from "../assets/mentor/mentor2.png";
import Mentor3 from "../assets/mentor/mentor3.png";
import Mentor4 from "../assets/mentor/mentor4.png";

const mentors = [
  {
    name: "Sarah Johnson",
    role: "Data Scientist",
    company: "Microsoft",
    skills: "Machine Learning, Python, Analytics",
    rating: "4.8",
    sessions: "120+ successful sessions",
    avatar: Mentor1,
  },
  {
    name: "Mike Chen",
    role: "DevOps Engineer",
    company: "Amazon",
    skills: "Cloud Architecture, Kubernetes, AWS",
    rating: "4.6",
    sessions: "96+ successful sessions",
    avatar: Mentor2,
  },
  {
    name: "Emily Rodriguez",
    role: "Product Manager",
    company: "Meta",
    skills: "Product Strategy, Agile, Leadership",
    rating: "4.4",
    sessions: "58+ successful sessions",
    avatar: Mentor3,
  },
  {
    name: "David Kim",
    role: "Frontend Developer",
    company: "Netflix",
    skills: "React, TypeScript, UI/UX Design",
    rating: "4.9",
    sessions: "138+ successful sessions",
    avatar: Mentor4,
  },
];

const Mentorship = () => {
  return (
    <section className="py-20 min-h-screen bg-gradient-to-b from-[#21e6c1] via-white via-80% to-blue-200">
      <div id="mentors" className="max-w-5xl mx-auto px-2 sm:px-4">
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Connect with Industry-Proven Mentors
          </h2>
        </div>

        <div className="text-center mb-10 px-4">
          <p className="text-lg sm:text-xl md:text-2xl text-[#1b7f5a] font-medium leading-snug max-w-2xl mx-auto">
            Gain insights from experts who’ve recently secured positions at leading tech companies
            <br className="hidden sm:block" />
            and know what it takes to succeed in today’s job market.
          </p>
        </div>

        <div className="flex flex-col gap-6 w-full max-w-full md:max-w-2xl lg:max-w-4xl mx-auto px-0 md:px-4">
          {mentors.map((mentor, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0 bg-white rounded-2xl px-4 py-4 shadow-lg border border-[#e0e7ef] transition-all duration-300"
              style={{ boxShadow: "0 2px 16px 0 rgba(25, 118, 210, 0.07)" }}
            >
              {/* Avatar + Info */}
              <div className="flex items-center gap-3 md:w-1/3 min-w-0">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-2 border-blue-100"
                />
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{mentor.name}</p>
                  <p className="text-sm text-[#1976d2] truncate">{mentor.role}</p>
                  <p className="text-sm text-gray-700 truncate">
                    <span className="font-semibold">{mentor.company}</span>
                  </p>
                  <p className="text-xs text-gray-500 truncate">{mentor.skills}</p>
                </div>
              </div>

              {/* Rating & Sessions */}
              <div className="flex flex-row items-center gap-4 md:w-1/3 min-w-0 justify-center md:justify-start">
                <div className="flex items-center gap-1">
                  <img src={StarImage} alt="star" className="w-4 h-4" />
                  <span className="text-green-600 font-semibold">{mentor.rating} / 5.0</span>
                </div>
                <span className="text-xs text-gray-500">{mentor.sessions}</span>
              </div>

              {/* Book Button */}
              <button className="w-full md:w-[140px] h-[40px] bg-[#1976d2] text-white text-base font-semibold rounded-xl hover:bg-[#1251a3] transition duration-150 shadow">
                Book Session
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button
            className="w-full max-w-xs md:max-w-md h-[44px] bg-[#1976d2] text-white text-base font-semibold rounded-xl hover:bg-[#1251a3] transition duration-150 shadow"
          >
            All Mentors
          </button>
        </div>
      </div>
    </section>
  );
};

export default Mentorship;
