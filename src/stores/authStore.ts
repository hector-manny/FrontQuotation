import { defineStore } from 'pinia';
import { login, logout } from '@/api/authService';

interface User {
  email: string;
  role: string; // Define el rol del usuario (e.g., 'admin', 'user')
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null as User | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token, // Devuelve true si el token está presente
    userRole: (state) => state.user?.role || null,
  },
  actions: {
    /**
     * Maneja el inicio de sesión
     * @param email - Correo del usuario
     * @param password - Contraseña del usuario
     */
    async login(email: string, password: string) {
      try {
        // Simulación de una llamada al backend para autenticar
        const response = await login(email, password);

        // Guardamos el token y la información del usuario
        this.token = response.token;
        this.user = { email: response.email, role: response.role };

        // Guarda el token en localStorage para persistencia
        localStorage.setItem('token', this.token);
        localStorage.setItem('user', JSON.stringify(this.user));
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw new Error('Credenciales incorrectas');
      }
    },

    /**
     * Maneja el cierre de sesión
     */
    async logout() {
      await logout(this.token);

      // Limpia el estado y el almacenamiento local
      this.token = '';
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },

    /**
     * Restaura el estado desde localStorage
     * Útil para inicializar el store cuando la página se recarga
     */
    restoreSession() {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if (token && user) {
        this.token = token;
        this.user = JSON.parse(user);
      } else {
        this.token = '';
        this.user = null;
      }
    },
  },
});
