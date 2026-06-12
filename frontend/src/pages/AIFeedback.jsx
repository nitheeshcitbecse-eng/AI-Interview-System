import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBrain, FiTrendingUp, FiCheckCircle, FiMessageSquare } from 'react-icons/fi';
import GradientCard from '../components/GradientCard';
import AnimatedChart from '../components/AnimatedChart';

const AIFeedback = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const mockFeedback = {
    overallScore: 87,
    performanceLabel: 'Excellent',
    metrics: {
      technical: { score: 92, feedback: 'Strong technical knowledge demonstrated' },
      communication: { score: 85, feedback: 'Good articulation, could be more concise' },
      problem_solving: { score: 89, feedback: 'Excellent approach to problem-solving' },
      confidence: { score: 87, feedback: 'Well-balanced confidence and humility' }
    },
    strengths: [
      'Deep understanding of ML algorithms',
      'Clear explanation of complex concepts',
      'Good examples from past projects',
      'Professional demeanor maintained'
    ],
    improvements: [
      'Avoid saying "um" and "uh" fillers',
      'Provide more real-world examples',
      'Expand on edge cases handling',
      'Better time management for questions'
    ],
    performanceTrend: [
      { name: 'Interview 1', value: 75 },
      { name: 'Interview 2', value: 78 },
      { name: 'Interview 3', value: 82 },
      { name: 'Interview 4', value: 85 },
      { name: 'Interview 5', value: 87 }
    ],
    detailedAnalysis: {
      technical_accuracy: {
        score: 92,
        comments: 'Your technical answers were accurate and well-explained. Consider adding more edge cases in your solutions.'
      },
      communication_clarity: {
        score: 85,
        comments: 'Your explanations were generally clear, but some answers could be more concise.'
      },
      problem_approach: {
        score: 89,
        comments: 'You took a systematic approach to problem-solving, breaking down complex issues effectively.'
      },
      response_time: {
        score: 80,
        comments: 'Good pacing overall, but some questions could use quicker initial responses.'
      }
    }
  };

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
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-4xl font-bold gradient-text mb-2">AI Feedback</h1>
        <p className="text-slate-400">Detailed analysis of your interview performance</p>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Overall Score', value: mockFeedback.overallScore, icon: '⭐' },
          { label: 'Technical', value: mockFeedback.metrics.technical.score, icon: '🔧' },
          { label: 'Communication', value: mockFeedback.metrics.communication.score, icon: '💬' },
          { label: 'Problem Solving', value: mockFeedback.metrics.problem_solving.score, icon: '🧠' }
        ].map((stat, idx) => (
          <GradientCard key={idx}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-cyan-300">{stat.value}%</p>
              </div>
              <span className="text-4xl">{stat.icon}</span>
            </div>
          </GradientCard>
        ))}
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants} className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {['overview', 'trends', 'detailed', 'recommendations'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 ${
              activeTab === tab
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                : 'bg-slate-800/50 border border-cyan-500/20 text-slate-300 hover:border-cyan-500/50'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </motion.div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Metric Details */}
          <GradientCard>
            <h3 className="text-2xl font-bold mb-6">Performance Metrics</h3>
            <div className="space-y-6">
              {Object.entries(mockFeedback.metrics).map(([key, data]) => (
                <div key={key}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold capitalize">{key.replace(/_/g, ' ')}</span>
                    <span className="text-cyan-300 font-bold">{data.score}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${data.score}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-2">{data.feedback}</p>
                </div>
              ))}
            </div>
          </GradientCard>

          {/* Strengths & Areas */}
          <div className="space-y-6">
            <GradientCard>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <FiCheckCircle className="text-green-400" />
                Key Strengths
              </h3>
              <ul className="space-y-3">
                {mockFeedback.strengths.map((strength, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded bg-slate-800/30 hover:bg-slate-800/50 transition-colors"
                  >
                    <span className="text-green-400 text-lg mt-0.5">✓</span>
                    <span className="text-sm">{strength}</span>
                  </motion.li>
                ))}
              </ul>
            </GradientCard>

            <GradientCard>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <FiTrendingUp className="text-yellow-400" />
                Areas to Improve
              </h3>
              <ul className="space-y-3">
                {mockFeedback.improvements.map((improvement, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded bg-slate-800/30 hover:bg-slate-800/50 transition-colors"
                  >
                    <span className="text-yellow-400 text-lg mt-0.5">→</span>
                    <span className="text-sm">{improvement}</span>
                  </motion.li>
                ))}
              </ul>
            </GradientCard>
          </div>
        </motion.div>
      )}

      {/* Trends Tab */}
      {activeTab === 'trends' && (
        <motion.div variants={itemVariants}>
          <GradientCard>
            <h3 className="text-2xl font-bold mb-6">Performance Trend</h3>
            <AnimatedChart data={mockFeedback.performanceTrend} type="area" color="#00d4ff" height={400} />
          </GradientCard>
        </motion.div>
      )}

      {/* Detailed Tab */}
      {activeTab === 'detailed' && (
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(mockFeedback.detailedAnalysis).map(([key, analysis]) => (
            <GradientCard key={key}>
              <h3 className="text-lg font-bold mb-3 capitalize">{key.replace(/_/g, ' ')}</h3>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Score</span>
                  <span className="text-cyan-300 font-bold">{analysis.score}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${analysis.score}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
              <p className="text-sm text-slate-300">{analysis.comments}</p>
            </GradientCard>
          ))}
        </motion.div>
      )}

      {/* Recommendations Tab */}
      {activeTab === 'recommendations' && (
        <motion.div variants={itemVariants}>
          <GradientCard>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FiBrain className="text-cyan-400" />
              Personalized Recommendations
            </h3>
            <div className="space-y-4">
              {[
                {
                  title: 'Practice More on System Design',
                  description: 'Your system design approach was good, but practice more complex architectures.'
                },
                {
                  title: 'Improve Communication Skills',
                  description: 'Work on reducing filler words and being more concise in explanations.'
                },
                {
                  title: 'Study Edge Cases',
                  description: 'Always consider and discuss edge cases in your solutions.'
                },
                {
                  title: 'Mock Interview Practice',
                  description: 'Continue doing mock interviews to build confidence and reduce anxiety.'
                }
              ].map((rec, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors border-l-2 border-cyan-500/50"
                >
                  <h4 className="font-semibold mb-2">{rec.title}</h4>
                  <p className="text-sm text-slate-400">{rec.description}</p>
                </motion.div>
              ))}
            </div>
          </GradientCard>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AIFeedback;