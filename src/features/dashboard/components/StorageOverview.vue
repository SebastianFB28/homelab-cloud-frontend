<script setup>
// Props preparadas para cuando conectemos el backend
defineProps({
  usedGb: { type: Number, default: 24.5 },
  totalGb: { type: Number, default: 100 },
  percentage: { type: Number, default: 24.5 }
});
</script>

<template>
  <section class="mb-12">
    <h1 class="font-h1 text-[40px] font-bold tracking-tight text-[#21201a] mb-6">Storage Overview</h1>
    <div class="bg-white border border-[#EDEDED] p-8 rounded-xl">
      <div class="flex justify-between items-end mb-4">
        <div>
          <span class="text-[30px] font-semibold text-[#21201a]">{{ usedGb }} GB</span>
          <span class="text-[14px] text-[#49473f] ml-2">of {{ totalGb }} GB used</span>
        </div>
        <span class="text-[12px] font-semibold tracking-widest text-[#0059ba]">{{ percentage }}% CAPACITY</span>
      </div>
      
      <!-- Progress Bar -->
      <div class="w-full h-2 bg-[#eeeeee] rounded-full overflow-hidden">
        <div class="h-full bg-[#0059ba] rounded-full" :style="{ width: `${percentage}%` }"></div>
      </div>
      
      <!-- Legends -->
      <div class="mt-6 flex gap-8">
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 bg-[#0059ba] rounded-full"></div>
          <span class="text-[14px] text-[#49473f]">Documents</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 bg-[#e2e2e2] rounded-full"></div>
          <span class="text-[14px] text-[#49473f]">Media</span>
        </div>
      </div>
    </div>
  </section>
</template>