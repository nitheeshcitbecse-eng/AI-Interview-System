import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiDownload, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import GradientCard from '../components/GradientCard';
import AnimatedChart from '../components/AnimatedChart';

const ResumeAnalyzer = () => {
  const [resume, setResume] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const mockAnalysis = {
    overallScore: 85,
    sections: {
      structure: { score: 90, feedback: 'Well-organized resume with clear sections' },
      content: { score: 85, feedback: 'Strong content but could add more metrics' },
      skills: { score: 80, feedback: 'Good skill section, consider adding proficiency levels' },
      experience: { score: 88, feedback: 'Excellent experience descriptions with impact' }
    },
    strengths: [
      'Clear and concise formatting',
      'Strong action verbs used',
      'Relevant technical skills highlighted',
      'Quantifiable achievements mentioned'
    ],
    improvements: [
      'Add more technical certifications',
      'Include links to portfolio or projects',
      'Expand on soft skills',
      'Add metrics for each achievement'
    ],
    extractedSkills: [
      { skill: 'Python', proficiency: 95, category: 'Programming' },
      { skill: 'Machine Learning', proficiency: 85, category: 'ML' },
      { skill: 'Data Analysis', proficiency: 90, category: 'Data' },
      { skill: 'Team Leadership', proficiency: 80, category: 'Soft Skills' },
      { skill: 'Communication', proficiency: 85, category: 'Soft Skills' },
      { skill: 'Problem Solving', proficiency: 90, category: 'Soft Skills' }
    ]
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setResume(file);
      // Simulate analysis
      setIsAnalyzing(true);
      setTimeout(() => {
        setAnalysis(mockAnalysis);
        setIsAnalyzing(false);
      }, 2000);
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
        <h1 className="text-4xl font-bold gradient-text mb-2">Resume Analyzer</h1>
        <p className="text-slate-400">Get AI-powered insights to improve your resume</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Section */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <GradientCard>
            <h2 className="text-2xl font-bold mb-6">Upload Your Resume</h2>
            
            {!resume ? (
              <label className="cursor-pointer">
                <div className="border-2 border-dashed border-cyan-500/30 rounded-lg p-12 text-center hover:border-cyan-500/60 transition-colors">
                  <FiUpload className="mx-auto text-4xl text-cyan-400 mb-4" />
                  <p className="text-xl font-semibold mb-2">Drop your resume here</p>
                  <p className="text-slate-400">or click to browse (PDF, DOC, DOCX)</p>
                </div>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                />
              </label>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                      <FiCheckCircle className="text-cyan-400" size={24} />
                    </div>
                    <div>
                      <p className="font-semibold">{resume.name}</p>
                      <p className="text-sm text-slate-400">{(resume.size / 1024).toFixed(2)} KB</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setResume(null)}
                    className="px-4 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </GradientCard>
        </motion.div>

        {/* Score Card */}
        {analysis && (
          <motion.div variants={itemVariants}>
            <GradientCard>
              <h3 className="text-xl font-bold mb-4">Overall Score</h3>
              <div className="text-center">
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                    <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(0,212,255,0.1)" strokeWidth="8" />
                    <motion.circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      strokeDasharray={440}
                      strokeDashoffset={440 - (analysis.overallScore / 100) * 440}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00d4ff" />
                        <stop offset="100%" stopColor="#0099ff" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-4xl font-bold text-cyan-300">{analysis.overallScore}</p>
                    <p className="text-xs text-slate-400">out of 100</p>
                  </div>
                </div>
                <p className="text-green-400 font-semibold">Great Job! 🎉</p>
              </div>
            </GradientCard>
          </motion.div>
        )}
      </div>

      {/* Analysis Results */}
      {analysis && (
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Section Scores */}
          <GradientCard>
            <h3 className="text-2xl font-bold mb-6">Section Breakdown</h3>
            <div className="space-y-4">
              {Object.entries(analysis.sections).map(([key, data]) => (
                <div key={key}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold capitalize">{key}</span>
                    <span className="text-cyan-300 font-bold">{data.score}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${data.score}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{data.feedback}</p>
                </div>
              ))}
            </div>
          </GradientCard>

          {/* Strengths & Improvements */}
          <div className="space-y-6">
            <GradientCard>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <FiCheckCircle className="text-green-400" />
                Key Strengths
              </h3>
              <ul className="space-y-2">
                {analysis.strengths.map((strength, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3 p-2 rounded hover:bg-slate-800/30 transition-colors"
                  >
                    <span className="text-green-400 mt-1">✓</span>
                    <span className="text-sm">{strength}</span>
                  </motion.li>
                ))}
              </ul>
            </GradientCard>

            <GradientCard>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <FiAlertCircle className="text-yellow-400" />
                Areas to Improve
              </h3>
              <ul className="space-y-2">
                {analysis.improvements.map((improvement, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3 p-2 rounded hover:bg-slate-800/30 transition-colors"
                  >
                    <span className="text-yellow-400 mt-1">→</span>
                    <span className="text-sm">{improvement}</span>
                  </motion.li>
                ))}
              </ul>
            </GradientCard>
          </div>

          {/* Skills */}
          <GradientCard className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-6">Extracted Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {analysis.extractedSkills.map((skill, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 bg-slate-800/30 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{skill.skill}</span>
                    <span className="text-xs px-2 py-1 rounded bg-cyan-500/20 text-cyan-300">{skill.category}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.proficiency}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{skill.proficiency}% proficiency</p>
                </motion.div>
              ))}
            </div>
          </GradientCard>
        </motion.div>
      )}

      {isAnalyzing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <GradientCard className="max-w-md">
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 rounded-full border-4 border-cyan-500/20 border-t-cyan-500 mx-auto mb-4"
              />
              <p className="font-semibold">Analyzing your resume...</p>
              <p className="text-sm text-slate-400 mt-2">This may take a moment</p>
            </div>
          </GradientCard>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ResumeAnalyzer;