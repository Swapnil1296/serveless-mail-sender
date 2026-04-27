'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ClosureViz() {
  const [counter, setCounter] = useState(0);
  const [highlight, setHighlight] = useState(null); // 'outer' | 'inner' | 'closure'

  return (
    <div className="w-full">
      <div className="flex justify-center gap-4 mb-8">
        <motion.button
          onMouseEnter={() => setHighlight('outer')}
          onMouseLeave={() => setHighlight(null)}
          className="px-4 py-2 bg-slate-700/50 border border-slate-500 text-slate-300 font-mono text-xs rounded"
        >
          Hover: outer scope
        </motion.button>
        <motion.button
          onMouseEnter={() => setHighlight('inner')}
          onMouseLeave={() => setHighlight(null)}
          className="px-4 py-2 bg-slate-700/50 border border-slate-500 text-slate-300 font-mono text-xs rounded"
        >
          Hover: inner function
        </motion.button>
        <motion.button
          onMouseEnter={() => setHighlight('closure')}
          onMouseLeave={() => setHighlight(null)}
          className="px-4 py-2 bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-mono text-xs rounded"
        >
          Hover: closure (captured)
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Scope visualization */}
        <motion.div
          className="relative p-6 rounded-lg border-2 border-cyan-500/30 bg-slate-900/80 overflow-hidden"
          onMouseLeave={() => setHighlight(null)}
        >
          <div className="text-[10px] font-black text-cyan-400 tracking-widest mb-4 uppercase">
            Lexical Scope & Closure
          </div>

          {/* Outer scope */}
          <motion.div
            className="absolute inset-6 rounded border-2 border-dashed pointer-events-none"
            style={{ borderColor: highlight === 'outer' ? '#06b6d4' : 'rgba(6,182,212,0.2)' }}
            animate={{
              opacity: highlight === 'outer' ? 1 : 0.5,
              boxShadow: highlight === 'outer' ? 'inset 0 0 30px rgba(6,182,212,0.2)' : 'none',
            }}
            transition={{ duration: 0.2 }}
          />
          <div className="relative z-10">
            <div className="font-mono text-xs text-slate-400 mb-2">
              <span className="text-cyan-400">function</span> createCounter() {'{'}
            </div>
            <motion.div
              className="ml-4 p-3 border-l-2 border-cyan-500/50 bg-cyan-500/5 rounded-r"
              animate={{
                borderColor: highlight === 'outer' ? '#06b6d4' : 'rgba(6,182,212,0.3)',
                backgroundColor: highlight === 'outer' ? 'rgba(6,182,212,0.15)' : 'rgba(6,182,212,0.05)',
              }}
            >
              <div className="text-amber-400 font-mono text-xs">
                let count = <motion.span
                  key={counter}
                  animate={{ scale: [1, 1.3, 1], color: ['#fbbf24', '#67e8f9', '#fbbf24'] }}
                  transition={{ duration: 0.4 }}
                >
                  {counter}
                </motion.span>
              </div>
              <div className="text-[10px] text-slate-500 mt-1">↑ outer scope (captured by closure)</div>
            </motion.div>

            <div className="font-mono text-xs text-slate-400 mt-4 mb-2">
              <span className="text-purple-400">return function</span> increment() {'{'}
            </div>
            <motion.div
              className="ml-6 p-3 border-l-2 border-purple-500/50 bg-purple-500/5 rounded-r"
              animate={{
                borderColor: highlight === 'inner' ? '#a78bfa' : 'rgba(139,92,246,0.3)',
                backgroundColor: highlight === 'inner' ? 'rgba(139,92,246,0.15)' : 'rgba(139,92,246,0.05)',
              }}
            >
              <div className="text-purple-300 font-mono text-xs">
                count++; <span className="text-slate-500">// closes over outer 'count'</span>
              </div>
              <motion.div
                className="mt-2 flex items-center gap-2"
                animate={{
                  opacity: highlight === 'closure' ? 1 : 0.7,
                  x: highlight === 'closure' ? 4 : 0,
                }}
              >
                <span className="w-1 h-8 bg-cyan-400/60" />
                <span className="text-[10px] text-cyan-400">Closure holds reference to 'count'</span>
              </motion.div>
            </motion.div>
            <div className="font-mono text-xs text-slate-400">{'}'} {'}'}</div>
          </div>
        </motion.div>

        {/* Live demo */}
        <motion.div
          className="p-6 rounded-lg border-2 border-cyan-500/30 bg-slate-900/80"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-[10px] font-black text-cyan-400 tracking-widest mb-4 uppercase">
            Live Closure Demo
          </div>
          <div className="p-4 bg-slate-800/60 rounded border border-cyan-500/20 font-mono text-xs text-slate-300 space-y-2">
            <div>const counter = createCounter();</div>
            <div>counter(); <span className="text-slate-500">// count: 0 → 1</span></div>
            <div>counter(); <span className="text-slate-500">// count: 1 → 2</span></div>
          </div>
          <motion.button
            onClick={() => setCounter((c) => c + 1)}
            className="mt-4 w-full py-3 bg-cyan-500/20 border-2 border-cyan-400 text-cyan-300 font-mono text-sm font-bold rounded hover:bg-cyan-500/30 transition-all"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            counter() → count = {counter}
          </motion.button>
          <p className="text-slate-500 text-[10px] mt-4">
            Each click invokes the inner function. It &quot;remembers&quot; count from the outer scope—that&apos;s the closure.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
