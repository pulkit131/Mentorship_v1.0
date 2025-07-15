import React, { useState, useEffect } from "react";
import mentor1 from "../assets/mentor/hameedullah.png";
import mentor2 from "../assets/mentor/navyaa.png";
import mentor3 from "../assets/mentor/ravi.png";

const mentors = [
  {
    name: "Hameedullah Khan Pathan",
    profession: "Software Developer",
    company: "Trellix",
    description: "Python, MySQL, DBMS",
    img: mentor1,
  },
  {
    name: "Navyaa Sharma",
    profession: "Software Engineer",
    company: "Google",
    description: "Java, Machine Learning, TypeScript",
    img: mentor2,
  },
  {
    name: "Ravi Kumar",
    profession: "Software Developer",
    company: "Ex-Google",
    description: "React.js, AngularJS, C++",
    img: mentor3,
  },
];

export default function MentorsSection() {
  const [bookingCounts, setBookingCounts] = useState(Array(mentors.length).fill(0));
  const [waitlistCounts, setWaitlistCounts] = useState(Array(mentors.length).fill(0));
  const [showWaitlist, setShowWaitlist] = useState(Array(mentors.length).fill(false));

  useEffect(() => {
    const intervals = [];

    showWaitlist.forEach((show, idx) => {
      if (show) {
        const interval = setInterval(() => {
          setWaitlistCounts((prev) => {
            const updated = [...prev];
            updated[idx] += 1;
            return updated;
          });
        }, 3000);
        intervals.push(interval);
      }
    });

    return () => intervals.forEach(clearInterval);
  }, [showWaitlist]);

  const handleBooking = (index) => {
    setBookingCounts((prev) => {
      const updated = [...prev];
      if (updated[index] < 20) {
        updated[index] += 1;
        if (updated[index] === 20) {
          const newShowWaitlist = [...showWaitlist];
          newShowWaitlist[index] = true;
          setShowWaitlist(newShowWaitlist);
        }
      }
      return updated;
    });
  };

  return (
    <section
      id="mentors"
      className="w-full min-h-screen bg-gradient-to-t from-blue-200 to-white flex flex-col items-center py-20 px-2"
    >
      <div className="w-full max-w-[1053px] mx-auto mb-3">
        <h2 className="font-semibold text-[40px] text-center leading-[47px] mb-2">
          Connect with Industry-Proven Mentors
        </h2>
        <p className="font-normal text-xl text-[#2AB74A] text-center leading-[31px] mb-6">
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

            {showWaitlist[idx] && (
              <div className="text-gray-600 font-medium mb-1 text-sm">
                +{waitlistCounts[idx]} waiting
              </div>
            )}

            <button
              onClick={() => handleBooking(idx)}
              className={`w-full mt-[10px] ${
                showWaitlist[idx] ? "bg-orange-500 hover:bg-orange-600" : "bg-[#2AB74A] hover:bg-[#21a347]"
              } text-white font-semibold text-[18px] rounded-[10px] py-3 h-[48px]`}
            >
              {showWaitlist[idx] ? "Waitlist" : "Book Session"}
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