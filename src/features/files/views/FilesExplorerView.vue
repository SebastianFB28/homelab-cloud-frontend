<script setup>
import DashboardLayout from '@/components/layout/DashboardLayout.vue';
// Reutilizamos el componente que ya creamos y que ya está conectado a Pinia
import FileTableList from '@/features/dashboard/components/FileTableList.vue';
</script>

<template>
  <DashboardLayout>
    <div class="h-full px-8 py-8">
      <div class="max-w-[1200px] mx-auto">
        <h1 class="font-h1 text-[32px] font-bold tracking-tight text-[#21201a] mb-2">My Drive</h1>
        <p class="text-[14px] text-[#49473f] mb-8">Manage and organize all your home lab files.</p>
        
        <!-- ¡Aquí inyectamos nuestra tabla inteligente! -->
        <FileTableList />
      </div>
    </div>
  </DashboardLayout>
</template>