import { defineStore } from 'pinia';
import { login, logout } from '@/api/authService';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: null as { role: string; email: string } | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token, // Devuelve true si el token está presente
  },
  actions: {
    async login(email: string, password: string) {
      const { token, role, email: userEmail } = await login(email, password);
      this.token = token;
      this.user = { role, email: userEmail };
      localStorage.setItem('token', token);
    },
    async logout() {
      await logout(this.token);
      this.token = '';
      this.user = null;
      localStorage.removeItem('token');
    },
  },
});
