import React from "react";

const Header = () => {
  return (
    <header>
      <div className="relative bg-slate-950 border-b-2 border-cyan-500/50 py-16 overflow-hidden">
        {/* Abstract Cyberpunk Grid/Glow Background Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-cyan-900/10 via-purple-900/10 to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Main Title with Glitch/Neon Effect */}
          <h1 className="text-3xl sm:text-5xl font-black mb-6 font-mono tracking-tighter text-blue-600 bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] animate-pulse">
            INTERVIEW_PREPARATION <span className="text-fuchsia-500">_GUIDE</span>
          </h1>

          {/* Subtitle with Tech/Terminal styling */}
          <p className="text-base sm:text-lg font-mono text-cyan-300/80 tracking-wide border-l-4 border-fuchsia-500 pl-4 max-w-2xl bg-black/30 backdrop-blur-sm p-2 rounded-r-lg">
            <span className="text-fuchsia-500 mr-2">&gt;</span>
            Master your technical interviews with comprehensive answers and examples<span className="animate-ping inline-block w-2 h-2 ml-1 bg-cyan-400 rounded-full">_</span>
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
