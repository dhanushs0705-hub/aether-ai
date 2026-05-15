'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Target, 
  Activity, 
  Calendar, 
  Focus, 
  BookOpen, 
  Award,
  MessageSquare,
  Menu,
  X,
  Settings,
  LogOut
} from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const navItems = [
    { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Goals & Quests', icon: Target, path: '/dashboard/goals' },
    { name: 'Habits', icon: Activity, path: '/dashboard/habits' },
    { name: 'Calendar', icon: Calendar, path: '/dashboard/calendar' },
    { name: 'Focus Mode', icon: Focus, path: '/dashboard/focus' },
    { name: 'Journal', icon: BookOpen, path: '/dashboard/journal' },
    { name: 'AI Assistant', icon: MessageSquare, path: '/dashboard/assistant' },
    { name: 'XP & Level', icon: Award, path: '/dashboard/xp' },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background/80 relative">
      {/* Sidebar Overlay for mobile */}
      <AnimatePresence>
        {!isSidebarOpen && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={() => setIsSidebarOpen(true)}
            className="fixed top-6 left-6 z-50 p-2 glass rounded-lg text-white hover:text-neon-cyan transition-colors"
          >
            <Menu size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring" as any, bounce: 0, duration: 0.4 }}
            className="w-64 h-full glass border-r border-white/5 flex flex-col relative z-40"
          >
            <div className="p-6 flex justify-between items-center border-b border-white/5">
              <div className="flex items-center gap-2">
                <Activity className="text-neon-cyan" size={20} />
                <span className="font-bold tracking-widest text-white">AETHER<span className="text-neon-cyan">.AI</span></span>
              </div>
              <button onClick={() => setIsSidebarOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-neon-cyan to-neon-purple p-[2px]">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                    <span className="text-xs font-bold text-white">CM</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Commander</p>
                  <p className="text-xs text-neon-cyan">Level 12 • Aether Elite</p>
                </div>
              </div>
              
              <div className="mt-3 w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-neon-cyan to-neon-purple h-full w-[75%]" />
              </div>
              <p className="text-[10px] text-right mt-1 text-slate-500">750 / 1000 XP</p>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link href={item.path} key={item.name}>
                    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                      isActive ? 'bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}>
                      <item.icon size={18} className={isActive ? 'animate-pulse' : 'group-hover:text-neon-purple transition-colors'} />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-white/5 space-y-2">
              <button className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all">
                <Settings size={18} />
                <span className="text-sm font-medium">Settings</span>
              </button>
              <Link href="/">
                <button className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all">
                  <LogOut size={18} />
                  <span className="text-sm font-medium">Disconnect</span>
                </button>
              </Link>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className={`flex-1 h-full overflow-y-auto transition-all duration-300 relative`}>
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
