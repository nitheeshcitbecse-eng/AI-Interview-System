import { create } from 'zustand';

const useInterviewStore = create((set) => ({
  currentInterview: null,
  interviews: [],
  liveAnalysis: {
    confidence: 0,
    clarity: 0,
    pace: 0,
    engagement: 0,
    performanceScore: 0
  },
  transcript: [],
  
  startInterview: (type) => {
    set({ currentInterview: { type, startTime: new Date(), status: 'active' } });
  },
  
  endInterview: () => {
    set((state) => ({
      interviews: [...state.interviews, { ...state.currentInterview, endTime: new Date() }],
      currentInterview: null
    }));
  },
  
  updateLiveAnalysis: (analysis) => {
    set({ liveAnalysis: analysis });
  },
  
  addTranscript: (message) => {
    set((state) => ({
      transcript: [...state.transcript, message]
    }));
  },
  
  resetState: () => {
    set({
      currentInterview: null,
      transcript: [],
      liveAnalysis: {
        confidence: 0,
        clarity: 0,
        pace: 0,
        engagement: 0,
        performanceScore: 0
      }
    });
  }
}));

export { useInterviewStore };