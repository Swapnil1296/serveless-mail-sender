"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Search, ChevronDown, ChevronUp, ArrowUp, X } from 'lucide-react';
import CodeBlock from './helpers/CodeBlock';


import FormattedText from './helpers/FormattedText';
import TopicsMenu from "./helpers/MenuComponent";
import Header from "./Header";
import { topics } from './helpers/Topics';



const InterviewPrepApp = ({ dataSources }) => {
  const [activeTab, setActiveTab] = useState("react");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const [availableTags, setAvailableTags] = useState([]);
  const questionRefs = useRef({});
  const [showSearchBar, setShowSearchBar] = useState(true);
  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const activeData = getActiveData();
    const tags = new Set();
    activeData?.forEach((item) => {
      item?.tags?.forEach((tag) => tags.add(tag));
    });
    setAvailableTags(Array.from(tags));
    setSelectedTag("");
    setSearchQuery("");
    setExpandedQuestion(null);
  }, [activeTab]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setShowSearchBar(true)
  };

  const getActiveData = () => {
    const activeSource = topics.find(
      (topic) => topic.id === activeTab
    )?.dataSource;
    return dataSources?.[activeSource] || [];
  };

  const handleTagClick = (tag) => {
    setSelectedTag((prevTag) => (prevTag === tag ? "" : tag));
    setSearchQuery(""); // Clear search when selecting tag
  };

  const filteredQuestions = getActiveData().filter((q) => {
    if (!q?.question) return false;

    const matchesSearch = q.question
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || q?.tags?.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const handleQuestionClick = (questionId) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);

    if (expandedQuestion !== questionId) {
      setTimeout(() => {
        questionRefs.current?.[questionId]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  const availableTopics = topics.filter(
    (topic) => dataSources?.[topic.dataSource]?.length > 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br  from-gray-900 via-gray-800 to-black text-white font-serif">
      <Header />

      <div className="bg-gray-800/80 backdrop-blur-sm shadow-lg sticky top-0 z-30 border-b border-gray-700">
        <TopicsMenu
          availableTopics={availableTopics}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      <div className="container mx-auto px-4 py-6 sticky top-14 z-20 bg-transparent flex items-center justify-end">
        <button
          onClick={toggleSearchBar}
          className="w-12 h-12 mr-4 transition-transform duration-300 hover:scale-110 focus:outline-none"
          aria-label={showSearchBar ? "Hide search" : "Show search"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" className="w-full h-full">
            {/* SVG content from artifact */}
            <circle cx="30" cy="30" r="28" fill="none" stroke="url(#outerGlow)" strokeWidth="1" />
            <circle cx="30" cy="30" r="24" fill="url(#buttonGradient)" />
            <circle cx="30" cy="30" r="20" fill="none" stroke="#80e5ff" strokeWidth="1.5" strokeDasharray="1,3" />
            <circle cx="30" cy="30" r="16" fill="url(#innerGradient)" />

            {/* Show appropriate icon based on state */}
            <g style={{ opacity: showSearchBar ? 0 : 1 }}>
              <circle cx="25" cy="25" r="8" fill="none" stroke="#ffffff" strokeWidth="2" />
              <line x1="31" y1="31" x2="38" y2="38" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            </g>

            <g style={{ opacity: showSearchBar ? 1 : 0 }}>
              <path d="M20,30 C20,30 25,20 30,20 C35,20 40,30 40,30 C40,30 35,40 30,40 C25,40 20,30 20,30 Z" fill="none" stroke="#ffffff" strokeWidth="2" />
              <circle cx="30" cy="30" r="4" fill="#ffffff" />
              <line x1="18" y1="42" x2="42" y2="18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            </g>

            <circle cx="30" cy="30" r="23" fill="none" stroke="#00ffff" strokeWidth="0.5" opacity="0.7">
              <animate attributeName="r" values="23;26;23" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2s" repeatCount="indefinite" />
            </circle>

            <defs>
              <linearGradient id="buttonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#001e33" />
                <stop offset="100%" stopColor="#003366" />
              </linearGradient>

              <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#004080" />
                <stop offset="100%" stopColor="#0066cc" />
              </linearGradient>

              <radialGradient id="outerGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="80%" stopColor="#00ccff" stopOpacity="0" />
                <stop offset="100%" stopColor="#00ffff" stopOpacity="0.7" />
              </radialGradient>
            </defs>
          </svg>
        </button>

        {/* Animated search bar */}
        <div className={`relative transition-all duration-300 ease-in-out ${showSearchBar ? 'w-full md:w-3/5 lg:w-3/5 opacity-100' : 'w-0 opacity-0'}`}>
          <input
            type="text"
            placeholder="Search questions..."
            className="w-full pl-10 pr-4 py-3 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-gray-800/80 backdrop-blur-sm transition-all duration-300 hover:shadow-md text-cyan-100 placeholder-cyan-300/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={!showSearchBar}
          />
        </div>
      </div>

      {/* Tags Section */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 mb-4 ">
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-4 py-2 rounded-full cursor-pointer text-sm font-medium transition-all duration-300 flex items-center gap-2 capitalize
                                ${selectedTag === tag
                  ? "bg-cyan-500 text-white shadow-lg"
                  : "bg-gray-800 text-cyan-300 hover:bg-gray-700"
                }`}
            >
              {tag}
              {selectedTag === tag && <X size={14} className="opacity-70" />}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16 ">
        <div className="space-y-6">
          {filteredQuestions.map((question, index) => (
            <div
              key={question?.id}
              ref={(el) => (questionRefs.current[question?.id] = el)}
              className="bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700 scroll-mt-32 hover:shadow-cyan-900/20 transition-all duration-300 transform hover:-translate-y-1 "
            >
              <div className="p-6">
                <div className="flex flex-col space-y-4">
                  <div
                    className="flex justify-between cursor-pointer items-start group"
                    onClick={() => handleQuestionClick(question?.id)}
                  >
                    <h3 className="text-lg font-medium text-cyan-300 flex-1 group-hover:text-cyan-400 transition-colors first-letter:capitalize">
                      <span className="font-semibold text-lg text-cyan-500 ">
                        <span> {index + 1}:</span>
                      </span>{" "}
                      {question?.question}
                    </h3>
                    <button className="ml-4 p-2 hover:bg-cyan-900/30 rounded-full transition-colors">
                      {expandedQuestion === question?.id ? (
                        <ChevronUp className="text-cyan-400" />
                      ) : (
                        <ChevronDown className="text-cyan-400" />
                      )}
                    </button>
                  </div>

                  {/* Tags Display */}
                  {/* <div className="flex flex-wrap gap-2">
                    {question?.tags?.map((tag, index) => (
                      <span
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTagClick(tag);
                        }}
                        className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-colors ${
                          selectedTag === tag
                            ? "bg-cyan-500 text-white"
                            : "bg-gray-700/50 text-cyan-300 hover:bg-gray-700"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div> */}

                  {question?.actionWords?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {question.actionWords.map((word, index) =>
                        word?.trim() !== "" ? (
                          <span
                            key={index}
                            className="bg-gradient-to-r from-cyan-900/50 to-indigo-900/50 text-cyan-300 px-4 py-1 rounded-full text-sm font-medium shadow-lg border border-cyan-800/30 line-clamp-2 first-letter:uppercase"
                          >
                            {word.trim()}
                          </span>
                        ) : null
                      )}
                    </div>
                  )}
                </div>

                {expandedQuestion === question?.id && (
                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <div className="mb-6">
                      <h4 className="text-lg font-medium text-cyan-300 mb-4 underline">
                        Answer
                      </h4>
                      <div className="leading-relaxed">
                        <FormattedText
                          text={question?.answer}
                          contentType={question?.contentType}
                        />
                      </div>
                    </div>

                    {question?.codeExample && (
                      <div>
                        <h4 className="text-lg font-medium text-cyan-300 mb-3">
                          Code Example
                        </h4>
                        <CodeBlock language="javascript" code={question.codeExample} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-14 lg:right-8 md:right-8 p-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-1 z-50 group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="text-white w-6 h-6 group-hover:animate-bounce" />
        </button>
      )}
    </div>
  );
};

export default InterviewPrepApp;
