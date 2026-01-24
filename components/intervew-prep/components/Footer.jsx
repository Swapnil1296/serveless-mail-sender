// Footer.js
import React from "react";
import { Coffee, Phone } from "lucide-react";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 text-center mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
        {/* Reserved Rights */}
        <p className="text-sm">
          © 2025 Your Company. All rights reserved <a href="https://www.linkedin.com/in/swapnil-landage/" target="_blank" className="hover:underline">@Swapnil</a> 
        </p>

        {/* Phone Number */}
        <div className="inline-flex items-center">
          <Phone className="w-5 h-5 mr-2" />
          <span className="text-sm">+917666604697</span>
        </div>
        {/* Buy Me a Coffee (not clickable) */}
        <div className="inline-flex items-center">
          <Coffee className="w-5 h-5 mr-2" />
          <span className="text-sm">Buy me a coffee</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
