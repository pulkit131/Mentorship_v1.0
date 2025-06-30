import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth, provider } from "../firebase/config";
import { signInWithPopup, signOut } from "firebase/auth";
import Swal from "sweetalert2";
import { LogOutIcon, LogInIcon } from "lucide-react";

const Navbar = () => {
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(
    JSON.parse(localStorage.getItem("isAuth")) || false
  );
  const [showMentors, setShowMentors] = useState(false);

  useEffect(() => {
    if (userId === "9m1CekNjkERX5mLZWcQIdZGiXdG3") {
      setShowMentors(true);
    } else {
      setShowMentors(false);
    }
  }, [userId]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    const navbar = document.querySelector('nav');
    const yOffset = navbar ? -navbar.offsetHeight : -80;
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setIsMenuOpen(false); // Close mobile menu after click
  };

  const handleNavigation = (sectionId) => {
    if (location.pathname === "/mydashboard") {
      navigate("/");
      setTimeout(() => scrollToSection(sectionId), 50);
    } else {
      scrollToSection(sectionId);
    }
  };

  function handleLogin() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setIsAuth(true);
        setUserId(user.uid);
        localStorage.setItem("isAuth", true);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userId", user.uid);
        Swal.fire({
          title: "Logged In Successfully",
          icon: "success",
          confirmButtonText: "Cool!",
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Login Failed",
          icon: "error",
          confirmButtonText: "Okay",
        });
      });
  }

  async function handleLogout() {
    try {
      await signOut(auth);
      setIsAuth(false);
      setUserId("");
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
              onClick={() => navigate("/")}
            >
              Letsgetmentors
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden min-[1035px]:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {showMentors && (
                <button
                  onClick={() => navigate("/mentors")}
                  className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition-all duration-300"
                >
                  <i className="bi bi-box-arrow-right"></i> Mentor-Bookings
                </button>
              )}
              <button onClick={() => handleNavigation("hero")} className="hover:text-blue-600 py-2 text-base font-medium transition-colors duration-300">
                Home
              </button>
              <button onClick={() => handleNavigation("mentors")} className="hover:text-blue-600 py-2 text-base font-medium transition-colors duration-300">
                Mentors
              </button>
              <button onClick={() => handleNavigation("about")} className="hover:text-blue-600 py-2 text-base font-medium transition-colors duration-300 min-[767px]:max-[972px]:whitespace-nowrap">
                About Us
              </button>
              <button onClick={() => handleNavigation("faq")} className="hover:text-blue-600 py-2 text-base font-medium transition-colors duration-300">
                FAQ
              </button>
              <button onClick={() => handleNavigation("contact")} className="hover:text-blue-600 py-2 text-base font-medium transition-colors duration-300">
                Contact
              </button>
              {isAuth && (
                <button
                  onClick={() => navigate("/mydashboard")}
                  className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition-all duration-300"
                >
                  <i className="bi bi-box-arrow-right"></i> Dashboard
                </button>
              )}
              {isAuth ? (
                <button
                  onClick={handleLogout}
                  className="flex flex-row gap-1 items-center text-red-600 hover:text-lg font-medium transition-all duration-300 cursor-pointer"
                >
                  Logout <LogOutIcon className="h-5 w-5" />
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="flex flex-row gap-1 items-center text-gray-700 hover:text-blue-600 hover:text-lg font-medium transition-all duration-300 cursor-pointer"
                >
                  Login <LogInIcon className="h-5 w-5" />
                </button>
              )}
              <button
                onClick={() => handleNavigation("booking")}
                className="bg-[#018EE2] text-white text-xl rounded-full px-6 py-3 max-w-xs w-full sm:max-w-sm sm:w-auto flex items-center justify-center hover:bg-blue-700 transform hover:scale-105 transition duration-300 min-[767px]:max-[972px]:px-3 min-[767px]:max-[972px]:py-2 min-[767px]:max-[972px]:text-base"
              >
                Book Session
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="min-[1035px]:hidden">
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
          <div className="min-[1035px]:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {["hero", "mentors", "about", "faq", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavigation(item)}
                  className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium w-full text-left transition-colors duration-300"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
              {isAuth && (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/mydashboard");
                  }}
                  className="cursor-pointer text-gray-700 px-3 py-2 font-medium hover:text-blue-600 transition-all duration-300"
                >
                  <i className="bi bi-box-arrow-right"></i> Dashboard
                </button>
              )}
              {isAuth ? (
                <button
                  onClick={handleLogout}
                  className="flex flex-row gap-1 items-center px-3 py-2 text-gray-700 hover:text-red-600 hover:text-lg font-medium transition-colors duration-300 cursor-pointer"
                >
                  Logout <LogOutIcon />
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="flex flex-row gap-1 items-center px-3 py-2 text-gray-700 hover:text-blue-600 hover:text-lg font-medium transition-colors duration-300 cursor-pointer"
                >
                  Login <LogInIcon />
                </button>
              )}
              <button
                onClick={() => handleNavigation("booking")}
                className="block bg-blue-600 text-white px-3 py-2 text-base font-medium w-full text-left rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Book Session
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;