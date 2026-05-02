<script setup>

import serverError from '@/assets/500serverError.svg'

import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  router.push('/login'); 
};

const retry = () => {
  router.go(0); // Recarga la página
};
</script>

<template>
  <div class="font-body-md text-[#1a1c1c] antialiased bg-white min-h-screen relative flex flex-col items-center justify-center p-8 selection:bg-[#d7e2ff]">
    
    <main class="w-full max-w-[400px] flex flex-col items-center text-center space-y-8">
      
      <div class="mb-4">
          <img :src="serverError" alt="Server Maintenance" class="w-full h-full object-contain" />
          
      </div>

      <div class="space-y-4">
        <h1 class="text-[30px] font-bold text-[#21201a] tracking-tight">Server in Maintenance</h1>
        <p class="text-[16px] text-[#49473f] max-w-[320px] mx-auto leading-relaxed">
          We couldn't reach the homelab. We are working to resolve the issues. Please try again in a few moments.
        </p>
      </div>

      <div class="w-full pt-4 space-y-6 flex flex-col items-center">
        <button @click="retry" class="w-full py-3 bg-[#37352f] text-white font-semibold rounded-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-sm">
          Retry Connection
        </button>
        <button @click="goHome" class="block text-[14px] text-[#7a776e] hover:text-[#21201a] transition-colors">
          Go back home
        </button>
      </div>
      
    </main>

    <footer class="fixed bottom-0 left-0 w-full flex justify-center items-center gap-8 py-12 bg-transparent">
      <div class="flex items-center gap-8">
        <span class="text-[12px] text-[#73726E]">© 2026 Homelab OS</span>
        <div class="flex gap-4">
          <a class="text-[12px] text-[#73726E] hover:text-[#37352F] transition-colors" href="#">Documentation</a>
          <a class="text-[12px] text-[#73726E] hover:text-[#37352F] transition-colors" href="#">Privacy</a>
          <a class="text-[12px] text-[#73726E] hover:text-[#37352F] transition-colors" href="#">Support</a>
        </div>
      </div>
    </footer>
  </div>
</template>