import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiMic, FiFileText, FiBrain, FiClock, FiSettings, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { FiTrendingUp } from 'react-icons/fi';
import { useAuthStore } from '../store/authStore';
import { motion } from 'framer-motion';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const menuItems = [
    { icon: FiHome, label: 'Home', path: '/', id: 'home' },
    { icon: FiMic, label: 'Mock Interview', path: '/mock-interview', id: 'interview' },
    { icon: FiFileText, label: 'Resume Analyzer', path: '/resume-analyzer', id: 'resume' },
    { icon: FiBrain, label: 'AI Feedback', path: '/ai-feedback', id: 'feedback' },
    { icon: FiClock, label: 'Interview History', path: '/interview-history', id: 'history' },
    { icon: FiSettings, label: 'Settings', path: '/settings', id: 'settings' }
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className="fixed lg:relative w-64 h-screen bg-gradient-to-b from-slate-900 to-slate-950 border-r border-cyan-500/20 z-40 overflow-y-auto flex flex-col"
      >
        {/* Logo */}
        <div className="p-6 border-b border-cyan-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg glow">
              AI
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">AI Interviewer</h1>
              <p className="text-xs text-slate-400">Advanced System</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 text-cyan-300'
                    : 'text-slate-300 hover:bg-slate-800/50 border border-transparent hover:border-cyan-500/20'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-cyan-400 glow" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-cyan-500/20 space-y-4">
          <div className="glass-effect-dark p-4 rounded-lg">
            <p className="text-xs text-slate-400 mb-1">Premium User</p>
            <p className="text-sm font-semibold text-cyan-300 mb-3">{user?.username || 'Guest'}</p>
            <button className="w-full px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
              Upgrade Plan
            </button>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 border border-transparent transition-all duration-300"
          >
            <FiLogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;