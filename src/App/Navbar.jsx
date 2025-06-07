import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    // Close mobile menu when navigating
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40 transition-all duration-300">
      <div className="w-full px-4 sm:px-2 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0" >
            <h1 className="text-3xl font-bold text-[#018EE2]">
              Mentorship Connect
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-10">
              <button
                onClick={() => scrollToSection("hero")}
                className="hover:text-blue-600 py-2 text-base font-medium transition-colors duration-300"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("mentors")}
                className="hover:text-blue-600 py-2 text-base font-medium transition-colors duration-300"
              >
                Mentors
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="hover:text-blue-600 py-2 text-base font-medium transition-colors duration-300"
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="hover:text-blue-600 py-2 text-base font-medium transition-colors duration-300"
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="hover:text-blue-600 py-2 text-base font-medium transition-colors duration-300"
              >
                Contact
              </button>
              <button
                onClick={() => scrollToSection("booking")}
                className="bg-[#018EE2] text-white text-xl rounded-full 
    px-6 py-4 
    max-w-xs w-full sm:max-w-sm sm:w-auto 
    flex items-center justify-center 
    hover:bg-blue-700 transform hover:scale-105 
    transition duration-300"

              >
                Book Session
              </button>
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
              <button
                onClick={() => scrollToSection("booking")}
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
