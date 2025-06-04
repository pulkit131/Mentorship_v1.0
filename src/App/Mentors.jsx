import React from "react";

const mentors = [
  {
    name: "Sarah Johnson",
    role: "Data Scientist",
    company: "Microsoft",
    skills: "Machine Learning, Python, Analytics",
    rating: "4.8",
    sessions: "120+ successful sessions",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Mike Chen",
    role: "DevOps Engineer",
    company: "Amazon",
    skills: "Cloud Architecture, Kubernetes, AWS",
    rating: "4.6",
    sessions: "96+ successful sessions",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Emily Rodriguez",
    role: "Product Manager",
    company: "Meta",
    skills: "Product Strategy, Agile, Leadership",
    rating: "4.4",
    sessions: "58+ successful sessions",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "David Kim",
    role: "Frontend Developer",
    company: "Netflix",
    skills: "React, TypeScript, UI/UX Design",
    rating: "4.9",
    sessions: "138+ successful sessions",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
  },
];

const starIcon =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Plain_Yellow_Star.png/32px-Plain_Yellow_Star.png";

const Mentors = () => {
  return (
    <div
      id="mentors"
      className="relative mx-auto bg-white w-[1074px] h-[627px] mt-[100px]"
    >
      {/* Title */}
      <h2 className="text-[32px] font-bold text-center mb-6 w-[745px] mx-auto">
        Connect with Industry-Proven Mentors
      </h2>

      {/* Subheading */}
      <p className="text-[26px] text-green-700 text-center font-[400] mb-12 w-[1053px] mx-auto">
        Gain insights from experts who've recently secured positions at leading
        tech companies and know what it takes to succeed in today's job market.
      </p>

      {/* Mentor List */}
      <div className="flex flex-col gap-6 w-[1006px] mx-auto">
        {mentors.map((mentor, index) => (
          <div
            key={index}
            className="flex items-center justify-between h-[48px]"
          >
            {/* Avatar + Name + Role */}
            <div className="flex items-center gap-4 w-[250px]">
              <img
                src={mentor.avatar}
                alt={mentor.name}
                className="rounded-full w-[48px] h-[48px]"
              />
              <div>
                <p className="font-semibold">{mentor.name}</p>
                <p className="text-sm text-blue-600">{mentor.role}</p>
              </div>
            </div>

            {/* Company + Skills */}
            <div className="text-sm text-center w-[340px]">
              <span className="font-bold">{mentor.company}</span> -{" "}
              {mentor.skills}
            </div>

            {/* Rating & Sessions */}
            <div className="text-sm text-gray-600 w-[188px] flex flex-col items-start justify-center">
              <div className="flex items-center gap-1">
                <img src={starIcon} alt="star" className="w-4 h-4" />
                <span className="text-green-600">{mentor.rating} / 5.0</span>
              </div>
              <p className="text-xs">{mentor.sessions}</p>
            </div>

            {/* Button */}
            <button className="w-[198px] h-[48px] bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
              Book Session
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mentors;
