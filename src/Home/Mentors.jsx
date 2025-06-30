import React from "react";
import mentor1 from "../assets/mentor/hameedullah.png";
import mentor2 from "../assets/mentor/navyaa.png";
import mentor3 from "../assets/mentor/ravi.png";
import vector from "../assets/Vector.png";

const mentors = [
  {
    name: "Hameedullah Khan Pathan",
    profession: "Software Developer",
    company: "Trellix",
    description: "Python, MySQL, DBMS",
    rating: "4.8",
    sessions: "120+ successful sessions",
    img: mentor1,
  },
  {
    name: "Navyaa Sharma",
    profession: "Software Engineer",
    company: "Google",
    description: "Java, Machine Learning, TypeScript",
    rating: "4.9",
    sessions: "140+ successful sessions",
    img: mentor2,
  },
  {
    name: "Ravi Kumar",
    profession: "Software Developer",
    company: "Ex-Google",
    description: "React.js, AngularJS, C++",
    rating: "4.7",
    sessions: "100+ successful sessions",
    img: mentor3,
  }
];

export default function MentorsSection() {
  return (
    <section id="mentors" className="w-full min-h-screen bg-gradient-to-t from-blue-200 to-white flex flex-col items-center py-20 px-2">
      <div className="w-full max-w-[1053px] mx-auto mb-3">
        <h2 className="font-semibold text-[40px] text-center leading-[47px] mb-2">
          Connect with Industry-Proven Mentors
        </h2>
        <p className="font-normal text-xl text-[#2AB74A] text-center leading-[31px] mb-6">
          Gain insights from experts who’ve recently secured positions at leading tech companies<br />
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
              <div className="w-[139px] h-[37px] mt-[5px] flex flex-col justify-center">
                <div className="font-semibold text-[15px] leading-[20px]">
                  {mentor.name}
                </div>
                <div className="text-[#1976d2] text-[13px] font-semibold leading-[18px]">
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
            <div className="flex items-center w-full mt-2 mb-2 ml-[6px] gap-x-4">
  <img src={vector} alt="star" className="w-4 h-4" />
  <span className="text-[14px] font-normal">
    {mentor.rating} / 5.0
  </span>
  <span className="text-[14px] font-normal">
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
