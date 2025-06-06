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
    <section
      className="py-20"
      style={{
        background: `linear-gradient(
          180deg,
          rgba(71, 155, 102, 1),
          rgba(121, 182, 143, 1),
          rgba(165, 206, 180, 1),
          rgba(255, 255, 255, 1),
          rgba(235, 240, 255, 1),
          rgba(191, 219, 254, 1)
        )`,
      }}
    >
      <div id="mentors" className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Connect with Industry-Proven Mentors
          </h2>
        </div>

        <div className="text-center mb-10 px-4">
          <p className="text-[22px] leading-[25px] text-emerald-900 text-center px-4 max-w-[900px] mx-auto">
            Gain insights from experts who’ve recently secured positions at
            leading tech companies
            <br />
            and know what it takes to succeed in today’s job market.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-4xl mx-auto">
          {mentors.map((mentor, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0 bg-white rounded-xl px-4 py-4 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:-translate-y-1"
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

              <button className="w-[198px] h-[48px] bg-blue-600 text-white text-sm font-medium rounded-[14px] hover:bg-blue-700 transition duration-300">
                Book Session
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            className="w-[336px] h-[50px] bg-blue-600 text-white text-base font-semibold rounded-[14px] hover:bg-blue-700 transition duration-300"
            style={{ marginTop: "20px" }}
          >
            All Mentors
          </button>
        </div>
      </div>
    </section>
  );
};

export default Mentors;