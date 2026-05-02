<script setup>
import pending from '@/assets/PENDING.svg'

import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.push('/login');
};
</script>

<template>
  <main class="min-h-screen flex items-center justify-center px-4 bg-[#f9f9f9] text-[#1a1c1c] font-body-md antialiased overflow-hidden">
    <div class="max-w-[480px] w-full flex flex-col items-center text-center space-y-8">
      
      <div class="space-y-4 flex flex-col items-center">
        <div class="w-32 h-32 flex items-center justify-center">
           <img :src="pending" alt="Server Maintenance" class="w-full h-full object-contain" />

        </div>
        
        <div class="flex items-center justify-center animate-pulse">
          <span class="material-symbols-outlined text-[#7a776e] text-[28px]">schedule</span>
        </div>
      </div>

      <div class="space-y-2">
        <h1 class="text-[40px] font-bold text-[#21201a] leading-tight tracking-tight">Account Pending</h1>
        <h2 class="text-[22px] font-semibold text-[#49473f]">Your account is waiting for admin approval.</h2>
      </div>

      <div class="bg-[#f3f3f4] p-4 rounded-lg flex items-start gap-4 text-left max-w-[400px]">
        <span class="material-symbols-outlined text-[#0059ba] text-[20px] shrink-0 mt-0.5">info</span>
        <p class="text-[14px] text-[#49473f]">
          You will be able to access your personal cloud once your account is approved.
        </p>
      </div>

      <div class="flex flex-col items-center gap-4 w-full pt-4">
        <button @click="goBack" class="w-full max-w-[240px] bg-[#21201a] text-white py-3 px-8 rounded-lg font-medium transition-all hover:opacity-90 active:scale-95 duration-200">
          Back to Login
        </button>
        <button @click="router.go(0)" class="text-[14px] text-[#0059ba] hover:underline transition-all cursor-pointer">
          Refresh status
        </button>
      </div>

      <div class="fixed inset-0 -z-10 opacity-[0.03] pointer-events-none">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#7a776e] rounded-full"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#7a776e] rounded-full"></div>
      </div>
    </div>
  </main>
</template>