import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Icons for social links

const Footer = () => {
  return (
    <footer className="bg-bgColor text-white py-8 border-t border-gray-900">
      <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
        {/* Left side - Logo/Brand Name */}
        <div className="flex items-center mb-4 md:mb-0">
          <h2 className="text-2xl font-semibold">MovieWorld</h2>
        </div>

        {/* Center - Social Links */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="#" aria-label="Facebook" className="hover:text-gray-400">
            <FaFacebook size={24} />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-gray-400">
            <FaTwitter size={24} />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-gray-400">
            <FaInstagram size={24} />
          </a>
        </div>

        {/* Right side - Links */}
        <div className="text-sm text-gray-400">
          <a href="#" className="hover:text-white mx-4">Privacy Policy</a>
          <a href="#" className="hover:text-white mx-4">Terms of Service</a>
          <a href="#" className="hover:text-white mx-4">Contact Us</a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-6">
        © 2024 MovieWorld. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
