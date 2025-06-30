import React from "react";
import { FaLinkedinIn, FaFacebookF, FaTwitter } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-[#0A142F] w-full pt-14 pb-8">
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-[1200px] px-4 flex flex-col md:flex-row md:justify-between gap-8">
        {/* Services */}
        <div>
          <h3 className="font-bold text-base text-white mb-3">Services</h3>
          <ul className="space-y-2 text-[16px] text-[#bfc8db]">
            <li>Mentor database</li>
            <li>Book Session</li>
            <li>About Us</li>
            <li>Session planner</li>
          </ul>
        </div>
        {/* Information */}
        <div>
          <h3 className="font-bold text-base text-white mb-3">Information</h3>
          <ul className="space-y-2 text-[16px] text-[#bfc8db]">
            <li>Terms</li>
            <li>Privacy</li>
            <li>Cookies</li>
          </ul>
        </div>
        {/* Contact us */}
        <div>
          <h3 className="font-bold text-base text-white mb-3">Contact us</h3>
          <ul className="space-y-2 text-[16px] text-[#bfc8db]">
            <li>Email: support@mentorshipconnect.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Available 24/7 for support</li>
          </ul>
        </div>
        {/* Newsletter */}
        <div className="w-full md:w-[340px] bg-[#172042] rounded-[8px] p-6 flex flex-col gap-3 mt-8 md:mt-0">
          <h3 className="font-bold text-base text-white mb-1">Subscribe to our Newsletter!</h3>
          <input
            type="text"
            placeholder="Enter your Name"
            className="rounded-lg px-4 py-3 text-[16px] text-black focus:outline-none border border-[#e1c77a] bg-white font-medium"
          />
          <p className="text-xs text-[#bfc8db] mt-1">
            Hello, join us today. Connecting engineering students with industry professionals for career growth and success.
          </p>
        </div>
      </div>
      {/* Divider */}
      <div className="w-full max-w-[1200px] border-t border-[#2c3446] mt-12 mb-6"></div>
      {/* Bottom bar */}
      <div className="w-full max-w-[1200px] px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Logo and copyright */}
        <div className="flex items-center gap-2">
          {/* <span className="text-2xl font-extrabold text-[#2196f3]">Letsgetmentors</span> */}
          <span className="text-2xl font-extrabold text-[#21e6c1]">Letsgetmentors</span>
          
        </div>
        <div className="text-xs text-[#bfc8db] font-semibold">
          © 2025 Letsgetmentors. All rights reserved. Made with <span className="text-red-400">♥</span> for engineering students
        </div>
        {/* Social icons */}
        <div className="flex gap-4">
          <a href="#" aria-label="LinkedIn" className="rounded-full bg-[#172042] p-2 hover:bg-[#2196f3] transition-colors">
            <FaLinkedinIn className="text-xl text-[#bfc8db] hover:text-white" />
          </a>
          <a href="#" aria-label="Facebook" className="rounded-full bg-[#172042] p-2 hover:bg-[#2196f3] transition-colors">
            <FaFacebookF className="text-xl text-[#bfc8db] hover:text-white" />
          </a>
          <a href="#" aria-label="Twitter" className="rounded-full bg-[#172042] p-2 hover:bg-[#2196f3] transition-colors">
            <FaTwitter className="text-xl text-[#bfc8db] hover:text-white" />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
