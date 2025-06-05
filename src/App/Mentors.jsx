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

const Mentors = () => {
  return (
    <section className=" py-20 bg-gradient-to-t from-white to-emerald-500">
      <div
        id="mentors"
        className="relative mx-auto bg-white max-w-5xl w-full px-2 sm:px-4 md:px-8 py-8 mt-10 rounded-2xl"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6 max-w-2xl mx-auto">
          Connect with Industry-Proven Mentors
        </h2>

        <p className="text-base sm:text-xl md:text-2xl text-green-700 text-center font-normal mb-8 sm:mb-12 max-w-3xl mx-auto">
          Gain insights from experts who've recently secured positions at
          leading tech companies and know what it takes to succeed in today's
          job market.
        </p>

        <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-4xl mx-auto">
          {mentors.map((mentor, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0 bg-blue-50 rounded-xl px-4 py-4 transition-transform duration-300 hover:scale-105 shadow-md"
            >
              <div className="flex items-center gap-3 md:w-1/4">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
                />
                <div>
                  <p className="font-semibold truncate">{mentor.name}</p>
                  <p className="text-sm text-blue-600 truncate">
                    {mentor.role}
                  </p>
                </div>
              </div>

              <div className="text-xs sm:text-sm md:text-base text-center md:text-left md:w-1/3">
                <span className="font-bold">{mentor.company}</span>
                <span className="hidden sm:inline"> - </span>
                <span className="block sm:inline break-words">
                  {mentor.skills}
                </span>
              </div>

              <div className="text-xs sm:text-sm text-gray-600 md:w-1/4 flex flex-col items-start md:items-center">
                <div className="flex items-center gap-1">
                  <img src={StarImage} alt="star" className="w-4 h-4" />
                  <span className="text-green-600">{mentor.rating} / 5.0</span>
                </div>
                <p className="text-xs">{mentor.sessions}</p>
              </div>

              <button className="w-full md:w-44 h-10 sm:h-12 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors mt-2 md:mt-0">
                Book Session
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mentors;
