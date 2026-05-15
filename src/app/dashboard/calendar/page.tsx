'use client';

import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Video, Users } from 'lucide-react';

export default function CalendarPage() {
  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as any, stiffness: 100 } }
  };

  const events = [
    { title: 'Neural Interface Standup', time: '09:00 AM', duration: '30m', type: 'meeting', attendees: 4 },
    { title: 'Deep Work Block: Architecture', time: '10:00 AM', duration: '2h', type: 'focus' },
    { title: 'Lunch & Restore', time: '12:00 PM', duration: '1h', type: 'break' },
    { title: 'Client Sync: Cyber Dynamics', time: '01:00 PM', duration: '45m', type: 'meeting', attendees: 2 },
    { title: 'Learning: Machine Vision', time: '03:00 PM', duration: '1h', type: 'learning' },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'border-blue-500/50 bg-blue-500/10 text-blue-400';
      case 'focus': return 'border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan';
      case 'break': return 'border-green-500/50 bg-green-500/10 text-green-400';
      case 'learning': return 'border-neon-purple/50 bg-neon-purple/10 text-neon-purple';
      default: return 'border-white/20 bg-white/5 text-white';
    }
  };

  return (
    <motion.div variants={containerVars} initial="hidden" animate="show" className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-neon-purple/10 border border-neon-purple/30 flex items-center justify-center text-neon-purple">
            <CalendarIcon size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Temporal Management</h1>
            <p className="text-slate-400 text-sm mt-1">Schedule Sync: Optimal</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVars} className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-white mb-4">Today's Protocol</h2>
          
          <div className="space-y-3">
            {events.map((event, idx) => (
              <div key={idx} className={`p-4 rounded-2xl border ${getTypeColor(event.type)} flex flex-col sm:flex-row justify-between gap-4 transition-transform hover:-translate-y-1`}>
                <div>
                  <h3 className="font-bold text-white text-lg">{event.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm opacity-80">
                    <span className="flex items-center gap-1"><Clock size={14} /> {event.time}</span>
                    <span>{event.duration}</span>
                  </div>
                </div>
                
                {event.type === 'meeting' && (
                  <div className="flex items-center gap-3 self-start sm:self-center">
                    <div className="flex -space-x-2">
                      {[...Array(Math.min(3, event.attendees || 0))].map((_, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-slate-700 border-2 border-background flex items-center justify-center text-[10px] font-bold text-white">
                          U{i+1}
                        </div>
                      ))}
                    </div>
                    <button className="p-2 bg-background/50 rounded-lg hover:bg-white/10 transition-colors">
                      <Video size={16} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVars} className="space-y-6">
          <div className="glass p-6 rounded-3xl border border-white/5">
            <h3 className="font-bold text-white mb-4">Mini Calendar</h3>
            <div className="grid grid-cols-7 gap-2 text-center text-xs text-slate-500 mb-2">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(d => <div key={d}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-sm">
              {[...Array(30)].map((_, i) => (
                <div 
                  key={i} 
                  className={`p-2 rounded-lg ${i + 1 === 15 ? 'bg-neon-cyan text-background font-bold shadow-[0_0_15px_rgba(0,245,255,0.4)]' : 'text-slate-300 hover:bg-white/10 cursor-pointer transition-colors'}`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
