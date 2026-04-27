'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Zap, Braces, GitBranch } from 'lucide-react';
import styles from './styles.module.css';
import ReactStateViz from './ReactStateViz';
import NodeEventLoopViz from './NodeEventLoopViz';
import ClosureViz from './ClosureViz';
import WorkerViz from './WorkerViz';

const TABS = [
  { id: 'react', label: 'React State', icon: Zap },
  { id: 'eventloop', label: 'Event Loop', icon: Cpu },
  { id: 'closure', label: 'Closure', icon: Braces },
  { id: 'worker', label: 'Workers', icon: GitBranch },
];

export default function MernVisualizerApp() {
  const [active, setActive] = useState('react');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>MERN MENTAL MODEL VISUALIZER</h1>
        <nav className={styles.tabs}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`${styles.tab} ${active === tab.id ? styles.tabActive : ''}`}
            >
              {React.createElement(tab.icon, { className: 'w-3.5 h-3.5 inline-block mr-1.5 -mt-0.5' })}
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      <main className={styles.canvas}>
        <div className={styles.vizContainer}>
          <AnimatePresence mode="wait">
            {active === 'react' && (
              <motion.div
                key="react"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
              >
                <ReactStateViz />
              </motion.div>
            )}
            {active === 'eventloop' && (
              <motion.div
                key="eventloop"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
              >
                <NodeEventLoopViz />
              </motion.div>
            )}
            {active === 'closure' && (
              <motion.div
                key="closure"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
              >
                <ClosureViz />
              </motion.div>
            )}
            {active === 'worker' && (
              <motion.div
                key="worker"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
              >
                <WorkerViz />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
