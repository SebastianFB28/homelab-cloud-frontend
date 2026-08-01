<script setup>
import { watch, ref, onUnmounted } from 'vue';

const props = defineProps({
  videoUrl: { type: String, required: true },
  mimeType: { type: String, default: 'video/mp4' },
  title: { type: String, default: '' },
  loading: { type: Boolean, default: false },
  error: { type: String, default: '' }
});

const emit = defineEmits(['close', 'loaded', 'video-error']);
const videoRef = ref(null);

watch(() => props.videoUrl, (newUrl) => {
  if (!newUrl && videoRef.value) {
    videoRef.value.pause();
  }
});

onUnmounted(() => {
  if (videoRef.value) {
    videoRef.value.pause();
  }
});
</script>

<template>
  <div class="fixed inset-0 z-[200] flex items-center justify-center bg-[#21201a]/80 p-4 backdrop-blur-sm" @click.self="emit('close')">
    <section class="relative w-full max-w-[1300px] max-h-[calc(100vh-48px)] rounded-[28px] border border-[#e5e7eb] bg-white shadow-[0_35px_120px_rgba(0,0,0,0.15)] overflow-hidden">
      <button
        type="button"
        aria-label="Cerrar vista previa"
        @click="emit('close')"
        class="absolute right-5 top-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#1f2937] shadow-sm transition hover:bg-slate-100"
      >
        <span class="material-symbols-outlined text-[22px]">close</span>
      </button>

      <div class="border-b border-[#e5e7eb] px-8 py-6">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#2563eb]">Video preview</p>
            <h2 class="mt-3 text-2xl font-semibold text-[#111827] truncate">{{ title }}</h2>
          </div>
          <div class="text-sm text-[#6b7280]">Reproducción segura y en alta calidad.</div>
        </div>
      </div>

      <div class="p-8">
        <div v-if="props.loading" class="flex min-h-[420px] items-center justify-center rounded-[24px] border border-dashed border-[#d1d5db] bg-[#f8fafc] text-[#475569]">
          <span class="material-symbols-outlined animate-spin text-4xl">sync</span>
          <span class="ml-4 text-lg font-medium">Cargando video…</span>
        </div>

        <div v-else-if="props.error" class="rounded-[24px] border border-red-100 bg-red-50 p-12 text-center text-red-700">
          <span class="material-symbols-outlined text-5xl">error</span>
          <p class="mt-4 text-base">{{ props.error }}</p>
        </div>

        <div v-else class="overflow-hidden rounded-[24px] border border-[#d1d5db] bg-black">
          <video
            ref="videoRef"
            class="w-full h-[calc(100vh-280px)] bg-black"
            controls
            autoplay
            muted
            playsinline
            @loadedmetadata="emit('loaded')"
            @error="emit('video-error')"
            crossorigin="use-credentials"
          >
            <source :src="props.videoUrl" :type="props.mimeType || 'video/mp4'" />
            Tu navegador no soporta reproducción de video.
          </video>
        </div>
      </div>
    </section>
  </div>
</template>
