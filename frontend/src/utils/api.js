import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  logout: () => api.post('/auth/logout')
};

export const interviewAPI = {
  startInterview: (type) => api.post('/interview/start', { type }),
  endInterview: (interviewId) => api.post(`/interview/${interviewId}/end`),
  getInterviews: () => api.get('/interview/history'),
  getInterviewDetails: (interviewId) => api.get(`/interview/${interviewId}`)
};

export const analysisAPI = {
  analyzeAudio: (audioBlob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    return api.post('/analysis/audio', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  analyzeResume: (resumeFile) => {
    const formData = new FormData();
    formData.append('resume', resumeFile);
    return api.post('/analysis/resume', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  getLiveAnalysis: (interviewId) => api.get(`/analysis/live/${interviewId}`),
  getDetailedFeedback: (interviewId) => api.get(`/analysis/feedback/${interviewId}`)
};

export default api;