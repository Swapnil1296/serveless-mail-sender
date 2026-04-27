'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReactStateViz() {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState('idle'); // idle | batching | rendering | done
  const [stack, setStack] = useState([]);

  const triggerUpdate = () => {
    setPhase('batching');
    setStack(['setCount(prev => prev + 1)']);
    // Simulate React's batching
    setTimeout(() => {
      setPhase('rendering');
      setStack(['Reconciliation', 'Virtual DOM diff', 'Commit']);
      setCount((c) => c + 1);
    }, 600);
    setTimeout(() => {
      setPhase('done');
      setStack([]);
    }, 1800);
  };

  const reset = () => {
    setCount(0);
    setPhase('idle');
    setStack([]);
  };

  return (
    <div className="w-full">
      <div className="flex justify-center gap-4 mb-8">
        <motion.button
          onClick={triggerUpdate}
          disabled={phase !== 'idle' && phase !== 'done'}
          className="px-6 py-3 bg-cyan-500/20 border-2 border-cyan-400 text-cyan-300 font-mono text-sm font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-500/30 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Increment (setState)
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Component tree */}
        <motion.div
          className="p-6 rounded-lg border-2 border-cyan-500/30 bg-slate-900/80"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-[10px] font-black text-cyan-400 tracking-widest mb-4 uppercase">
            Component Tree
          </div>
          <div className="space-y-3 font-mono text-xs">
            <motion.div
              className="p-3 border border-cyan-500/40 bg-slate-800/60"
              animate={{
                boxShadow:
                  phase === 'rendering' || phase === 'done'
                    ? '0 0 20px rgba(6,182,212,0.4)'
                    : '0 0 0 rgba(6,182,212,0)',
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-cyan-400">App</span>
              <div className="mt-2 ml-4 border-l-2 border-cyan-500/30 pl-3">
                <motion.div
                  className="p-2 border border-purple-500/40 bg-purple-500/10"
                  animate={{
                    boxShadow:
                      phase === 'rendering' || phase === 'done'
                        ? '0 0 16px rgba(139,92,246,0.4)'
                        : '0 0 0 rgba(139,92,246,0)',
                  }}
                >
                  <span className="text-purple-300">Counter</span>
                  <motion.div
                    key={count}
                    initial={{ scale: 1.2, color: '#67e8f9' }}
                    animate={{ scale: 1, color: '#94a3b8' }}
                    className="mt-1 text-lg font-bold"
                  >
                    count = {count}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Flow */}
        <motion.div
          className="p-6 rounded-lg border-2 border-cyan-500/30 bg-slate-900/80"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-[10px] font-black text-cyan-400 tracking-widest mb-4 uppercase">
            React State Update Flow
          </div>
          <div className="space-y-2">
            {[
              { id: 1, label: '1. Event / setState', active: phase === 'batching', done: phase !== 'idle' },
              { id: 2, label: '2. Batching (React 18)', active: phase === 'batching', done: phase === 'rendering' || phase === 'done' },
              { id: 3, label: '3. Reconciliation', active: phase === 'rendering', done: phase === 'done' },
              { id: 4, label: '4. Virtual DOM diff', active: phase === 'rendering', done: phase === 'done' },
              { id: 5, label: '5. Commit to DOM', active: phase === 'rendering', done: phase === 'done' },
            ].map((step) => (
              <motion.div
                key={step.id}
                className={`flex items-center gap-3 p-2 rounded border font-mono text-xs ${
                  step.active
                    ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200'
                    : step.done
                    ? 'border-green-500/40 bg-green-500/10 text-green-300'
                    : 'border-slate-600 text-slate-500'
                }`}
                initial={false}
                animate={{
                  scale: step.active ? 1.02 : 1,
                  x: step.active ? 4 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <span className="w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold">
                  {step.done ? '✓' : step.id}
                </span>
                {step.label}
              </motion.div>
            ))}
          </div>
          <AnimatePresence>
            {stack.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-3 border border-amber-500/40 bg-amber-500/10 rounded"
              >
                <div className="text-[10px] font-bold text-amber-400 mb-2">Current Stack</div>
                {stack.map((s, i) => (
                  <motion.div
                    key={`${s}-${i}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="font-mono text-xs text-amber-200"
                  >
                    → {s}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <motion.p
        className="text-center text-slate-500 text-xs mt-6 max-w-lg mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        React 18+ batches all setState calls. Click Increment to see the flow: batching → reconciliation → DOM commit.
      </motion.p>
    </div>
  );
}
