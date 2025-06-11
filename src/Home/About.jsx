import React from "react";
import { CheckCircle } from "lucide-react";
import aboutImg from "../assets/About.png";
import tick1 from "../Assets/ticks/tick1.png";
import tick2 from "../Assets/ticks/tick2.png";
import tick3 from "../Assets/ticks/tick3.png";
import successImg from "../Assets/successStories.png";
import "@fontsource/inter";

const About = () => {
  const ticks = [tick1, tick2, tick3];

  return (
    <section
      id="about"
      className="font-inter pt-20 px-3 bg-gradient-to-b from-white to-emerald-300 min-h-screen xl:pr-10 "
    >
      <h2 className="hidden md:block text-4xl font-bold text-gray-900 mb-16 text-center">
        About Mentorship Connect
      </h2>
      <div
        id="about-container"
        className="xl:-translate-x-20 xl:mx-auto xl:overflow-x-hidden "
      >
        <div
          id="whitebox"
          className="sticky bg-white max-w-6xl lg:max-w-3xl xl:max-h-auto lg:min-w-3xl mx-auto md:grid md:grid-cols-2 lg:grid-cols-1 items-center h-full min-h-[80vh] lg:min-h-[60vh] rounded-2xl xl:mx-auto lg:mx-auto xl:-translate-x-20 lg:items-start"
        >
          <div className="md:p-12 p-6">
            <h2 className="md:hidden text-4xl font-bold text-gray-900 mb-6">
              About Mentorship Connect
            </h2>
            <p className="text-gray-700 mb-4 text-lg">
              We bridge the gap between engineering students and industry
              professionals. Our platform connects you with recently hired
              engineers who understand the current job market and can provide
              relevant, actionable advice.
            </p>
            <p className="text-gray-700 mb-6 border-t text-lg border-dotted border-cyan-400 pt-4">
              Founded by recent graduates who experienced the challenges of job
              hunting firsthand, we're committed to making career guidance
              accessible to every engineering student.
            </p>
            <ul className="lg:items-center space-y-4 ">
              {[
                "Verified mentors from top companies",
                "Personalized guidance for your career goals",
                "Real-world insights and industry knowledge",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-green-800"
                >
                  <img
                    src={ticks[index]}
                    alt={`tick${index + 1}`}
                    className="w-6 h-6 "
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:hidden mt-10 md:mt-0 relative md:p-0 p-5 md:h-full">
            <img
              src={aboutImg}
              alt="Mentorship session"
              className="rounded-2xl w-full md:h-full md:object-cover "
            />
            <div className="md:absolute md:top-60 md:-translate-x-1/2 md:-translate-y-1/2 md:transform absolute top-4 right-1/12 left-1/5 transform -translate-x-0.3 -translate-y-1/2 z-10">
              <img
                src={successImg}
                alt="Success Stories Badge"
                className="w-[120px] h-auto"
              />
            </div>
          </div>
        </div>
        <div
          id="img-lg"
          className="hidden lg:block sticky  mt-10 p-6 mx-atuo transform translate-x-175 -translate-y-1/2 "
        >
          <img
            src={aboutImg}
            alt="Mentorship session"
            className="rounded-2xl w-auto h-auto"
          />
          <div className="absolute  transform translate-x-63 -translate-y-115 z-10">
            <img
              src={successImg}
              alt="Success Stories Badge"
              className="w-[120px] h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
