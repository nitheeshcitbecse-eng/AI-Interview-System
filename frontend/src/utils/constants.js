export const INTERVIEW_TYPES = {
  TECHNICAL: 'technical',
  HR: 'hr',
  BEHAVIORAL: 'behavioral',
  ML_ENGINEER: 'ml_engineer'
};

export const ANALYSIS_METRICS = {
  CONFIDENCE: 'confidence',
  CLARITY: 'clarity',
  PACE: 'pace',
  ENGAGEMENT: 'engagement',
  PERFORMANCE: 'performanceScore'
};

export const COLORS = {
  primary: '#00d4ff',
  secondary: '#0099ff',
  accent: '#ff006e',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  dark: '#0f172a',
  darker: '#020617'
};

export const NAVIGATION_ITEMS = [
  { id: 'home', label: 'Home', path: '/', icon: 'home' },
  { id: 'mock-interview', label: 'Mock Interview', path: '/mock-interview', icon: 'mic' },
  { id: 'resume-analyzer', label: 'Resume Analyzer', path: '/resume-analyzer', icon: 'file' },
  { id: 'ai-feedback', label: 'AI Feedback', path: '/ai-feedback', icon: 'brain' },
  { id: 'interview-history', label: 'Interview History', path: '/interview-history', icon: 'history' },
  { id: 'settings', label: 'Settings', path: '/settings', icon: 'settings' }
];