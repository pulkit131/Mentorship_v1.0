import React from "react";
import { CheckCircle } from "lucide-react";
import aboutImg from "../assets/About.png";
import tick1 from "../assets/ticks/tick1.png";
import tick2 from "../assets/ticks/tick2.png";
import tick3 from "../assets/ticks/tick3.png";
import successImg from "../assets/successStories.png";
import "@fontsource/inter";
import "./About.css";

const About = () => {
  const ticks = [tick1, tick2, tick3];

  return (
    <section
      id="about"
      className="font-inter pt-6 px-3 bg-gradient-to-b from-white to-emerald-300 min-h-screen xl:pr-10 "
    >
      <h2 className="hidden md:block text-4xl font-bold text-gray-900 mb-21 mt-20 text-center ">
        About LetsGetMentors
      </h2>
      <div
        id="about-container"
        className="xl:mx-auto xl:overflow-x-hidden lg:ml-[-280px]"
      >
        <div
          id="whitebox"
          className="sticky bg-white max-w-6xl lg:max-w-3xl xl:max-h-auto lg:min-w-3xl mx-auto md:grid md:grid-cols-2 lg:grid-cols-1 items-center h-full min-h-[80vh] lg:min-h-[40vh] rounded-2xl xl:mx-auto  xl:-translate-x-20 lg:translate-x-15 lg:block"
        >
          <div className="md:p-12 p-6">
            <h2 className="md:hidden text-4xl font-bold text-gray-900 mb-6">
              About LetsGetMentors
            </h2>
            <p className="text-gray-700 mb-4 text-lg">
              Most students waste months just deciding what to learn DSA or
              dev first? Which projects? What actually matters for jobs? What
              are companies really looking for? That’s where we come in. We’re
              not a course. We’re not a coaching class. We’re a mentorship
              platform where SDEs from top MNCs guide you week by week
              through a focused, personalized journey.
            </p>
            <p className="text-gray-700 mb-6 border-t text-lg border-dotted border-cyan-400 pt-4">
              We built this platform after seeing countless students stuck
              despite working hard. The real gap wasn’t effort it was
              direction. So we created what we wished we had: real mentorship
              from those who’ve been through it. And if after Session 1 you feel
              it’s not the right fit, we’ll give you a full refund no
              questions asked.
            </p>
            <ul className="lg:items-center space-y-4 ">
              {[
                "Made by engineers who’ve faced the same confusion",
                " Built for clarity, not more content",
                "3–5x more affordable than most mentorship platforms",
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
              className="rounded-2xl w-full md:h-full md:object-cover"
            />
          </div>
        </div>
        <div
          id="img-lg"
          className="hidden lg:block sticky mt-10 p-6 mx-auto -translate-y-10 translate-x-35"
        >
          <img
            src={aboutImg}
            alt="Mentorship session"
            className="rounded-2xl w-auto h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
