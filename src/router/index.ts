import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import MainLayout from '@/layouts/MainLayout.vue';
import EmptyLayoutVue from '@/layouts/EmptyLayout.vue';

import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/auth/LoginPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true, // Ruta protegida
      layout: MainLayout,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      layout: EmptyLayoutVue,
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Guard global para proteger rutas
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Si la ruta requiere autenticación y no está autenticado, redirigir al login
    next({ name: 'login' });
  } else {
    // Si no requiere autenticación o está autenticado, permitir acceso
    next();
  }
});

export default router;
