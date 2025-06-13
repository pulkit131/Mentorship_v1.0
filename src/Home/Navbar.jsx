import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { auth, provider } from "../firebase/config";
import { signInWithPopup, signOut } from "firebase/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { LogOutIcon, LogInIcon } from "lucide-react";

const Navbar = () => {
   const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(
    JSON.parse(localStorage.getItem("isAuth")) || false
  );
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    // Close mobile menu when navigating
    setIsMenuOpen(false);
  };
  const [showMentors,setShowMentors]=useState(false);
  useEffect(() => {
  if (userId === "9m1CekNjkERX5mLZWcQIdZGiXdG3") {
    setShowMentors(true);
  } else {
    setShowMentors(false);
  }
}, [userId]);

  function handleLogin() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        setIsAuth(true);
        localStorage.setItem("isAuth", true);
        localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userId",user.uid );
        Swal.fire({
          title: "Logged In Successfully",
          icon: "success",
          confirmButtonText: "Cool!",
        });
      })
      .catch(function (error) {
        console.error(error);
        Swal.fire({
          title: `Login Failed`,
          icon: "error",
          confirmButtonText: "Okay",
        });
      });
  }

  async function handleLogout() {
    try {
      await signOut(auth); // Wait for logout to complete
      setIsAuth(false);
      localStorage.setItem("isAuth", false);
      localStorage.setItem("userEmail", "");
      
      localStorage.setItem("userId", "");
      Swal.fire({
        title: "Logged Out Successfully!",
        icon: "success",
        confirmButtonText: "Okay",
      });
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      Swal.fire({
        title: "Logout Failed",
        text: error.message,
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1
              className="text-2xl font-bold text-blue-600 cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              Mentorship Connect
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {showMentors && (
                <>
                  <button
                    onClick={() => navigate("/mentors")}
                    className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition-all duration-300"
                  >
                    <i className="bi bi-box-arrow-right cursor-pointer"></i>{" "}
                     Mentor-Bookings
                  </button>
                </>
              )}
              <button
                onClick={() => scrollToSection("hero")}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("mentors")}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer"
              >
                Mentors
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer"
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer"
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer"
              >
                Contact
              </button>
              {/* <button
                onClick={() => scrollToSection("booking")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                Book Session
              </button> */}
              
              {isAuth && (
                <>
                  <button
                    onClick={() => navigate("/mydashboard")}
                    className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition-all duration-300"
                  >
                    <i className="bi bi-box-arrow-right cursor-pointer"></i>{" "}
                    Dashboard{" "}
                  </button>
                </>
              )}

              {isAuth ? (
                <>
                  <button
                    onClick={handleLogout}
                    className="flex flex-row gap-1 items-center text-red-600 hover:text-lg font-medium transition-all duration-300 cursor-pointer"
                  >
                    Logout <LogOutIcon className="h-5 w-5" />
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLogin}
                  className="flex flex-row gap-1 items-center text-gray-700 hover:text-blue-600 hover:text-lg font-medium transition-all duration-300 cursor-pointer"
                >
                  Login <LogInIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600 transition-colors duration-300"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button
                onClick={() => scrollToSection("hero")}
                className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium w-full text-left transition-colors duration-300"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("mentors")}
                className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium w-full text-left transition-colors duration-300"
              >
                Mentors
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium w-full text-left transition-colors duration-300"
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium w-full text-left transition-colors duration-300"
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium w-full text-left transition-colors duration-300"
              >
                Contact
              </button>
              {/* <button
                onClick={() => scrollToSection("booking")}
                className="block bg-blue-600 text-white px-3 py-2 text-base font-medium w-full text-left rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Book Session
              </button> */}
              {isAuth && (
                <>
                  <button
                    onClick={() => navigate("/mydashboard")}
                    className="cursor-pointer text-gray-700 px-3 py-2 font-medium hover:text-blue-600 transition-all duration-300"
                  >
                    <i className="bi bi-box-arrow-right cursor-pointer"></i>{" "}
                    Dashboard{" "}
                  </button>
                </>
              )}
              {isAuth ? (
                <>
                  {/* <NavLink to="/create" className="link">
                    Create
                  </NavLink> */}
                  <button
                    onClick={handleLogout}
                    className="flex flex-row gap-1 items-center px-3 py-2 text-gray-700 hover:text-red-600 hover:text-lg font-medium transition-colors duration-300 cursor-pointer"
                  >
                    Logout <LogOutIcon />
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLogin}
                  className="flex flex-row gap-1 items-center px-3 py-2 text-gray-700 hover:text-blue-600 hover:text-lg font-medium transition-colors duration-300 cursor-pointer"
                >
                  Login <LogInIcon />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
