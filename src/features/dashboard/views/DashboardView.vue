<script setup>
import { useAuthStore } from '@/features/auth/store/auth.js';
import DashboardLayout from '@/components/layout/DashboardLayout.vue';
import StorageOverview from '../components/StorageOverview.vue';
import QuickStats from '../components/QuickStats.vue';
import FileTableList from '../components/FileTableList.vue';
const authStore = useAuthStore();
</script>

<template>
  <DashboardLayout>
    <div class="max-w-[1100px] mx-auto py-12 px-8">
      <StorageOverview />
      <QuickStats />
      
      <!-- Componente Tip/Callout directo en la vista ya que es estático por ahora -->
      <section class="mb-12 mt-12">
        <div class="bg-[#f3f3f4] border border-[#EDEDED] p-6 rounded-lg flex gap-4 items-start">
          <span class="material-symbols-outlined text-[#0059ba]">lightbulb</span>
          <div>
            <p class="text-[14px] font-medium text-[#21201a]">Tip: Use tags to organize your home lab</p>
            <p class="text-[14px] text-[#49473f] mt-1">You can add custom labels to any folder to make them easier to filter.</p>
          </div>
        </div>
      </section>

        <code class="bg-gray-200 px-4 py-2 rounded text-sm break-all max-w-lg text-center">
          Token JWT: {{ authStore.accessToken?.substring(0, 40) }}...
        </code>

      <FileTableList />
    </div>
  </DashboardLayout>
</template>

