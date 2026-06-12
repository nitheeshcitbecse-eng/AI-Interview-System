import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiEye, FiDownload, FiTrash2, FiFilter } from 'react-icons/fi';
import GradientCard from '../components/GradientCard';
import { formatDate } from '../utils/helpers';
import { useInterviewStore } from '../store/interviewStore';

const InterviewHistory = () => {
  const { interviews } = useInterviewStore();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  const mockInterviews = [
    {
      id: 1,
      type: 'Technical Round',
      company: 'Tech Corp',
      date: '2024-06-10',
      score: 85,
      duration: '45:30',
      status: 'completed',
      feedback: 'Great technical knowledge'
    },
    {
      id: 2,
      type: 'HR Round',
      company: 'Tech Corp',
      date: '2024-06-09',
      score: 92,
      duration: '30:15',
      status: 'completed',
      feedback: 'Excellent communication skills'
    },
    {
      id: 3,
      type: 'Behavioral',
      company: 'StartUp Inc',
      date: '2024-06-08',
      score: 78,
      duration: '35:45',
      status: 'completed',
      feedback: 'Good answers, needs more examples'
    },
    {
      id: 4,
      type: 'ML Engineer Interview',
      company: 'AI Labs',
      date: '2024-06-07',
      score: 88,
      duration: '50:20',
      status: 'completed',
      feedback: 'Strong ML knowledge demonstrated'
    }
  ];

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

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (score) => {
    if (score >= 85) return 'bg-green-500/10 border-green-500/30';
    if (score >= 70) return 'bg-yellow-500/10 border-yellow-500/30';
    return 'bg-red-500/10 border-red-500/30';
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-4xl font-bold gradient-text mb-2">Interview History</h1>
        <p className="text-slate-400">Review your past interviews and track your progress</p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Interviews', value: mockInterviews.length, icon: '📊' },
          { label: 'Average Score', value: '86%', icon: '⭐' },
          { label: 'Best Score', value: '92%', icon: '🏆' },
          { label: 'Total Time', value: '2h 41m', icon: '⏱️' }
        ].map((stat, idx) => (
          <GradientCard key={idx}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-cyan-300">{stat.value}</p>
              </div>
              <span className="text-4xl">{stat.icon}</span>
            </div>
          </GradientCard>
        ))}
      </motion.div>

      {/* Filters and Sort */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['all', 'technical', 'hr', 'behavioral', 'ml'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 ${
                filter === f
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                  : 'bg-slate-800/50 border border-cyan-500/20 text-slate-300 hover:border-cyan-500/50'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex gap-2 ml-auto">
          <button className="px-4 py-2 rounded-lg bg-slate-800/50 border border-cyan-500/20 text-slate-300 hover:border-cyan-500/50 transition-all flex items-center gap-2">
            <FiFilter size={18} />
            Filter
          </button>
        </div>
      </motion.div>

      {/* Interview List */}
      <motion.div variants={itemVariants} className="space-y-4">
        {mockInterviews.length === 0 ? (
          <GradientCard>
            <div className="text-center py-16">
              <p className="text-4xl mb-4">📭</p>
              <h3 className="text-2xl font-bold mb-2">No interviews yet</h3>
              <p className="text-slate-400">Start your first mock interview to see them here!</p>
            </div>
          </GradientCard>
        ) : (
          mockInterviews.map((interview, idx) => (
            <motion.div
              key={interview.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              <GradientCard className="cursor-pointer">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold">{interview.type}</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-300">
                        {interview.status}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mb-2">{interview.company}</p>
                    <p className="text-xs text-slate-500">{formatDate(interview.date)}</p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${getScoreColor(interview.score)} border rounded-lg px-4 py-2 ${getScoreBg(interview.score)}`}>
                        {interview.score}%
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Score</p>
                    </div>

                    <div className="text-center">
                      <p className="text-lg font-semibold text-slate-300">{interview.duration}</p>
                      <p className="text-xs text-slate-400">Duration</p>
                    </div>

                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/30 transition-all">
                        <FiEye size={18} />
                      </button>
                      <button className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-400 hover:bg-purple-500/30 transition-all">
                        <FiDownload size={18} />
                      </button>
                      <button className="p-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all">
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </GradientCard>
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
};

export default InterviewHistory;