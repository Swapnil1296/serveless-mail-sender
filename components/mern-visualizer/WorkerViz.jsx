'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function WorkerViz() {
  const [phase, setPhase] = useState('idle'); // idle | main | worker | message
  const [messages, setMessages] = useState([]);

  const runDemo = () => {
    setMessages([]);
    setPhase('main');
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'main', text: 'postMessage("heavy task")' }]);
      setPhase('worker');
    }, 800);
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'worker', text: 'Processing...' }]);
    }, 1400);
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'worker', text: 'postMessage(result)' }]);
      setPhase('message');
    }, 2200);
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'main', text: 'onmessage → update UI' }]);
    }, 2600);
    setTimeout(() => setPhase('idle'), 3200);
  };

  const reset = () => {
    setPhase('idle');
    setMessages([]);
  };

  return (
    <div className="w-full">
      <div className="flex justify-center gap-4 mb-8">
        <motion.button
          onClick={runDemo}
          disabled={phase !== 'idle' && phase !== 'done'}
          className="px-6 py-3 bg-cyan-500/20 border-2 border-cyan-400 text-cyan-300 font-mono text-sm font-bold uppercase tracking-wider disabled:opacity-50 hover:bg-cyan-500/30 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Run Worker Flow
        </motion.button>
        <motion.button
          onClick={reset}
          className="px-6 py-3 bg-slate-700/50 border-2 border-slate-500 text-slate-300 font-mono text-sm font-bold uppercase tracking-wider hover:bg-slate-600/50 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Reset
        </motion.button>
      </div>

      <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-6 items-stretch">
        {/* Main Thread */}
        <motion.div
          className={`flex-1 p-6 rounded-lg border-2 transition-all ${
            phase === 'main' || phase === 'message'
              ? 'border-cyan-400 bg-cyan-500/15 shadow-[0_0_24px_rgba(6,182,212,0.3)]'
              : 'border-cyan-500/30 bg-slate-900/80'
          }`}
          animate={{ scale: phase === 'main' || phase === 'message' ? 1.02 : 1 }}
        >
          <div className="text-[10px] font-black text-cyan-400 tracking-widest mb-4 uppercase">
            Main Thread
          </div>
          <div className="space-y-2 text-xs font-mono text-slate-400">
            <div>• UI rendering</div>
            <div>• Event handlers</div>
            <div>• worker.postMessage()</div>
            <div>• worker.onmessage</div>
          </div>
          <motion.div
            className="mt-4 h-px bg-cyan-500/30"
            animate={{ scaleX: phase === 'main' || phase === 'message' ? 1 : 0.5 }}
            style={{ originX: 0 }}
          />
          <div className="mt-2 text-[10px] text-cyan-500/80">
            Single-threaded, blocks on CPU-heavy work
          </div>
        </motion.div>

        {/* Message Channel */}
        <div className="flex flex-col items-center justify-center gap-2 py-4">
          <motion.div
            className="w-8 h-8 rounded-full border-2 border-amber-500 flex items-center justify-center text-amber-400 text-lg"
            animate={{
              scale: phase === 'worker' || phase === 'message' ? [1, 1.2, 1] : 1,
              opacity: phase === 'worker' || phase === 'message' ? 1 : 0.5,
            }}
            transition={{ repeat: phase === 'worker' || phase === 'message' ? Infinity : 0, duration: 0.6 }}
          >
            ⇄
          </motion.div>
          <span className="text-[10px] text-amber-400 font-mono">postMessage</span>
        </div>

        {/* Worker Thread */}
        <motion.div
          className={`flex-1 p-6 rounded-lg border-2 transition-all ${
            phase === 'worker'
              ? 'border-emerald-400 bg-emerald-500/15 shadow-[0_0_24px_rgba(52,211,153,0.3)]'
              : 'border-emerald-500/30 bg-slate-900/80'
          }`}
          animate={{ scale: phase === 'worker' ? 1.02 : 1 }}
        >
          <div className="text-[10px] font-black text-emerald-400 tracking-widest mb-4 uppercase">
            Worker Thread
          </div>
          <div className="space-y-2 text-xs font-mono text-slate-400">
            <div>• No DOM access</div>
            <div>• CPU-heavy computation</div>
            <div>• self.onmessage</div>
            <div>• self.postMessage()</div>
          </div>
          <motion.div
            className="mt-4 h-px bg-emerald-500/30"
            animate={{ scaleX: phase === 'worker' ? 1 : 0.5 }}
            style={{ originX: 0 }}
          />
          <div className="mt-2 text-[10px] text-emerald-500/80">
            Parallel, doesn&apos;t block UI
          </div>
        </motion.div>
      </div>

      {/* Message log */}
      <motion.div
        className="mt-8 max-w-2xl mx-auto p-4 rounded-lg border border-cyan-500/20 bg-slate-900/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-[10px] font-black text-cyan-400 tracking-widest mb-3 uppercase">
          Message Flow
        </div>
        <div className="space-y-2">
          {messages.length === 0 && (
            <div className="text-slate-600 text-xs font-mono italic">Run the demo to see messages...</div>
          )}
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: msg.from === 'main' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex font-mono text-xs ${
                msg.from === 'main' ? 'justify-start' : 'justify-end'
              }`}
            >
              <span
                className={`px-3 py-1.5 rounded ${
                  msg.from === 'main'
                    ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-200'
                    : 'bg-emerald-500/20 border border-emerald-400/50 text-emerald-200'
                }`}
              >
                {msg.from} → {msg.text}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <p className="text-center text-slate-500 text-xs mt-6 max-w-2xl mx-auto">
        Web Workers run in a separate thread. Messages are copied (structured clone)—no shared memory by default.
      </p>
    </div>
  );
}
