import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import MockInterview from './pages/MockInterview';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import AIFeedback from './pages/AIFeedback';
import InterviewHistory from './pages/InterviewHistory';
import Settings from './pages/Settings';
import Login from './pages/Login';
import { useAuthStore } from './store/authStore';

function App() {
  const { isAuthenticated } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <main className="flex-1 overflow-auto transition-all duration-300">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/mock-interview" element={<MockInterview />} />
            <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
            <Route path="/ai-feedback" element={<AIFeedback />} />
            <Route path="/interview-history" element={<InterviewHistory />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;