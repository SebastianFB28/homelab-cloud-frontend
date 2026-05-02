<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '../api/authService';
import { useAuthStore } from '../store/auth';
import LoadingWorkspace from '@/components/shared/LoadingWorkspace.vue'; // Asegúrate de la ruta correcta

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref(''); // Para el 401

const handleLogin = async () => {
  isLoading.value = true;
  errorMessage.value = ''; // Limpiamos errores previos
  
  try {
    const response = await authService.login({ email: email.value, password: password.value });
    
    // Si llega aquí, es un 200 OK. Guardamos el token.
    authStore.setToken(response.token);
    
    // Lo mandamos al dashboard
    router.push('/dashboard');
    
  } catch (error) {
    // Quitamos la pantalla de carga para mostrar el error
    isLoading.value = false;
    
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data; // Aquí viene tu JSON de Spring Boot
      
      if (status === 401) {
        errorMessage.value = data.message || "Usuario o contraseña incorrectos";
      } 
      else if (status === 403) {
        if (data.message.includes('aprobada')) {
          router.push('/pending-approval'); // ¡Listo!
        } else if (data.message.includes('bloqueada')) {
          router.push('/banned'); // ¡Listo!
        }
      }


    } else {
      router.push('/server-error');
    }
  }
};
</script>

<template>
  <LoadingWorkspace v-if="isLoading" />

  <main v-else class="min-h-screen flex flex-col items-center justify-center px-4 bg-white relative overflow-hidden">
    
    <header class="flex flex-col items-center mb-8 text-center">
      <div class="mb-2 flex items-center justify-center text-black">
        <span class="material-symbols-outlined !text-[48px]">dns</span>
      </div>
      <h1 class="text-3xl font-extrabold text-black tracking-tight">Homelab Server</h1>
      <p class="text-gray-500 mt-2">Your trusted personal cloud</p>
    </header>

    <section class="w-full max-w-[320px] flex flex-col gap-4">
      <form @submit.prevent="handleLogin" class="space-y-4">
        
        <div class="space-y-1">
          <label class="text-[11px] font-bold text-gray-500 uppercase tracking-wider opacity-70">Email</label>
          <input 
            v-model="email"
            type="email" 
            placeholder="name@example.com"
            class="w-full px-3 py-2 bg-transparent border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all outline-none text-sm"
            required
          />
        </div>

        <div class="space-y-1">
          <label class="text-[11px] font-bold text-gray-500 uppercase tracking-wider opacity-70">Password</label>
          <input 
            v-model="password"
            type="password" 
            placeholder="••••••••"
            class="w-full px-3 py-2 bg-transparent border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all outline-none text-sm"
            required
          />
        </div>

        <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-lg p-3 mt-2 flex items-center gap-2 text-red-600">
          <span class="material-symbols-outlined text-[18px]">error</span>
          <p class="text-[13px] font-medium leading-tight">{{ errorMessage }}</p>
        </div>

        <button 
          type="submit"
          class="w-full bg-black text-white py-2.5 px-4 rounded-lg hover:bg-gray-800 active:scale-[0.98] transition-all font-semibold text-sm mt-2"
        >
          Continue
        </button>
      </form>

      </section>
  </main>
</template>