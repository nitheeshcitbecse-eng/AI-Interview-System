import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: localStorage.getItem('token') !== null,
  user: JSON.parse(localStorage.getItem('user') || '{}'),
  token: localStorage.getItem('token'),
  
  login: (credentials) => {
    localStorage.setItem('token', 'sample-token');
    localStorage.setItem('user', JSON.stringify(credentials));
    set({ isAuthenticated: true, token: 'sample-token', user: credentials });
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ isAuthenticated: false, token: null, user: {} });
  },
  
  setUser: (user) => set({ user })
}));

export { useAuthStore };