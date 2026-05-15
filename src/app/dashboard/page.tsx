'use client';

import { motion } from 'framer-motion';
import { Target, Activity, CheckCircle2, Zap, Brain, Flame, ArrowUpRight } from 'lucide-react';

export default function DashboardPage() {
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as any, stiffness: 100 } }
  };

  return (
    <motion.div variants={containerVars} initial="hidden" animate="show" className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <motion.div variants={itemVars} className="flex items-center gap-2 text-neon-cyan mb-2">
            <Brain size={16} className="animate-pulse" />
            <span className="text-xs font-mono tracking-widest uppercase">System Nominal • 08:42 AM</span>
          </motion.div>
          <motion.h1 variants={itemVars} className="text-4xl font-bold text-white">
            Good morning, Commander.
          </motion.h1>
          <motion.p variants={itemVars} className="text-slate-400 mt-2">
            Your focus consistency increased by 12% this week. Optimal time for deep work.
          </motion.p>
        </div>
        
        <motion.div variants={itemVars} className="glass px-4 py-2 rounded-lg flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-slate-400">Current Streak</p>
            <p className="text-lg font-bold text-neon-purple flex items-center gap-1 justify-end">
              <Flame size={16} /> 14 Days
            </p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-left">
            <p className="text-xs text-slate-400">Daily Score</p>
            <p className="text-lg font-bold text-neon-cyan flex items-center gap-1">
              <Zap size={16} /> 85/100
            </p>
          </div>
        </motion.div>
      </div>

      {/* Grid Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Active Quest (Goal) */}
        <motion.div variants={itemVars} className="glass p-6 rounded-2xl border border-neon-cyan/20 relative overflow-hidden md:col-span-2">
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 blur-3xl -z-10 rounded-full" />
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-neon-cyan/10 rounded-lg text-neon-cyan">
                <Target size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Active Prime Directive</h2>
                <p className="text-sm text-slate-400">Launch AETHER AI MVP</p>
              </div>
            </div>
            <span className="text-xs font-mono text-neon-cyan bg-neon-cyan/10 px-2 py-1 rounded">IN PROGRESS</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-300">Completion</span>
                <span className="text-neon-cyan">68%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2">
                <div className="bg-neon-cyan h-full rounded-full" style={{ width: '68%' }} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {['Design Neural Interface', 'Integrate Gemini Core', 'Deploy Holographic DB'].map((task, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5 hover:border-neon-cyan/30 transition-colors cursor-pointer group">
                  <div className={`w-5 h-5 rounded-full border ${i === 0 ? 'bg-neon-cyan border-neon-cyan' : 'border-slate-500 group-hover:border-neon-cyan'} flex items-center justify-center`}>
                    {i === 0 && <CheckCircle2 size={14} className="text-background" />}
                  </div>
                  <span className={`text-sm ${i === 0 ? 'text-slate-400 line-through' : 'text-white'}`}>{task}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Vital Stats (Analytics) */}
        <motion.div variants={itemVars} className="glass p-6 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-neon-purple/10 rounded-lg text-neon-purple">
              <Activity size={24} />
            </div>
            <h2 className="text-xl font-bold text-white">Vital Stats</h2>
          </div>
          
          <div className="space-y-6">
            {[
              { label: 'Deep Work', value: '4h 20m', trend: '+12%', color: 'text-neon-cyan' },
              { label: 'Learning', value: '1h 45m', trend: '+5%', color: 'text-neon-purple' },
              { label: 'Fitness', value: '0h 0m', trend: '-10%', color: 'text-red-400' }
            ].map((stat, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">{stat.label}</span>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-white">{stat.value}</span>
                  <span className={`text-xs flex items-center ${stat.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    <ArrowUpRight size={12} className={stat.trend.startsWith('-') ? 'rotate-90' : ''} /> {stat.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 py-2 border border-white/10 rounded-lg text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors">
            View Full Analytics
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
