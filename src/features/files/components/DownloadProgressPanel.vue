<script setup>
defineProps({
  downloads: {
    type: Array,
    default: () => []
  }
});

defineEmits(['cancel', 'remove']);
</script>

<template>
  <div
    v-if="downloads.length"
    class="fixed bottom-5 right-5 z-[110] flex w-[min(24rem,calc(100vw-2.5rem))] flex-col gap-3"
    aria-live="polite"
    aria-label="Estado de las descargas"
  >
    <article v-for="download in downloads" :key="download.id" class="rounded-xl border border-[#EDEDED] bg-white p-4 shadow-lg">
      <div class="flex items-start gap-3">
        <span class="material-symbols-outlined mt-0.5 text-[24px]" :class="download.status === 'error' ? 'text-red-600' : download.status === 'completed' ? 'text-green-600' : 'text-[#0059ba]'">
          {{ download.icon }}
        </span>
        <div class="min-w-0 flex-1">
          <div class="flex items-start justify-between gap-3">
            <p class="truncate text-sm font-medium text-[#21201a]" :title="download.name">{{ download.name }}</p>
            <button v-if="download.status === 'downloading'" type="button" @click="$emit('cancel', download.id)" class="-mr-1 -mt-1 rounded px-2 py-1 text-xs font-medium text-[#0059ba] hover:bg-blue-50" aria-label="Cancelar descarga">
              Cancelar
            </button>
            <button v-else type="button" @click="$emit('remove', download.id)" class="-mr-1 -mt-1 rounded p-1 text-[#49473f] hover:bg-gray-100" aria-label="Cerrar estado de descarga">
              <span class="material-symbols-outlined block text-[18px]">close</span>
            </button>
          </div>
          <p class="mt-1 text-xs" :class="download.status === 'error' ? 'text-red-600' : 'text-[#49473f]'">
            {{ download.status === 'downloading' ? (download.progress === null ? 'Descargando…' : `Descargando… ${download.progress}%`) : download.status === 'completed' ? 'Descarga completada' : download.status === 'cancelled' ? 'Descarga cancelada' : download.error }}
          </p>
          <div v-if="download.status === 'downloading' || download.status === 'completed'" class="mt-3 h-1.5 overflow-hidden rounded-full bg-[#EDEDED]">
            <div
              class="h-full rounded-full transition-[width] duration-200"
              :class="download.status === 'completed' ? 'bg-green-600' : 'bg-[#0059ba]'"
              :style="{ width: `${download.progress ?? 0}%` }"
            ></div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>
