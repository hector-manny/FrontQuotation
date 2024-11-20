import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import MainLayout from '@/layouts/MainLayout.vue';
import EmptyLayoutVue from '@/layouts/EmptyLayout.vue';

import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/auth/LoginPage.vue';

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean; // Indica si la ruta requiere autenticación
    roles?: string[]; // Lista de roles permitidos para la ruta
    layout?: typeof MainLayout | typeof EmptyLayoutVue; // Tipo del layout (puedes ajustarlo si usas layouts específicos)
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true, // Ruta protegida
      // roles: ['admin'], // Roles permitidos
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
  {
    path: '/:pathMatch(.*)*', // Ruta comodín para capturar cualquier ruta no encontrada
    name: 'not-found',
    redirect: { name: 'login' }, // Redirige al login
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Guard global para proteger rutas
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Verifica si la ruta requiere autenticación
  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      // Redirige al login si no está autenticado
      return next({ name: 'login' });
    }

    // Verifica si el usuario tiene el rol necesario
    const requiredRoles = to.meta.roles || [];
    if (requiredRoles.length > 0 && authStore.userRole && !requiredRoles.includes(authStore.userRole)) {
      // Redirige si el usuario no tiene el rol adecuado
      return next({ name: 'login' }); // Puedes redirigir a una página de error o a home
    }
  }

  // Si no requiere autenticación o tiene el rol adecuado, permite el acceso
  next();
});

export default router;
