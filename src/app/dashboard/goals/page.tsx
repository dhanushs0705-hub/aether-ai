'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, ChevronRight, Zap, Flag, Clock } from 'lucide-react';

export default function GoalsPage() {
  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <motion.div variants={containerVars} initial="hidden" animate="show" className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <motion.div variants={itemVars} className="flex items-center gap-2 text-neon-cyan mb-2">
            <Target size={16} />
            <span className="text-xs font-mono tracking-widest uppercase">Trajectory Management</span>
          </motion.div>
          <motion.h1 variants={itemVars} className="text-3xl font-bold text-white">
            Prime Directives
          </motion.h1>
        </div>
      </div>

      {/* Main Goal Roadmap */}
      <motion.div variants={itemVars} className="relative mt-12">
        {/* Connection Line */}
        <div className="absolute left-[23px] top-10 bottom-10 w-0.5 bg-gradient-to-b from-neon-cyan via-neon-purple to-white/10" />

        <div className="space-y-12">
          {/* Active Goal */}
          <div className="relative pl-16">
            <div className="absolute left-0 top-6 w-12 h-12 rounded-full bg-neon-cyan/20 border-2 border-neon-cyan flex items-center justify-center shadow-[0_0_20px_rgba(0,245,255,0.4)] z-10">
              <Zap size={20} className="text-neon-cyan animate-pulse" />
            </div>
            
            <div className="glass p-6 rounded-2xl border border-neon-cyan/30 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 blur-3xl -z-10 rounded-full" />
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Launch AETHER AI MVP</h2>
                  <p className="text-sm text-slate-400 flex items-center gap-2">
                    <Clock size={14} /> T-Minus 14 Days
                  </p>
                </div>
                <span className="text-xs font-mono text-background bg-neon-cyan px-2 py-1 rounded font-bold">
                  ACTIVE
                </span>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">Phase Completion</span>
                  <span className="text-neon-cyan">68%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div className="bg-neon-cyan h-full rounded-full shadow-[0_0_10px_rgba(0,245,255,0.5)]" style={{ width: '68%' }} />
                </div>
              </div>

              <div className="space-y-2">
                {['Design Neural Interface', 'Integrate Gemini Core', 'Deploy Holographic DB'].map((milestone, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-neon-cyan shadow-[0_0_5px_rgba(0,245,255,1)]' : 'bg-slate-600'}`} />
                    <span className={i === 0 ? 'text-white' : 'text-slate-400'}>{milestone}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Goal */}
          <div className="relative pl-16 opacity-70 hover:opacity-100 transition-opacity">
            <div className="absolute left-2 top-6 w-8 h-8 rounded-full bg-background border-2 border-neon-purple flex items-center justify-center z-10">
              <Flag size={14} className="text-neon-purple" />
            </div>
            
            <div className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Achieve Peak Physical State</h2>
                  <p className="text-sm text-slate-400 flex items-center gap-2">
                    <Clock size={14} /> Commences in 15 Days
                  </p>
                </div>
                <span className="text-xs font-mono text-neon-purple bg-neon-purple/10 border border-neon-purple/30 px-2 py-1 rounded">
                  QUEUED
                </span>
              </div>

              <div className="space-y-2">
                {['Establish Nutrition Baseline', 'Begin Hypertrophy Protocol', 'Track Sleep Architecture'].map((milestone, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <div className="w-1 h-1 rounded-full bg-slate-600" />
                    <span className="text-slate-400">{milestone}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Future Goal */}
          <div className="relative pl-16 opacity-50">
            <div className="absolute left-2.5 top-6 w-6 h-6 rounded-full bg-background border-2 border-slate-600 z-10" />
            
            <div className="glass p-6 rounded-2xl border border-white/5 border-dashed">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-slate-300">Master Advanced Machine Learning</h2>
                <button className="text-slate-500 hover:text-white flex items-center gap-1 text-sm transition-colors">
                  Details <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
