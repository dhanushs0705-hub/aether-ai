'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Flame, Plus, Check, TrendingUp, Award } from 'lucide-react';

interface Habit {
  id: string;
  name: string;
  streak: number;
  category: string;
  completedToday: boolean;
  color: string;
}

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([
    { id: '1', name: 'Deep Work (90m)', streak: 14, category: 'Productivity', completedToday: true, color: 'text-neon-cyan' },
    { id: '2', name: 'Morning Protocol', streak: 5, category: 'Wellness', completedToday: true, color: 'text-neon-purple' },
    { id: '3', name: 'Neural Training (Read)', streak: 2, category: 'Learning', completedToday: false, color: 'text-blue-400' },
    { id: '4', name: 'Physical Conditioning', streak: 0, category: 'Health', completedToday: false, color: 'text-red-400' },
  ]);

  const toggleHabit = (id: string) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        return {
          ...habit,
          completedToday: !habit.completedToday,
          streak: habit.completedToday ? Math.max(0, habit.streak - 1) : habit.streak + 1
        };
      }
      return habit;
    }));
  };

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
          <motion.div variants={itemVars} className="flex items-center gap-2 text-neon-purple mb-2">
            <Activity size={16} />
            <span className="text-xs font-mono tracking-widest uppercase">Behavioral Tracking</span>
          </motion.div>
          <motion.h1 variants={itemVars} className="text-3xl font-bold text-white">
            Daily Protocols
          </motion.h1>
        </div>
        
        <motion.button variants={itemVars} className="glass border border-neon-cyan/30 text-neon-cyan px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-neon-cyan/10 transition-colors">
          <Plus size={16} />
          <span className="text-sm font-bold">New Protocol</span>
        </motion.button>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div variants={itemVars} className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 text-neon-cyan/10 group-hover:text-neon-cyan/20 transition-colors">
            <Flame size={120} />
          </div>
          <p className="text-slate-400 text-sm mb-1">Longest Active Streak</p>
          <h3 className="text-3xl font-black text-white flex items-baseline gap-2">
            14 <span className="text-sm font-normal text-neon-cyan">Days</span>
          </h3>
        </motion.div>
        
        <motion.div variants={itemVars} className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 text-neon-purple/10 group-hover:text-neon-purple/20 transition-colors">
            <TrendingUp size={120} />
          </div>
          <p className="text-slate-400 text-sm mb-1">Completion Rate</p>
          <h3 className="text-3xl font-black text-white flex items-baseline gap-2">
            85<span className="text-xl font-bold">%</span>
          </h3>
        </motion.div>
        
        <motion.div variants={itemVars} className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 text-yellow-500/10 group-hover:text-yellow-500/20 transition-colors">
            <Award size={120} />
          </div>
          <p className="text-slate-400 text-sm mb-1">XP Earned Today</p>
          <h3 className="text-3xl font-black text-white flex items-baseline gap-2">
            +250 <span className="text-sm font-normal text-yellow-500">XP</span>
          </h3>
        </motion.div>
      </div>

      {/* Habit List */}
      <motion.div variants={itemVars} className="space-y-4 mt-8">
        {habits.map((habit) => (
          <div key={habit.id} className="glass p-4 rounded-xl border border-white/5 flex items-center justify-between group hover:border-white/20 transition-colors">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => toggleHabit(habit.id)}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                  habit.completedToday 
                    ? `bg-neon-cyan/20 border-neon-cyan text-neon-cyan shadow-[0_0_15px_rgba(0,245,255,0.3)]` 
                    : 'border-slate-600 text-transparent hover:border-neon-cyan/50'
                }`}
              >
                <Check size={16} />
              </button>
              <div>
                <h4 className={`font-bold transition-colors ${habit.completedToday ? 'text-white' : 'text-slate-300'}`}>
                  {habit.name}
                </h4>
                <p className="text-xs text-slate-500">{habit.category}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <div className="flex gap-1 mb-1 justify-end">
                  {[...Array(7)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2 h-4 rounded-sm ${
                        i < 5 ? (habit.completedToday ? 'bg-neon-cyan' : 'bg-neon-cyan/40') : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">This Week</p>
              </div>
              
              <div className="w-px h-8 bg-white/10 hidden sm:block" />
              
              <div className={`flex flex-col items-end min-w-[60px] ${habit.streak > 0 ? habit.color : 'text-slate-500'}`}>
                <div className="flex items-center gap-1 font-bold">
                  <Flame size={16} className={habit.streak > 0 ? 'animate-pulse' : ''} />
                  <span>{habit.streak}</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider opacity-70">Streak</span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
