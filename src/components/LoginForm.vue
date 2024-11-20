<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">Correo</label>
      <input id="email" v-model="email" type="email"
        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        required />
    </div>
    <div>
      <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
      <input id="password" v-model="password" type="password"
        class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        required />
    </div>
    <button type="submit" class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
      Iniciar sesión
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');

const handleSubmit = async () => {
  try {
    await authStore.login(email.value, password.value);
    alert('Inicio de sesión exitoso');
    router.push('/'); // Redirigir a una página específica después del login
  } catch (error) {
    const errorMessage = (error as Error).message;
    alert('Error al iniciar sesión: ' + errorMessage);
  }
};
</script>
