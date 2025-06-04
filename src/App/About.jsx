import React from "react";
import { CheckCircle } from "lucide-react";
import aboutImg from "../assets/About.png"; 
import "@fontsource/inter"; 

const About = () => {
  return (
    <section className="font-inter py-20 bg-gradient-to-b from-white to-emerald-300 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center h-full min-h-[80vh]">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            About Mentorship Connect
          </h2>
          <p className="text-gray-700 mb-4">
            We bridge the gap between engineering students and industry professionals.
            Our platform connects you with recently hired engineers who understand the
            current job market and can provide relevant, actionable advice.
          </p>
          <p className="text-gray-700 mb-6 border-t border-dotted border-cyan-400 pt-4">
            Founded by recent graduates who experienced the challenges of job hunting
            firsthand, we're committed to making career guidance accessible to every
            engineering student.
          </p>
          <ul className="space-y-4">
            {[
              "Verified mentors from top companies",
              "Personalized guidance for your career goals",
              "Real-world insights and industry knowledge",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-green-800">
                <CheckCircle className="text-green-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center md:justify-end">
          <img
            src={aboutImg}
            alt="Mentorship session"
            className="rounded-2xl  max-w-full w-[650px] h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
