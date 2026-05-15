'use client';

import { motion } from 'framer-motion';
import { Award, Zap, Shield, Crown, Target, ChevronRight } from 'lucide-react';

export default function XPPage() {
  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  const ranks = [
    { name: 'Initiate', xp: 0, icon: Shield, color: 'text-slate-400', achieved: true },
    { name: 'Strategist', xp: 2000, icon: Zap, color: 'text-blue-400', achieved: true },
    { name: 'Optimizer', xp: 5000, icon: Target, color: 'text-neon-purple', achieved: true },
    { name: 'Neural Commander', xp: 10000, icon: Award, color: 'text-neon-cyan', achieved: false, current: true },
    { name: 'Aether Elite', xp: 25000, icon: Crown, color: 'text-yellow-500', achieved: false },
  ];

  // Need Target icon mapping, let's just use an SVG or import Target from lucide. Wait, Target wasn't imported. I will just replace Target with Award and Award with Crown in ranks array or import it. Let me just use inline SVG or replace Target with Activity to avoid import error.
  // Actually, I will just import Target in the actual file. Oh wait, I forgot to import Target. Let me just use Zap instead.

  return (
    <motion.div variants={containerVars} initial="hidden" animate="show" className="space-y-8 pb-10">
      
      {/* Current Rank Card */}
      <motion.div variants={itemVars} className="relative w-full rounded-[2rem] p-[1px] overflow-hidden bg-gradient-to-br from-neon-cyan via-neon-purple to-transparent">
        <div className="absolute inset-0 bg-background/90 backdrop-blur-3xl z-0" />
        
        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-neon-cyan/30 flex items-center justify-center bg-background shadow-[0_0_50px_rgba(0,245,255,0.2)]">
                <Award size={64} className="text-neon-cyan drop-shadow-[0_0_15px_rgba(0,245,255,1)]" />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-neon-cyan text-background font-black px-4 py-1 rounded-full border-2 border-background text-sm">
                LVL 12
              </div>
            </div>
            
            <div>
              <p className="text-neon-cyan font-mono tracking-widest text-sm mb-2">CURRENT RANK</p>
              <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-md">Optimizer</h1>
              <p className="text-slate-400 mt-2 text-lg">You are in the top 15% of AETHER operatives.</p>
            </div>
          </div>
          
          <div className="w-full md:w-auto text-center md:text-right">
            <p className="text-3xl font-bold text-white mb-1">
              8,750 <span className="text-lg text-slate-400 font-normal">/ 10,000 XP</span>
            </p>
            <p className="text-neon-purple text-sm mb-4">1,250 XP to Neural Commander</p>
            <button className="w-full md:w-auto bg-white/5 border border-white/10 hover:border-neon-cyan/50 text-white px-6 py-3 rounded-xl transition-all">
              View Leaderboard
            </button>
          </div>
        </div>

        {/* Progress Bar inside Card */}
        <div className="relative z-10 w-full h-2 bg-background/50">
          <div className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple relative" style={{ width: '87.5%' }}>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)]" />
          </div>
        </div>
      </motion.div>

      {/* Rank Progression */}
      <motion.div variants={itemVars} className="glass p-8 rounded-3xl border border-white/5">
        <h2 className="text-2xl font-bold text-white mb-8">Evolution Path</h2>
        
        <div className="space-y-6 relative">
          <div className="absolute left-6 top-8 bottom-8 w-1 bg-white/5 rounded-full" />
          
          {ranks.map((rank, idx) => (
            <div key={idx} className={`relative flex items-center gap-6 p-4 rounded-2xl transition-all ${rank.current ? 'bg-white/5 border border-white/10' : ''}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 ${
                rank.achieved ? 'bg-background border-2 border-white/20' : rank.current ? `bg-background border-2 border-neon-cyan shadow-[0_0_20px_rgba(0,245,255,0.4)]` : 'bg-background border-2 border-white/5 opacity-50'
              }`}>
                <rank.icon size={20} className={rank.achieved || rank.current ? rank.color : 'text-slate-600'} />
              </div>
              
              <div className="flex-1">
                <h3 className={`font-bold text-lg ${rank.achieved || rank.current ? 'text-white' : 'text-slate-500'}`}>
                  {rank.name}
                </h3>
                <p className="text-sm text-slate-500">{rank.xp.toLocaleString()} XP required</p>
              </div>
              
              {rank.current && (
                <div className="hidden sm:block">
                  <div className="text-xs font-bold text-neon-cyan bg-neon-cyan/10 px-3 py-1 rounded-full uppercase tracking-wider">
                    In Progress
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
