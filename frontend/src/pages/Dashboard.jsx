import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPlay, FiBook, FiBrain, FiBarChart2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import GradientCard from '../components/GradientCard';
import AnimatedMetricCircle from '../components/AnimatedMetricCircle';
import { useInterviewStore } from '../store/interviewStore';

const Dashboard = () => {
  const { interviews, liveAnalysis } = useInterviewStore();
  const [stats, setStats] = useState({
    totalInterviews: 0,
    averageScore: 0,
    hoursSpent: 0,
    streak: 0
  });

  useEffect(() => {
    // Calculate stats
    if (interviews.length > 0) {
      const avgScore = Math.round(
        interviews.reduce((acc, curr) => acc + (curr.score || 0), 0) / interviews.length
      );
      setStats({
        totalInterviews: interviews.length,
        averageScore: avgScore,
        hoursSpent: Math.floor(interviews.length * 0.5),
        streak: interviews.length > 0 ? 5 : 0
      });
    }
  }, [interviews]);

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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">Welcome Back! 👋</h1>
        <p className="text-slate-400">Ready to ace your next interview?</p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
      >
        {[
          { label: 'Total Interviews', value: stats.totalInterviews, icon: '📊' },
          { label: 'Average Score', value: `${stats.averageScore}%`, icon: '⭐' },
          { label: 'Hours Practiced', value: stats.hoursSpent, icon: '⏱️' },
          { label: 'Current Streak', value: `${stats.streak} days`, icon: '🔥' }
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

      {/* Main CTA Section */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Large Card - Start Interview */}
        <GradientCard className="lg:col-span-2 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -z-0" />
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Start Mock Interview</h2>
                <p className="text-slate-400">Get AI-powered feedback in real-time</p>
              </div>
              <div className="text-5xl">🎤</div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {['Technical', 'HR Round', 'Behavioral'].map((type, idx) => (
                <button
                  key={idx}
                  className="p-3 rounded-lg bg-slate-800/50 border border-cyan-500/20 hover:border-cyan-500/50 hover:bg-slate-800 transition-all duration-300 text-sm font-medium"
                >
                  {type}
                </button>
              ))}
            </div>
            <Link
              to="/mock-interview"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
            >
              <FiPlay size={20} />
              Start Interview
              <FiArrowRight size={20} />
            </Link>
          </div>
        </GradientCard>

        {/* Small Card - Quick Links */}
        <div className="space-y-4">
          <GradientCard className="h-full">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FiBook size={24} className="text-cyan-400" />
              Resources
            </h3>
            <div className="space-y-3">
              {['Practice Topics', 'Interview Tips', 'Resume Guide'].map((item, idx) => (
                <button
                  key={idx}
                  className="w-full text-left p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800/60 transition-all duration-300 text-sm"
                >
                  {item}
                </button>
              ))}
            </div>
          </GradientCard>
        </div>
      </motion.div>

      {/* Performance Overview */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Analysis Preview */}
        <GradientCard>
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FiBrain size={24} className="text-cyan-400" />
            Live Analysis Preview
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Confidence', value: liveAnalysis.confidence || 78, color: 'from-cyan-500' },
              { label: 'Clarity', value: liveAnalysis.clarity || 82, color: 'from-blue-500' },
              { label: 'Pace', value: liveAnalysis.pace || 75, color: 'from-purple-500' },
              { label: 'Engagement', value: liveAnalysis.engagement || 80, color: 'from-pink-500' }
            ].map((metric, idx) => (
              <div key={idx} className="bg-slate-800/30 p-4 rounded-lg">
                <p className="text-sm text-slate-400 mb-2">{metric.label}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-2xl font-bold bg-gradient-to-r ${metric.color} to-transparent bg-clip-text text-transparent`}>
                    {metric.value}%
                  </span>
                  <div className="w-12 h-1 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${metric.color}`}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GradientCard>

        {/* Recent Activity */}
        <GradientCard>
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FiBarChart2 size={24} className="text-cyan-400" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {interviews.slice(0, 3).length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-400">No interviews yet. Start one to see activity!</p>
              </div>
            ) : (
              interviews.slice(0, 3).map((interview, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-sm">{interview.type}</p>
                    <p className="text-xs text-slate-400">Score: {interview.score || 'N/A'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Recently</p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </GradientCard>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;