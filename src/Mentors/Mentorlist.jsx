import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { useWaitlistStore } from "../store/useWaitlistStore";
import { useUserStore } from "../store/useUserStore";

const Mentorlist = () => {
  const navigate = useNavigate();
  const [mentors, setMentors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [waitlistStatus, setWaitlistStatus] = useState({});
  
  const { addToWaitlist, getUserWaitlistEntries, userWaitlistEntries } = useWaitlistStore();
  const { user } = useUserStore();

  // Fetch mentors
  useEffect(() => {
    const fetchMentors = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get("/users?role=MENTOR");
        setMentors(res.data);
      } catch (error) {
        setMentors([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMentors();
  }, []);

  // Fetch waitlist status for all mentors
  useEffect(() => {
    const fetchWaitlists = async () => {
      if (mentors.length === 0) return;
      const statusObj = {};
      await Promise.all(
        mentors.map(async (mentor) => {
          try {
            const res = await axiosInstance.get(`/bookings/mentor/${mentor.id}/waitlist-status`);
            statusObj[mentor.id] = res.data.waitlist;
          } catch {
            statusObj[mentor.id] = false;
          }
        })
      );
      setWaitlistStatus(statusObj);
    };
    fetchWaitlists();
  }, [mentors]);

  // Fetch user's waitlist entries
  useEffect(() => {
    if (user?.id) {
      getUserWaitlistEntries(user.id);
    }
  }, [user, getUserWaitlistEntries]);

  return (
    <div id="mentorlist" className="flex items-start justify-center w-full min-h-screen overflow-x-hidden p-6">
      <div id="mentor-box" className="flex flex-col h-auto w-full p-4 border-gray-400 rounded-2xl shadow-2xl ">
        <h1 className="text-3xl text-blue-600 font-bold">Mentors</h1>
        <div id="mentor-buttons" className="flex flex-col md:flex-row gap-3 mt-6">
          {isLoading ? (
            <div>Loading mentors...</div>
          ) : mentors.length === 0 ? (
            <div>No mentors found.</div>
          ) : (
            mentors.map((mentor) => {
              const isWaitlist = waitlistStatus[mentor.id];
              const isUserOnWaitlist = userWaitlistEntries.some(entry => 
                entry.mentorId === mentor.id
              );
              
              return (
                <div key={mentor.id} className="flex flex-col gap-2">
                  <button
                    className={`w-full rounded-2xl p-4 text-lg text-white font-medium transition-all duration-300 cursor-pointer hover:-translate-y-2 ${
                      isWaitlist
                        ? "bg-blue-600 hover:bg-blue-800"
                        : "bg-green-600 hover:bg-green-800"
                    }`}
                    onClick={() => {
                      navigate(`/mentors/${mentor.id}`);
                    }}
                  >
                    {mentor.name} ({mentor.email}){" "}
                    {isWaitlist ? " - Join Waitlist" : " - Add Mentor"}
                  </button>
                  
                  {isWaitlist && !isUserOnWaitlist && (
                    <button
                      className="w-full rounded-2xl p-2 text-sm text-blue-600 border-2 border-blue-600 font-medium transition-all duration-300 cursor-pointer hover:bg-blue-50"
                      onClick={async () => {
                        if (user?.id) {
                          await addToWaitlist(user.id, mentor.id);
                        }
                      }}
                    >
                      Join Waitlist (No Payment Required)
                    </button>
                  )}
                  
                  {isUserOnWaitlist && (
                    <div className="w-full rounded-2xl p-2 text-sm text-green-600 border-2 border-green-600 font-medium text-center">
                      ✓ On Waitlist
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Mentorlist;
