<script setup>
// Datos ficticios que luego vendrán de la API
const stats = {
  total: 145,
  approved: 120,
  pending: 12,
  banned: 5,
  rejected: 3,
  deleted: 5
};
</script>

<template>
  <section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
    <!-- Total -->
    <div class="bg-white border border-[#EDEDED] p-4 rounded-lg hover:shadow-sm transition-all">
      <div class="text-[11px] font-semibold tracking-widest text-[#49473f] mb-1">TOTAL USERS</div>
      <div class="text-[24px] font-bold text-[#21201a]">{{ stats.total }}</div>
    </div>
    
    <!-- Approved (Activos) -->
    <div class="bg-white border border-green-200 bg-green-50/30 p-4 rounded-lg hover:shadow-sm transition-all">
      <div class="text-[11px] font-semibold tracking-widest text-green-700 mb-1">APPROVED (ACTIVE)</div>
      <div class="text-[24px] font-bold text-green-800">{{ stats.approved }}</div>
    </div>

    <!-- Pending -->
    <div class="bg-white border border-orange-200 bg-orange-50/30 p-4 rounded-lg hover:shadow-sm transition-all relative overflow-hidden">
      <div class="text-[11px] font-semibold tracking-widest text-orange-700 mb-1">PENDING</div>
      <div class="text-[24px] font-bold text-orange-800">{{ stats.pending }}</div>
      <div v-if="stats.pending > 0" class="absolute top-0 right-0 w-1.5 h-full bg-orange-500"></div>
    </div>

    <!-- Banned -->
    <div class="bg-white border border-red-200 bg-red-50/30 p-4 rounded-lg hover:shadow-sm transition-all">
      <div class="text-[11px] font-semibold tracking-widest text-red-700 mb-1">BANNED</div>
      <div class="text-[24px] font-bold text-red-800">{{ stats.banned }}</div>
    </div>

    <!-- Rejected -->
    <div class="bg-white border border-gray-300 p-4 rounded-lg hover:shadow-sm transition-all">
      <div class="text-[11px] font-semibold tracking-widest text-gray-600 mb-1">REJECTED</div>
      <div class="text-[24px] font-bold text-gray-800">{{ stats.rejected }}</div>
    </div>

    <!-- Deleted -->
    <div class="bg-white border border-gray-200 p-4 rounded-lg hover:shadow-sm transition-all opacity-60">
      <div class="text-[11px] font-semibold tracking-widest text-gray-500 mb-1">DELETED</div>
      <div class="text-[24px] font-bold text-gray-700">{{ stats.deleted }}</div>
    </div>
  </section>
</template>