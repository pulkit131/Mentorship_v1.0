import React, { useEffect, useState } from "react";
import mentor1 from "../assets/mentor/hameedullah.png";
import mentor2 from "../assets/mentor/navyaa.png";
import mentor3 from "../assets/mentor/ravi.png";
import { axiosInstance } from "../lib/axios";

// Static mentor data (everything except name)
const staticMentorsData = [
  {
    profession: "Software Engineer",
    company: "Google",
    description: "Java, Machine Learning, TypeScript",
    img: mentor2,
  },
  {
    profession: "Software Developer",
    company: "Ex-Google",
    description: "React.js, AngularJS, C++",
    img: mentor3,
  },
  {
    profession: "Software Developer",
    company: "Trellix",
    description: "Python, MySQL, DBMS",
    img: mentor1,
  }
];

export default function MentorsSection() {
  const [mentors, setMentors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMentors = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get("/users?role=MENTOR");
        const dbMentors = res.data;
        
        // Combine static data with dynamic names from DB
        const combinedMentors = dbMentors.map((dbMentor, index) => ({
          ...staticMentorsData[index], // Get static data by index
          id: dbMentor.id,
          name: dbMentor.name, // Use name from DB
          email: dbMentor.email,
          profileImage: dbMentor.profileImage,
        }));
        
        setMentors(combinedMentors);
      } catch (error) {
        setMentors([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMentors();
  }, []);

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
          Gain insights from experts who've recently secured positions at
          leading tech companies
          <br />
          and know what it takes to succeed in today's job market.
        </p>
      </div>
      <div className="w-full max-w-[1200px] flex flex-wrap justify-center gap-x-7 gap-y-8">
        {isLoading ? (
          <div>Loading mentors...</div>
        ) : mentors.length === 0 ? (
          <div>No mentors found.</div>
        ) : (
          mentors.map((mentor, idx) => (
            <div
              key={mentor.id}
              className="bg-white rounded-[20px] shadow-md flex flex-col items-center w-[312px] min-h-[230px] p-[18px] relative"
            >
              <div className="flex w-full">
                {mentor.profileImage || mentor.img ? (
                  <img
                    src={mentor.profileImage || mentor.img}
                    alt={mentor.name}
                    className="rounded-full w-[70px] h-[70px] object-cover mr-[18px]"
                  />
                ) : (
                  <div className="rounded-full w-[70px] h-[70px] bg-gray-200 mr-[18px] flex items-center justify-center text-2xl font-bold text-gray-500">
                    {mentor.name[0]}
                  </div>
                )}
                <div className="w-[139px] h-[37px] mt-[5px] flex flex-col justify-center">
                  <div className="font-semibold text-[15px] leading-[20px]">
                    {mentor.name}
                  </div>
                  <div className="text-[#1976d2] text-[13px] font-semibold leading-[18px]">
                    {mentor.profession} at {mentor.company}
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center text-sm text-black mb-6">
                {mentor.description}
              </div>
              <button
                onClick={() =>
                  document
                    .getElementById("booking")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="w-full bg-[#2AB74A] text-white font-semibold text-[18px] rounded-[10px] py-3 hover:bg-[#21a347] h-[48px]"
              >
                Book Session
              </button>
            </div>
          ))
        )}
      </div>
      <button className="mt-10 w-[312px] h-[48px] rounded-[10px] bg-[#1976d2] text-white text-[20px] font-semibold hover:bg-[#1253a2]">
        All Mentors
      </button>
    </section>
  );
}