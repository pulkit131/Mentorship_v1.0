import React from "react";
import { useNavigate } from "react-router-dom";

const Mentorlist = () => {
  const navigate = useNavigate();

  return (
    <div
      id="mentorlist"
      className="flex items-start justify-center w-full min-h-screen overflow-x-hidden p-6"
    >
      <div
        id="mentor-box"
        className="flex flex-col h-auto w-full p-4 border-gray-400 rounded-2xl shadow-2xl "
      >
        <h1 className="text-3xl text-blue-600 font-bold">Mentors</h1>
        <div
          id="mentor-buttons"
          className="flex flex-col md:flex-row gap-3 mt-6"
        >
          <button
            className="w-full bg-blue-600 rounded-2xl p-4 text-lg text-white font-medium transition-all duration-300s cursor-pointer hover:bg-blue-800 hover:-translate-y-2"
            onClick={() => {
              navigate("/mentors/sarah-01");
            }}
          >
            Sarah Johnson
          </button>
          <button
            className="w-full bg-blue-600 rounded-2xl p-4 text-lg text-white font-medium transition-all duration-300s cursor-pointer hover:bg-blue-800 hover:-translate-y-2"
            onClick={() => {
              navigate("/mentors/mike-01");
            }}
          >
            Mike Chen
          </button>
          <button
            className="w-full bg-blue-600 rounded-2xl p-4 text-lg text-white font-medium transition-all duration-300s cursor-pointer hover:bg-blue-800 hover:-translate-y-2"
            onClick={() => {
              navigate("/mentors/emily-01");
            }}
          >
            Emily Rodriguez
          </button>
          <button
            className="w-full bg-blue-600 rounded-2xl p-4 text-lg text-white font-medium transition-all duration-300s cursor-pointer hover:bg-blue-800 hover:-translate-y-2"
            onClick={() => {
              navigate("/mentors/david-01");
            }}
          >
            David Kim
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mentorlist;
