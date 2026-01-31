import React, { useState } from 'react';
import InterviewPrepApp from './components/InterviewPrepApp';
import ExcelToJsonConverter from './components/ExcelToJsonConverter';
import AddQuestionForm from "./components/AddQuestionForm";
import { javascriptQuestionData } from './utils/javascriptQuestionData';
import { reactQuesionData } from './utils/reacQuestiondata';
import { Menu, X } from 'lucide-react';
import { htmlAndCSS } from './utils/htmlCss';
import { reduxRtk } from './utils/reduxRtk';
import { nextJs } from './utils/nextJs';
import { postman } from './utils/postman';
import { systemDesign } from './utils/systemDesign';
import { Axios } from './utils/axios';
import { expressJs } from "./utils/ExpressJS";
import { gitHub } from "./utils/gitGithub";
import { mongoDB } from "./utils/mongoDb";
import { nodeJS } from "./utils/nodeJs";
import { postgreSql } from "./utils/postgreSql";
import { reactRouter } from "./utils/reactRouterDom";
import { typescript } from "./utils/typeScript";
import Footer from "./components/Footer"; // Import the footer
import { behavioural } from "./utils/behavioural";
import { awsQbank } from "./utils/awsQbank";
import { resumeSpecific } from './utils/resumeSpecific';
import { dataStructures } from './utils/data-structure';
import MainChart from './components/helpers/TimeComplexityChart';


export const PrepLandingPage = () => {
  const [activeComponent, setActiveComponent] = useState("interview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dataSources = {
    htmlAndCSS,
    reactQuesionData,
    javascriptQuestionData,
    reduxRtk,
    nextJs,
    Axios,
    reactRouter,
    gitHub,
    typescript,
    nodeJS,
    expressJs,
    mongoDB,
    postgreSql,
    postman,
    awsQbank,
    systemDesign,
    behavioural,
    resumeSpecific,
    dataStructures
  };

  const handleNavClick = (component) => {
    setActiveComponent(component);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 font-sans text-gray-200 selection:bg-cyan-500/30 selection:text-cyan-200">

      {/* Background Effects */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none z-0"></div>

      {/* Navigation */}
      <nav className="sticky top-[72px] z-40 bg-slate-900/80 backdrop-blur-md border-b border-cyan-500/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0 flex items-center gap-2">
              <span className="text-2xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                INTERVIEW_PREP
              </span>
              <span className="animate-pulse w-2 h-2 bg-cyan-500 rounded-full mt-1"></span>
            </div>

            <div className="hidden md:flex md:items-center md:space-x-2">
              {[
                { id: "interview", label: "Questions" },
                { id: "timeComplexity", label: "Time Complexity" },
                { id: "addQuestion", label: "Add Question" },
                { id: "excel", label: "Upload" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-bold font-mono transition-all duration-300 relative group overflow-hidden ${activeComponent === item.id
                      ? "text-cyan-950 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                      : "text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(34,211,238,0.2)] bg-slate-800/50"
                    }`}
                >
                  {activeComponent !== item.id && (
                    <span className="absolute inset-0 bg-cyan-400/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  )}
                  <span className="relative uppercase tracking-wider flex items-center gap-2">
                    {item.id === "interview" && <span>&gt;</span>}
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-cyan-400 hover:text-cyan-300 hover:bg-slate-800 focus:outline-none border border-cyan-500/30 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-cyan-500/20 bg-slate-900 absolute left-0 right-0 shadow-xl">
              <div className="px-4 pt-4 pb-6 space-y-2">
                {[
                  { id: "interview", label: "Interview Questions" },
                  { id: "timeComplexity", label: "Time Complexity" },
                  { id: "addQuestion", label: "Add Question" },
                  { id: "excel", label: "Upload Questions" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-base font-bold font-mono uppercase tracking-wide transition-all ${activeComponent === item.id
                        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50"
                        : "text-gray-400 hover:text-cyan-300 hover:bg-slate-800"
                      }`}
                  >
                    <span className="mr-2 text-cyan-600">{activeComponent === item.id ? "●" : "○"}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Content Area */}
      <main className="flex-grow w-full relative z-10">
        <div className="animate-fade-in-up">
          {activeComponent === "interview" && (
            <InterviewPrepApp dataSources={dataSources} />
          )}
          {activeComponent === "addQuestion" && (
            <div className="max-w-4xl mx-auto px-4 py-12">
              <div className="bg-slate-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden p-1">
                <div className="bg-slate-950/50 p-6 sm:p-10 rounded-xl relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500"></div>
                  <AddQuestionForm dataSources={dataSources} />
                </div>
              </div>
            </div>
          )}
          {activeComponent === "timeComplexity" && (
            <div className="bg-slate-900/50 min-h-screen">
              <MainChart />
            </div>
          )}

          {activeComponent === "excel" && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="bg-slate-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] p-4 sm:p-8 md:p-12 relative overflow-hidden">
                {/* Decorative corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-2xl"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-purple-500/50 rounded-br-2xl"></div>

                <h2 className="text-3xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-mono tracking-tight flex items-center gap-3">
                  <span className="text-cyan-600 text-4xl">&gt;</span> UPLOAD_DATASET
                </h2>
                <div className="max-w-4xl mx-auto bg-slate-950/50 rounded-xl p-6 border border-slate-800">
                  <ExcelToJsonConverter dataSources={dataSources} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};


;