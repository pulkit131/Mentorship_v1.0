import React from "react";
import mentor1 from "../assets/mentor/mentor1.png";
import mentor2 from "../assets/mentor/mentor2.png";
import mentor3 from "../assets/mentor/mentor3.png";
import mentor4 from "../assets/mentor/mentor4.png";
import vector from "../assets/vector.png";

const mentors = [
  {
    name: "Sarah Johnson",
    profession: "Data Scientist",
    company: "Microsoft",
    description: "Machine Learning, Python, Analytics",
    rating: "4.8",
    sessions: "120+ successful sessions",
    img: mentor1,
  },
  {
    name: "David Lee",
    profession: "Backend Engineer",
    company: "Amazon",
    description: "Node.js, AWS, System Design",
    rating: "4.9",
    sessions: "140+ successful sessions",
    img: mentor2,
  },
  {
    name: "Priya Singh",
    profession: "UI/UX Designer",
    company: "Google",
    description: "Figma, Design Systems, UX Research",
    rating: "4.7",
    sessions: "100+ successful sessions",
    img: mentor3,
  },
  {
    name: "Alex Kim",
    profession: "Frontend Developer",
    company: "Meta",
    description: "React, TypeScript, Web Performance",
    rating: "4.8",
    sessions: "110+ successful sessions",
    img: mentor4,
  },
  {
    name: "Sarah Johnson",
    profession: "Data Scientist",
    company: "Microsoft",
    description: "Machine Learning, Python, Analytics",
    rating: "4.8",
    sessions: "120+ successful sessions",
    img: mentor2,
  },
];

export default function MentorsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-emerald-500 via-white to-blue-200 border-0 shadow-none">
      <div id="mentors" className="max-w-5xl mx-auto px-2 sm:px-4">
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Connect with Industry-Proven Mentors
          </h2>
        </div>

        <div className="text-center mb-10 px-4">
          <p className="text-lg sm:text-xl md:text-2xl text-[#1b7f5a] font-medium leading-snug max-w-2xl mx-auto">
            Gain insights from experts who’ve recently secured positions at
            leading tech companies
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
                  <p className="font-semibold text-gray-900 truncate">
                    {mentor.name}
                  </p>
                  <p className="text-sm text-[#1976d2] truncate">
                    {mentor.role}
                  </p>
                  <p className="text-sm text-gray-700 truncate">
                    <span className="font-semibold">{mentor.company}</span>
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {mentor.skills}
                  </p>
                </div>
              </div>

              {/* Rating & Sessions */}
              <div className="flex flex-row items-center gap-4 md:w-1/3 min-w-0 justify-center md:justify-start">
                <div className="flex items-center gap-1">
                  <img src={StarImage} alt="star" className="w-4 h-4" />
                  <span className="text-green-600 font-semibold">
                    {mentor.rating} / 5.0
                  </span>
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
          <button className="w-full max-w-xs md:max-w-md h-[44px] bg-[#1976d2] text-white text-base font-semibold rounded-xl hover:bg-[#1251a3] transition duration-150 shadow">
            All Mentors
          </button>
        </div>
      </div>

      <div className="w-full max-w-[1200px] flex flex-wrap justify-center gap-x-7 gap-y-8">
        {mentors.map((mentor, idx) => (
          <div
            key={idx}
            className="bg-white rounded-[20px] shadow-md flex flex-col items-center w-[312px] min-h-[230px] p-[18px] relative"
          >
            <div className="flex w-full">
              <img
                src={mentor.img}
                alt={mentor.name}
                className="rounded-full w-[70px] h-[70px] object-cover mr-[18px]"
              />
              <div className="w-[139px] h-[37px] mt-[5px] flex flex-col justify-center">
                <div className="font-semibold text-[17px] leading-[20px]">
                  {mentor.name}
                </div>
                <div className="text-[#1976d2] text-[15px] font-semibold leading-[18px]">
                  {mentor.profession}
                </div>
                <div className=" text-[14px] font-bold leading-[16px]">
                  {mentor.company}
                </div>
              </div>
            </div>
            <div className="w-full text-[15px] font-semibold mt-3 text-center ml-[6px] mb-[2px]">
              {mentor.description}
            </div>
            <div className="flex items-center w-full mt-2 mb-2 ml-[6px]">
              <img src={vector} alt="star" className="w-4 h-4 mr-1" />
              <span className="text-[14px] font-normal mr-2">
                {mentor.rating} / 5.0
              </span>
              <span className="text-[14px] font-normal ml-10">
                {mentor.sessions}
              </span>
            </div>
            <button className="w-full mt-[10px] bg-[#2AB74A] text-white font-semibold text-[18px] rounded-[10px] py-3 hover:bg-[#21a347] h-[48px]">
              Book Session
            </button>
          </div>
        ))}
      </div>

      <button className="mt-10 w-[312px] h-[48px] rounded-[10px] bg-[#1976d2] text-white text-[20px] font-semibold hover:bg-[#1253a2]">
        All Mentors
      </button>
    </section>
  );
}
