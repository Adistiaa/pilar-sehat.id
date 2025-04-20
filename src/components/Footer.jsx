import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#f6fefc] text-[#01130c] py-12 border-t border-[#1ff498]">
      <div className="container mx-auto px-4">
        {/* Logo and tagline section */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center mb-4">
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 5.25C12.455 5.25 5.25 12.455 5.25 21C5.25 29.545 12.455 36.75 21 36.75C29.545 36.75 36.75 29.545 36.75 21C36.75 12.455 29.545 5.25 21 5.25Z" stroke="#1ff498" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 10.5V21L28 24.5" stroke="#1ff498" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h2 className="text-2xl font-bold ml-3 text-[#01130c]">Pillar Sehat</h2>
          </div>
          <p className="text-[#01130c] opacity-80 text-lg">Kesehatan untuk Semua</p>
        </div>

        {/* Navigation links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Main Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-semibold mb-6 text-[#01130c] relative">
              <span className="relative z-10">Halaman Utama</span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-[#1ff498] opacity-40 z-0"></span>
            </h3>
            <ul className="space-y-3 text-center md:text-left">
              <li>
                <Link to="/" className="text-[#01130c] hover:text-[#50b7f7] transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#01130c] hover:text-[#50b7f7] transition-colors duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link to="/forum" className="text-[#01130c] hover:text-[#50b7f7] transition-colors duration-300">
                  Forum
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#01130c] hover:text-[#50b7f7] transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Features Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-semibold mb-6 text-[#01130c] relative">
              <span className="relative z-10">Fitur Kesehatan</span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-[#1ff498] opacity-40 z-0"></span>
            </h3>
            <ul className="space-y-3 text-center md:text-left">
              <li>
                <Link to="/features/physical-health" className="text-[#01130c] hover:text-[#50b7f7] transition-colors duration-300">
                  Physical Health
                </Link>
              </li>
              <li>
                <Link to="/features/mental-health-emotions" className="text-[#01130c] hover:text-[#50b7f7] transition-colors duration-300">
                  Mental Health & Emotions
                </Link>
              </li>
              <li>
                <Link to="/features/environmental-health" className="text-[#01130c] hover:text-[#50b7f7] transition-colors duration-300">
                  Environmental Health
                </Link>
              </li>
              <li>
                <Link to="/features/social-connections" className="text-[#01130c] hover:text-[#50b7f7] transition-colors duration-300">
                  Social Connections
                </Link>
              </li>
            </ul>
          </div>

          {/* Additional Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-semibold mb-6 text-[#01130c] relative">
              <span className="relative z-10">Kesejahteraan</span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-[#1ff498] opacity-40 z-0"></span>
            </h3>
            <ul className="space-y-3 text-center md:text-left">
              <li>
                <Link to="/about/financial-occupational-wellbeing" className="text-[#01130c] hover:text-[#50b7f7] transition-colors duration-300">
                  Financial & Occupational Wellbeing
                </Link>
              </li>
              <li className="flex justify-center md:justify-start space-x-4 pt-4">
                <a href="#" aria-label="Facebook" className="text-[#72e4f8] hover:text-[#1ff498] transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" aria-label="Twitter" className="text-[#72e4f8] hover:text-[#1ff498] transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-[#72e4f8] opacity-30">
          <p className="text-center text-[#01130c] opacity-70">
            © {new Date().getFullYear()} Pillar Sehat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;