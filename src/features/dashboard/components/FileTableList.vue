<script setup>
defineProps({
  files: {
    type: Array,
    default: () => [
      { id: 1, name: 'Presentation.pdf', modified: '2h ago', size: '4.2 MB', icon: 'picture_as_pdf', color: 'text-red-600' },
      { id: 2, name: 'Dashboard_Mockup.png', modified: '5h ago', size: '1.8 MB', icon: 'image', color: 'text-blue-600' },
      { id: 3, name: 'Product_Demo.mp4', modified: '2 days ago', size: '45 MB', icon: 'movie', color: 'text-yellow-500' }
    ]
  }
});
</script>

<template>
  <section>
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-[22px] font-semibold text-[#21201a]">Recent Documents</h3>
    </div>
    
    <div class="bg-white border border-[#EDEDED] rounded-lg overflow-hidden">
      <div class="grid grid-cols-12 px-6 py-3 border-b border-[#EDEDED] text-[12px] font-semibold tracking-widest text-[#49473f]">
        <div class="col-span-6">NAME</div>
        <div class="col-span-3">MODIFIED</div>
        <div class="col-span-2">SIZE</div>
        <div class="col-span-1 text-right">ACTION</div>
      </div>
      
      <div class="divide-y divide-[#EDEDED]">
        <!-- Renderizado dinámico con v-for -->
        <div v-for="file in files" :key="file.id" class="grid grid-cols-12 px-6 py-3 items-center hover:bg-[#F7F7F5] transition-colors cursor-pointer group">
          <div class="col-span-6 flex items-center gap-3">
            <span class="material-symbols-outlined" :class="file.color">{{ file.icon }}</span>
            <span class="text-[14px] font-medium text-[#21201a]">{{ file.name }}</span>
          </div>
          <div class="col-span-3 text-[14px] text-[#49473f]">{{ file.modified }}</div>
          <div class="col-span-2 text-[14px] text-[#49473f]">{{ file.size }}</div>
          <div class="col-span-1 text-right">
            <span class="material-symbols-outlined text-[18px] text-[#37352F]/30 group-hover:text-[#21201a] transition-colors">more_horiz</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>