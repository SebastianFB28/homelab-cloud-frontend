<script setup>
</script>

<template>
  <section class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
    <!-- CPU -->
    <div class="bg-white border border-[#EDEDED] p-6 rounded-lg flex items-center gap-4">
      <div class="w-14 h-14 rounded-full border-4 border-blue-500 flex items-center justify-center">
        <span class="text-[14px] font-bold text-[#21201a]">42%</span>
      </div>
      <div>
        <h4 class="text-[14px] font-bold text-[#21201a]">CPU Usage</h4>
        <p class="text-[12px] text-[#49473f]">4 Cores / 8 Threads</p>
      </div>
    </div>

    <!-- RAM -->
    <div class="bg-white border border-[#EDEDED] p-6 rounded-lg flex items-center gap-4">
      <div class="w-14 h-14 rounded-full border-4 border-purple-500 flex items-center justify-center">
        <span class="text-[14px] font-bold text-[#21201a]">12<span class="text-[10px]">GB</span></span>
      </div>
      <div>
        <h4 class="text-[14px] font-bold text-[#21201a]">RAM Allocation</h4>
        <p class="text-[12px] text-[#49473f]">Out of 32 GB</p>
      </div>
    </div>

    <!-- Network -->
    <div class="bg-white border border-[#EDEDED] p-6 rounded-lg flex items-center gap-4">
      <div class="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
        <span class="material-symbols-outlined">sync_alt</span>
      </div>
      <div class="w-full">
        <div class="flex justify-between text-[12px] mb-1">
          <span class="text-green-600 font-bold flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">arrow_downward</span> 45 MB/s</span>
          <span class="text-blue-600 font-bold flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">arrow_upward</span> 12 MB/s</span>
        </div>
        <p class="text-[12px] text-[#49473f]">Current Traffic</p>
      </div>
    </div>
  </section>
</template>