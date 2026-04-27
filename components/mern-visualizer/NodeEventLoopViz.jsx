'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PHASES = ['call-stack', 'microtask', 'render', 'macrotask'];

export default function NodeEventLoopViz() {
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState(null);
  const [callStack, setCallStack] = useState(['(global)']);
  const [microtaskQueue, setMicrotaskQueue] = useState([]);
  const [macrotaskQueue, setMacrotaskQueue] = useState([]);

  const runDemo = () => {
    setRunning(true);
    setPhase('call-stack');
    setCallStack(['(global)', 'console.log("A")']);
    setMicrotaskQueue(['Promise.then']);
    setMacrotaskQueue(['setTimeout']);

    const steps = [
      { delay: 400, fn: () => setCallStack(['(global)', 'console.log("A")', 'Promise.then']) },
      { delay: 800, fn: () => setPhase('microtask') },
      { delay: 1000, fn: () => setCallStack(['(global)', 'console.log("B")']) },
      { delay: 1200, fn: () => setMicrotaskQueue([]) },
      { delay: 1400, fn: () => setPhase('render') },
      { delay: 1700, fn: () => setPhase('macrotask') },
      { delay: 1900, fn: () => setCallStack(['(global)', 'setTimeout callback']) },
      { delay: 2200, fn: () => setCallStack(['(global)', 'console.log("C")']) },
      { delay: 2500, fn: () => setMacrotaskQueue([]) },
      { delay: 2700, fn: () => setCallStack(['(global)']) },
      { delay: 3000, fn: () => { setPhase(null); setRunning(false); } },
    ];

    steps.forEach(({ delay, fn }) => setTimeout(fn, delay));
  };

  const reset = () => {
    setRunning(false);
    setPhase(null);
    setCallStack(['(global)']);
    setMicrotaskQueue([]);
    setMacrotaskQueue([]);
  };

  return (
    <div className="w-full">
      <div className="flex justify-center gap-4 mb-8">
        <motion.button
          onClick={runDemo}
          disabled={running}
          className="px-6 py-3 bg-cyan-500/20 border-2 border-cyan-400 text-cyan-300 font-mono text-sm font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-500/30 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {running ? 'Running...' : 'Run Event Loop Demo'}
        </motion.button>
        <motion.button
          onClick={reset}
          disabled={running}
          className="px-6 py-3 bg-slate-700/50 border-2 border-slate-500 text-slate-300 font-mono text-sm font-bold uppercase tracking-wider hover:bg-slate-600/50 disabled:opacity-50 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Reset
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {/* Call Stack */}
        <motion.div
          className={`p-5 rounded-lg border-2 transition-all ${
            phase === 'call-stack'
              ? 'border-cyan-400 bg-cyan-500/15 shadow-[0_0_24px_rgba(6,182,212,0.3)]'
              : 'border-cyan-500/30 bg-slate-900/80'
          }`}
          animate={{ scale: phase === 'call-stack' ? 1.02 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-[10px] font-black text-cyan-400 tracking-widest mb-3 uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" /> Call Stack
          </div>
          <div className="space-y-1 min-h-[120px]">
            <AnimatePresence mode="popLayout">
              {callStack.map((item, i) => (
                <motion.div
                  key={`${item}-${i}`}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-2 border border-cyan-500/40 bg-slate-800/80 font-mono text-xs text-cyan-200"
                >
                  {item}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Microtask Queue */}
        <motion.div
          className={`p-5 rounded-lg border-2 transition-all ${
            phase === 'microtask'
              ? 'border-amber-400 bg-amber-500/15 shadow-[0_0_24px_rgba(245,158,11,0.3)]'
              : 'border-amber-500/30 bg-slate-900/80'
          }`}
          animate={{ scale: phase === 'microtask' ? 1.02 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-[10px] font-black text-amber-400 tracking-widest mb-3 uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" /> Microtask Queue
          </div>
          <div className="space-y-1 min-h-[120px]">
            <AnimatePresence mode="popLayout">
              {microtaskQueue.map((item, i) => (
                <motion.div
                  key={`${item}-${i}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-2 border border-amber-500/40 bg-slate-800/80 font-mono text-xs text-amber-200"
                >
                  {item}
                </motion.div>
              ))}
            </AnimatePresence>
            {microtaskQueue.length === 0 && (
              <div className="text-slate-600 text-xs font-mono italic">(empty)</div>
            )}
          </div>
          <p className="text-[10px] text-amber-500/80 mt-2">Promise.then, queueMicrotask</p>
        </motion.div>

        {/* Macrotask Queue */}
        <motion.div
          className={`p-5 rounded-lg border-2 transition-all ${
            phase === 'macrotask'
              ? 'border-emerald-400 bg-emerald-500/15 shadow-[0_0_24px_rgba(52,211,153,0.3)]'
              : 'border-emerald-500/30 bg-slate-900/80'
          }`}
          animate={{ scale: phase === 'macrotask' ? 1.02 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-[10px] font-black text-emerald-400 tracking-widest mb-3 uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> Macrotask Queue
          </div>
          <div className="space-y-1 min-h-[120px]">
            <AnimatePresence mode="popLayout">
              {macrotaskQueue.map((item, i) => (
                <motion.div
                  key={`${item}-${i}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-2 border border-emerald-500/40 bg-slate-800/80 font-mono text-xs text-emerald-200"
                >
                  {item}
                </motion.div>
              ))}
            </AnimatePresence>
            {macrotaskQueue.length === 0 && (
              <div className="text-slate-600 text-xs font-mono italic">(empty)</div>
            )}
          </div>
          <p className="text-[10px] text-emerald-500/80 mt-2">setTimeout, setInterval, I/O</p>
        </motion.div>
      </div>

      {/* Loop diagram */}
      <motion.div
        className="mt-8 flex flex-wrap justify-center gap-4 items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {['Call Stack', 'Microtasks', 'Render', 'Macrotask'].map((label, i) => (
          <React.Fragment key={label}>
            <div
              className={`px-4 py-2 rounded border font-mono text-xs font-bold ${
                phase === ['call-stack', 'microtask', 'render', 'macrotask'][i]
                  ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300'
                  : 'border-slate-600 text-slate-500'
              }`}
            >
              {label}
            </div>
            {i < 3 && (
              <motion.div
                animate={{ opacity: phase ? 1 : 0.5 }}
                className="text-cyan-500/60 text-lg"
              >
                →
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </motion.div>

      <p className="text-center text-slate-500 text-xs mt-6 max-w-2xl mx-auto">
        Order: 1) Empty call stack 2) Run all microtasks 3) Render (browser) 4) One macrotask → repeat
      </p>
    </div>
  );
}
