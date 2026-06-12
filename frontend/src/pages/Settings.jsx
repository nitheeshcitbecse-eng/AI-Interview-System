import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSettings, FiBell, FiVolume2, FiGlobe, FiLock, FiUser } from 'react-icons/fi';
import GradientCard from '../components/GradientCard';
import { useAuthStore } from '../store/authStore';

const Settings = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    theme: 'dark',
    language: 'en',
    notifications: true,
    soundEnabled: true,
    emailUpdates: false,
    difficulty: 'intermediate'
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-4xl font-bold gradient-text mb-2">Settings</h1>
        <p className="text-slate-400">Customize your interview experience</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <GradientCard className="p-0 h-fit">
            <div className="p-4 border-b border-cyan-500/20">
              <h3 className="font-bold text-lg">Settings</h3>
            </div>
            <div className="divide-y divide-cyan-500/20">
              {[
                { id: 'general', label: 'General', icon: FiSettings },
                { id: 'profile', label: 'Profile', icon: FiUser },
                { id: 'notifications', label: 'Notifications', icon: FiBell },
                { id: 'audio', label: 'Audio & Video', icon: FiVolume2 },
                { id: 'privacy', label: 'Privacy & Security', icon: FiLock }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full p-4 flex items-center gap-3 transition-all duration-300 ${
                      activeTab === item.id
                        ? 'bg-cyan-500/10 text-cyan-300 border-l-2 border-cyan-500'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
                    }`}
                  >
                    <Icon size={20} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </GradientCard>
        </motion.div>

        {/* Content */}
        <motion.div variants={itemVariants} className="lg:col-span-3">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <GradientCard>
                <h3 className="text-2xl font-bold mb-6">General Settings</h3>
                
                <div className="space-y-6">
                  {/* Theme */}
                  <div>
                    <label className="block text-sm font-semibold mb-3">Theme</label>
                    <div className="flex gap-4">
                      {['light', 'dark', 'auto'].map((theme) => (
                        <label key={theme} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="theme"
                            value={theme}
                            checked={settings.theme === theme}
                            onChange={(e) => handleChange('theme', e.target.value)}
                            className="w-4 h-4"
                          />
                          <span className="capitalize">{theme}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Language */}
                  <div>
                    <label className="block text-sm font-semibold mb-3">Language</label>
                    <select
                      value={settings.language}
                      onChange={(e) => handleChange('language', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-cyan-500/20 focus:border-cyan-500/50 outline-none transition-colors"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>

                  {/* Difficulty */}
                  <div>
                    <label className="block text-sm font-semibold mb-3">Interview Difficulty</label>
                    <select
                      value={settings.difficulty}
                      onChange={(e) => handleChange('difficulty', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-cyan-500/20 focus:border-cyan-500/50 outline-none transition-colors"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>
                </div>
              </GradientCard>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <GradientCard>
                <h3 className="text-2xl font-bold mb-6">Notification Settings</h3>
                
                <div className="space-y-4">
                  {[
                    { key: 'notifications', label: 'Push Notifications', description: 'Get notified about interview reminders' },
                    { key: 'emailUpdates', label: 'Email Updates', description: 'Receive tips and progress updates' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                      <div>
                        <p className="font-semibold">{item.label}</p>
                        <p className="text-sm text-slate-400">{item.description}</p>
                      </div>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings[item.key]}
                          onChange={() => handleToggle(item.key)}
                          className="w-5 h-5 rounded"
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </GradientCard>
            </div>
          )}

          {/* Audio & Video Settings */}
          {activeTab === 'audio' && (
            <div className="space-y-6">
              <GradientCard>
                <h3 className="text-2xl font-bold mb-6">Audio & Video Settings</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30">
                    <div>
                      <p className="font-semibold">Sound Enabled</p>
                      <p className="text-sm text-slate-400">Enable audio feedback during interviews</p>
                    </div>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.soundEnabled}
                        onChange={() => handleToggle('soundEnabled')}
                        className="w-5 h-5 rounded"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-3">Microphone</label>
                    <select className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-cyan-500/20 outline-none">
                      <option>Default Device</option>
                      <option>Microphone 1</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-3">Camera</label>
                    <select className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-cyan-500/20 outline-none">
                      <option>Default Device</option>
                      <option>Camera 1</option>
                    </select>
                  </div>
                </div>
              </GradientCard>
            </div>
          )}

          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <GradientCard>
                <h3 className="text-2xl font-bold mb-6">Profile Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Username</label>
                    <input
                      type="text"
                      defaultValue={user?.username || 'User'}
                      className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-cyan-500/20 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue={user?.email || 'email@example.com'}
                      className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-cyan-500/20 outline-none"
                    />
                  </div>

                  <button className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
                    Save Changes
                  </button>
                </div>
              </GradientCard>
            </div>
          )}

          {/* Privacy Settings */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <GradientCard>
                <h3 className="text-2xl font-bold mb-6">Privacy & Security</h3>
                
                <div className="space-y-4">
                  <button className="w-full p-4 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors text-left font-semibold">
                    Change Password
                  </button>
                  <button className="w-full p-4 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors text-left font-semibold">
                    Two-Factor Authentication
                  </button>
                  <button className="w-full p-4 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors text-left font-semibold text-red-400">
                    Delete Account
                  </button>
                </div>
              </GradientCard>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Settings;