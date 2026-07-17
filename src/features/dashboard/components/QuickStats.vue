<script setup>
defineProps({
  totalFiles: { type: Number, default: 124 },
  totalFolders: { type: Number, default: 18 },
  lastUpload: { type: String, default: '2h ago' }
});
</script>

<template>
  <section class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
    <div class="bg-white border border-[#EDEDED] p-4 rounded-lg hover:shadow-[0px_4px_20px_rgba(0,0,0,0.03)] transition-all">
      <div class="flex items-center gap-3 mb-2">
        <span class="material-symbols-outlined text-[#494740]">description</span>
        <span class="text-[12px] font-semibold tracking-widest text-[#49473f]">TOTAL FILES</span>
      </div>
      <div class="text-[22px] font-semibold text-[#21201a]">{{ totalFiles }}</div>
    </div>
    <div class="bg-white border border-[#EDEDED] p-4 rounded-lg hover:shadow-[0px_4px_20px_rgba(0,0,0,0.03)] transition-all">
      <div class="flex items-center gap-3 mb-2">
        <span class="material-symbols-outlined text-[#494740]">folder</span>
        <span class="text-[12px] font-semibold tracking-widest text-[#49473f]">FOLDERS</span>
      </div>
      <div class="text-[22px] font-semibold text-[#21201a]">{{ totalFolders }}</div>
    </div>
    <div class="bg-white border border-[#EDEDED] p-4 rounded-lg hover:shadow-[0px_4px_20px_rgba(0,0,0,0.03)] transition-all">
      <div class="flex items-center gap-3 mb-2">
        <span class="material-symbols-outlined text-[#494740]">schedule</span>
        <span class="text-[12px] font-semibold tracking-widest text-[#49473f]">LAST UPLOAD</span>
      </div>
      <div class="text-[22px] font-semibold text-[#21201a]">{{ lastUpload }}</div>
    </div>
  </section>
</template>