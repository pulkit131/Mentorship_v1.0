import React from "react";
import mentor1 from "../assets/mentor/khan.png";
import mentor2 from "../assets/mentor/mentor2.png";
import mentor3 from "../assets/mentor/mentor3.png";
import mentor4 from "../assets/mentor/mentor4.png";
import vector from "../assets/vector.png";

const mentors = [
  {
    name: "Hameedhullah Khan Pathan",
    profession: "Software Developer",
    company: "Trellix",
    description: "Cybersecurity, Robotics, Data Loss Prevention",
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
    <section
      id="mentors"
      className="w-full min-h-screen bg-gradient-to-t from-blue-200 to-white flex flex-col items-center py-10 px-2"
    >
      <div className="w-full max-w-[1053px] mx-auto mb-3">
        <h2 className="font-semibold text-[40px] text-center leading-[47px] mb-2">
          Connect with Industry-Proven Mentors
        </h2>
        <p className="font-normal text-[22px] text-[#2AB74A] text-center leading-[31px] mb-6">
          Gain insights from experts who’ve recently secured positions at
          leading tech companies
          <br />
          and know what it takes to succeed in today’s job market.
        </p>
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
              <div className="w-[139px] h-[45px] mt-[5px] flex flex-col justify-center">
                <div className="font-semibold text-[17px] leading-[20px] break-words">
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
            <div className="w-full text-[15px] font-semibold mt-3 text-center ml-[6px] mb-[2px] min-h-[40px]">
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
