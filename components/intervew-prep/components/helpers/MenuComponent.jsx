import React, { useState, useRef, useEffect } from "react";
import { Menu, ChevronDown } from "lucide-react";

const TopicsMenu = ({ availableTopics, activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const activeTopicName =
    availableTopics.find((topic) => topic.id === activeTab)?.name ||
    "Select Topic";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTopicSelect = (topicId) => {
    setActiveTab(topicId);
    setIsOpen(false);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 text-cyan-300 px-6 py-3 rounded-lg transition-all duration-300"
        >
          <Menu className="h-5 w-5" />
          <span className="font-medium">{activeTopicName}</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-10 mt-2  w-56 bg-gray-800 rounded-lg shadow-2xl border border-gray-700 py-2 z-50">
            <div className="max-h-[40vh] overflow-y-auto custom-scrollbar">
              {availableTopics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => handleTopicSelect(topic.id)}
                  className={`w-full text-left px-6 py-3 transition-colors duration-200 ${
                    activeTab === topic.id
                      ? "bg-cyan-500/10 text-cyan-400"
                      : "text-cyan-300 hover:bg-gray-700 hover:text-cyan-400"
                  }`}
                >
                  {topic.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicsMenu;
