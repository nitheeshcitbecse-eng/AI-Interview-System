import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMic, FiMicOff, FiPhone, FiSettings, FiSend, FiDownload } from 'react-icons/fi';
import GradientCard from '../components/GradientCard';
import AnimatedMetricCircle from '../components/AnimatedMetricCircle';
import { useInterviewStore } from '../store/interviewStore';
import { useAuthStore } from '../store/authStore';

const MockInterview = () => {
  const { currentInterview, liveAnalysis, transcript, startInterview, endInterview, updateLiveAnalysis, addTranscript } = useInterviewStore();
  const { user } = useAuthStore();
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [message, setMessage] = useState('');
  const [sessionProgress, setSessionProgress] = useState(45);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  const handleStartInterview = () => {
    startInterview('technical');
  };

  const handleEndInterview = () => {
    endInterview();
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      addTranscript({
        type: 'user',
        content: message,
        timestamp: new Date(),
        id: transcript.length
      });
      
      // Simulate AI response
      setTimeout(() => {
        addTranscript({
          type: 'ai',
          content: 'Great answer! Can you elaborate on the technical implementation?',
          timestamp: new Date(),
          id: transcript.length + 1
        });
      }, 1000);
      
      setMessage('');
    }
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setIsListening(true);
      setTimeout(() => setIsListening(false), 3000);
    }
  };

  if (!currentInterview) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8 flex items-center justify-center"
      >
        <GradientCard className="w-full max-w-2xl">
          <div className="text-center">
            <div className="text-6xl mb-6">🎤</div>
            <h1 className="text-4xl font-bold mb-4 gradient-text">Start Your Mock Interview</h1>
            <p className="text-slate-400 mb-8">Get real-time AI feedback on your performance</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {['Technical', 'HR Round', 'Behavioral'].map((type, idx) => (
                <button
                  key={idx}
                  onClick={handleStartInterview}
                  className="p-4 rounded-lg bg-slate-800/50 border border-cyan-500/20 hover:border-cyan-500/50 hover:bg-slate-800 transition-all duration-300"
                >
                  {type}
                </button>
              ))}
            </div>
            
            <button
              onClick={handleStartInterview}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
            >
              Begin Interview
            </button>
          </div>
        </GradientCard>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Interview Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Avatar Section */}
          <GradientCard>
            <div className="text-center">
              <motion.div
                animate={isListening ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 1, repeat: isListening ? Infinity : 0 }}
                className="inline-block mb-4"
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/40 flex items-center justify-center text-6xl">
                  🤖
                </div>
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">AI Interviewer</h2>
              <p className="text-slate-400 mb-4">
                {isListening ? 'Listening...' : 'Ready to answer'}
              </p>
              
              {/* Audio Visualization */}
              {isListening && (
                <div className="flex items-center justify-center gap-1 py-4">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [8, 24, 8] }}
                      transition={{ duration: 0.5, delay: i * 0.05, repeat: Infinity }}
                      className="w-1 bg-gradient-to-t from-cyan-500 to-blue-500 rounded-full"
                    />
                  ))}
                </div>
              )}
            </div>
          </GradientCard>

          {/* Chat Area */}
          <GradientCard className="h-96 flex flex-col">
            <h3 className="text-lg font-bold mb-4">Conversation</h3>
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {transcript.length === 0 ? (
                <div className="flex items-center justify-center h-full text-slate-400">
                  Conversation will appear here
                </div>
              ) : (
                transcript.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.type === 'user'
                          ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border border-cyan-500/50'
                          : 'bg-slate-800/50 border border-slate-700/50'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </motion.div>
                ))
              )}
              <div ref={chatEndRef} />
            </div>
            
            {/* Message Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your answer..."
                className="flex-1 px-4 py-2 rounded-lg bg-slate-800/50 border border-cyan-500/20 focus:border-cyan-500/50 outline-none transition-colors"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
              >
                <FiSend size={20} />
              </button>
            </div>
          </GradientCard>
        </div>

        {/* Right Sidebar - Live Analysis */}
        <div className="space-y-6">
          {/* Session Progress */}
          <GradientCard>
            <h3 className="text-lg font-bold mb-4">Session Progress</h3>
            <div className="text-center mb-4">
              <p className="text-4xl font-bold text-cyan-300">{sessionProgress}%</p>
              <p className="text-sm text-slate-400">12:45 / 30:00</p>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${sessionProgress}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </GradientCard>

          {/* Live Analysis Metrics */}
          <GradientCard>
            <h3 className="text-lg font-bold mb-4">Live Analysis</h3>
            <div className="space-y-3">
              {[
                { label: 'Confidence', value: liveAnalysis.confidence || 78, color: 'text-cyan-400' },
                { label: 'Clarity', value: liveAnalysis.clarity || 82, color: 'text-blue-400' },
                { label: 'Pace', value: liveAnalysis.pace || 75, color: 'text-purple-400' },
                { label: 'Engagement', value: liveAnalysis.engagement || 80, color: 'text-pink-400' }
              ].map((metric, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{metric.label}</span>
                    <span className={`text-sm font-bold ${metric.color}`}>{metric.value}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.value}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GradientCard>

          {/* Current Question */}
          <GradientCard>
            <h3 className="text-lg font-bold mb-4">Current Question</h3>
            <p className="text-sm text-slate-300 mb-4">
              Can you explain the difference between supervised and unsupervised learning?
            </p>
            <div className="flex gap-2 text-xs">
              <span className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-300">Machine Learning</span>
              <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-300">Question 2/8</span>
            </div>
          </GradientCard>

          {/* Control Buttons */}
          <div className="space-y-2">
            <button
              onClick={handleToggleRecording}
              className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                isRecording
                  ? 'bg-red-500/20 border border-red-500/50 text-red-300 hover:bg-red-500/30'
                  : 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/30'
              }`}
            >
              {isRecording ? <FiMicOff size={20} /> : <FiMic size={20} />}
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
            
            <button
              onClick={handleEndInterview}
              className="w-full py-3 rounded-lg font-semibold bg-red-500/20 border border-red-500/50 text-red-300 hover:bg-red-500/30 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FiPhone size={20} />
              End Interview
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MockInterview;