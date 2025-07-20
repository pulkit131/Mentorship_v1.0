import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth, provider } from "../firebase/config";
import { signInWithPopup, signOut } from "firebase/auth";
import Swal from "sweetalert2";
import { LogOutIcon, LogInIcon, User, CreditCard, LayoutDashboard } from "lucide-react";
import { useUserStore } from '../store/useUserStore';

const Navbar = () => {
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || "");
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(
    JSON.parse(localStorage.getItem("isAuth")) || false
  );
  const [showMentors, setShowMentors] = useState(false);
  const desktopProfileRef = useRef(null);
  const mobileProfileRef = useRef(null);
  const setUser = useUserStore((state) => state.setUser);
  const createUser = useUserStore((state) => state.createUser);

  useEffect(() => {
    if (userId === "9m1CekNjkERX5mLZWcQIdZGiXdG3") {
      setShowMentors(true);
    } else {
      setShowMentors(false);
    }
  }, [userId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (desktopProfileRef.current && !desktopProfileRef.current.contains(event.target) &&
          mobileProfileRef.current && !mobileProfileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    const navbar = document.querySelector('nav');
    const yOffset = navbar ? -navbar.offsetHeight : -80;
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

const handleNavigation = (sectionId) => {
  if (location.pathname !== "/") {
    navigate("/");
    setTimeout(() => scrollToSection(sectionId), 50);
  } else {
    scrollToSection(sectionId);
  }
};


  async function handleLogin() {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        setIsAuth(true);
        setUserEmail(user.email);
        localStorage.setItem("isAuth", true);
        localStorage.setItem("userEmail", user.email);
        // Remove setting userId to Firebase UID here
        const idToken = await user.getIdToken();
        localStorage.setItem("token", idToken);
        setIsProfileOpen(false);
        // Set user in Zustand store for global access
        setUser({ email: user.email, uid: user.uid, name: user.displayName });
        // Create user in backend database and get backend user _id
        const userObj = await createUser({
          email: user.email,
          uid: user.uid,
          name: user.displayName,
        });
        // Store backend user _id in localStorage
        if (userObj && userObj.id) {
          localStorage.setItem("userId", userObj.id);
          setUserId(userObj.id);
          console.log("Stored backend userId:", userObj.id);
        } else {
          console.error("No backend user id returned from createUser!", userObj);
        }
        Swal.fire({
          title: "Logged In Successfully",
          icon: "success",
          confirmButtonText: "Cool!",
        });
        navigate("/");
        window.location.reload(); // Force refresh after login
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
      setUserEmail("");
      localStorage.setItem("isAuth", false);
      localStorage.setItem("userEmail", "");
      localStorage.setItem("userId", "");
      localStorage.clear();
      setIsProfileOpen(false);
      Swal.fire({
        title: "Logged Out Successfully!",
        icon: "success",
        confirmButtonText: "Okay",
      });
      navigate("/");
      window.location.reload(); // Force refresh after logout
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

  const getProfileContent = () => {
    if (userEmail) {
      return userEmail.charAt(0).toUpperCase();
    }
    return <User className="h-5 w-5" />;
  };

  const getProfileColor = () => {
    if (!isAuth) return "#2AB74A"; 
    return "#018EE2"; 
  };

  const ProfileDropdown = ({ isMobile = false }) => (
    <div className={`absolute ${isMobile ? 'right-0 top-full' : 'right-0 top-full'} mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50`}>
      {isAuth ? (
        <>
          {showMentors && (
            <button
              onClick={() => {
                setIsProfileOpen(false);
                navigate("/mentors");
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              <User className="h-4 w-4" />
              Mentor-Bookings
            </button>
          )}
          <button
            onClick={() => {
              setIsProfileOpen(false);
              navigate("/mydashboard");
            }}
            className="flex items-center gap-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </button>
          <button
            onClick={() => {
              setIsProfileOpen(false);
              navigate("/paymentHistory")
            }}
            className="flex items-center gap-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            <CreditCard className="h-4 w-4" />
            Payment
          </button>
          <hr className="my-1 border-gray-200" />
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors duration-200"
          >
            <LogOutIcon className="h-4 w-4" />
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={handleLogin}
          className="flex items-center gap-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors duration-200"
        >
          <LogInIcon className="h-4 w-4" />
          Login
        </button>
      )}
    </div>
  );

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1
              className="text-2xl font-bold text-blue-600 cursor-pointer"
              onClick={() => navigate("/")}
            > 
              LetsGetMentors
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden min-[1035px]:block">
            <div className="ml-10 flex items-baseline space-x-4">
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
              <button
                onClick={() => handleNavigation("booking")}
                className="bg-[#018EE2] text-white text-xl rounded-full px-6 py-3 max-w-xs w-full sm:max-w-sm sm:w-auto flex items-center justify-center hover:bg-blue-700 transform hover:scale-102 transition duration-300 min-[767px]:max-[972px]:px-3 min-[767px]:max-[972px]:py-2 min-[767px]:max-[972px]:text-base"
              >
                Book Session
              </button>
              
              <div className="relative" ref={desktopProfileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  style={{ backgroundColor: getProfileColor() }}
                >
                  {getProfileContent()}
                </button>
                {isProfileOpen && <ProfileDropdown />}
              </div>
            </div>
          </div>

          <div className="min-[1035px]:hidden flex items-center space-x-2">
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
            
            <div className="relative" ref={mobileProfileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center justify-center w-8 h-8 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                style={{ backgroundColor: getProfileColor() }}
              >
                {getProfileContent()}
              </button>
              {isProfileOpen && <ProfileDropdown isMobile={true} />}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="min-[1035px]:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {["home", "mentors", "about", "faq", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavigation(item)}
                  className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium w-full text-left transition-colors duration-300"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
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