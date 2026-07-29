<script setup>
</script>

<template>
  <section class="mb-12">
    <div class="bg-white border border-[#EDEDED] p-8 rounded-xl relative">
      <div class="flex justify-between items-end mb-4">
        <div>
          <h3 class="text-[14px] font-bold text-[#21201a] mb-1">Global Storage Pool</h3>
          <span class="text-[30px] font-semibold text-[#21201a]">1.2 TB</span>
          <span class="text-[14px] text-[#49473f] ml-2">of 4.0 TB used</span>
        </div>
        <span class="text-[12px] font-semibold tracking-widest text-[#0059ba]">30% ALLOCATED</span>
      </div>
      
      <div class="w-full h-3 bg-[#eeeeee] rounded-full overflow-hidden flex">
        <div class="h-full bg-[#0059ba] transition-all duration-1000" style="width: 30%"></div>
      </div>
      <div class="mt-4 flex gap-4 text-[12px] text-[#49473f]">
        <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-[#0059ba]"></span> Used by users</span>
        <span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-[#eeeeee]"></span> Available</span>
      </div>
    </div>
  </section>
</template>