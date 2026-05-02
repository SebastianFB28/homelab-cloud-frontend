<script setup>
import banned from '@/assets/banned.svg'
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.push('/login');
};
</script>

<template>
  <div class="font-body-md text-[#1a1c1c] antialiased bg-white min-h-screen relative">
    
    <header class="fixed top-0 left-0 w-full h-16 flex items-center justify-between px-8 z-50 border-b border-zinc-100 bg-white">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-zinc-900">dns</span>
        <span class="text-lg font-semibold tracking-tight text-zinc-900">Homelab Server</span>
      </div>
    </header>

    <main class="min-h-screen w-full flex flex-col items-center justify-center p-8">
      <div class="max-w-[480px] w-full flex flex-col items-center text-center">
        
        <div class="relative mb-8">
              <img :src="banned" alt="Server Maintenance" class="w-full h-full object-contain" />
          <div class="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-white border border-zinc-100 flex items-center justify-center shadow-md">
            <span class="material-symbols-outlined text-[#ba1a1a] text-xl" style="font-variation-settings: 'FILL' 1;">block</span>
          </div>
        </div>

        <h1 class="text-[30px] font-bold text-zinc-900 mb-2 leading-tight">Access Restricted</h1>
        <p class="text-[16px] text-zinc-900 mb-6">Your account has been suspended.</p>

        <div class="w-full bg-[#F7F7F5] border border-[#EDEDED] rounded-lg p-4 flex items-start gap-4 mb-8">
          <span class="material-symbols-outlined text-zinc-500 mt-0.5">info</span>
          <p class="text-[14px] text-[#49473f] text-left leading-relaxed">
            If you believe this is a mistake, contact the system administrator. Suspensions typically occur due to security protocol violations or multiple failed login attempts.
          </p>
        </div>

        <div class="flex flex-col items-center gap-4 w-full">
          <button @click="goBack" class="w-full py-3 px-6 bg-[#21201a] text-white font-medium rounded-lg hover:opacity-90 active:scale-95 transition-all duration-200 cursor-pointer">
            Back to Login
          </button>
        </div>
      </div>
    </main>

    <footer class="fixed bottom-8 w-full flex justify-center opacity-40">
      <div class="flex items-center gap-2">
        <span class="text-[12px] font-semibold tracking-widest text-zinc-400">ENCRYPTED END-TO-END</span>
        <div class="w-1 h-1 bg-zinc-300 rounded-full"></div>
        <span class="text-[12px] font-semibold tracking-widest text-zinc-400">HOMELAB NODE 01</span>
      </div>
    </footer>
  </div>
</template>