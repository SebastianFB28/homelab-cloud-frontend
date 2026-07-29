<script setup>
// Mocks para la tabla
const mockUsers = [
  { id: 1, email: 'admin@homelab.local', status: 'APPROVED', date: '2023-01-10', storage: '50 GB' },
  { id: 2, email: 'carlos.dev@example.com', status: 'PENDING', date: '2023-10-24', storage: '0 GB' },
  { id: 3, email: 'maria.gomez@example.com', status: 'BANNED', date: '2023-05-15', storage: '120 GB' },
];

const getStatusColor = (status) => {
  const map = {
    APPROVED: 'bg-green-100 text-green-700',
    PENDING: 'bg-orange-100 text-orange-700',
    REJECTED: 'bg-gray-200 text-gray-700',
    BANNED: 'bg-red-100 text-red-700',
    DELETED: 'bg-gray-100 text-gray-400 line-through'
  };
  return map[status] || 'bg-gray-100 text-gray-700';
};
</script>

<template>
  <div class="bg-white border border-[#EDEDED] rounded-lg overflow-hidden">
    <div class="grid grid-cols-12 px-6 py-3 border-b border-[#EDEDED] text-[12px] font-semibold tracking-widest text-[#49473f]">
      <div class="col-span-5">USER EMAIL</div>
      <div class="col-span-2">STATUS</div>
      <div class="col-span-2">JOINED</div>
      <div class="col-span-2">STORAGE</div>
      <div class="col-span-1 text-right">ACTION</div>
    </div>
    
    <div class="divide-y divide-[#EDEDED]">
      <div v-for="user in mockUsers" :key="user.id" class="grid grid-cols-12 px-6 py-4 items-center hover:bg-[#F7F7F5] transition-colors group">
        <div class="col-span-5 flex items-center gap-3">
          <span class="material-symbols-outlined text-gray-400">person</span>
          <span class="text-[14px] font-medium text-[#21201a]">{{ user.email }}</span>
        </div>
        
        <div class="col-span-2">
          <span :class="getStatusColor(user.status)" class="px-2 py-1 rounded text-[10px] font-bold tracking-wide">
            {{ user.status }}
          </span>
        </div>
        
        <div class="col-span-2 text-[14px] text-[#49473f]">{{ user.date }}</div>
        <div class="col-span-2 text-[14px] text-[#49473f]">{{ user.storage }}</div>
        
        <div class="col-span-1 text-right">
          <button class="text-blue-600 hover:text-blue-800 text-[13px] font-medium">Edit</button>
        </div>
      </div>
    </div>
  </div>
</template>