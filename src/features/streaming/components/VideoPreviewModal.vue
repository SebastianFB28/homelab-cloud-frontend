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
  if (!newUrl && videoRef.value) videoRef.value.pause();
});

onUnmounted(() => videoRef.value?.pause());
</script>

<template>
  <div class="fixed inset-0 z-[200] flex flex-col bg-[#202124]/95 backdrop-blur-sm">
    <!-- Barra superior estilo Drive -->
    <header class="flex h-16 shrink-0 items-center gap-3 px-4 text-white">
      <button
        type="button"
        aria-label="Cerrar vista previa"
        @click="emit('close')"
        class="inline-flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/10"
      >
        <span class="material-symbols-outlined text-[22px]">close</span>
      </button>
      <span class="material-symbols-outlined text-red-400">movie</span>
      <h2 class="truncate text-base font-medium">{{ title }}</h2>
    </header>

    <!-- Área del video: click fuera del video cierra -->
    <main class="flex min-h-0 flex-1 items-center justify-center px-4 pb-4" @click.self="emit('close')">
      <div v-if="props.loading" class="flex items-center text-white/80">
        <span class="material-symbols-outlined animate-spin text-4xl">sync</span>
        <span class="ml-3 text-lg">Cargando video…</span>
      </div>

      <div v-else-if="props.error" class="flex flex-col items-center text-center text-red-300">
        <span class="material-symbols-outlined text-5xl">error</span>
        <p class="mt-3">{{ props.error }}</p>
      </div>

      <video
        v-else
        ref="videoRef"
        :key="props.videoUrl"
        :src="props.videoUrl"
        class="max-h-[calc(100vh-80px)] max-w-full rounded-md bg-black shadow-2xl outline-none"
        controls
        playsinline
        preload="metadata"
        @loadedmetadata="emit('loaded')"
        @error="emit('video-error')"
      >
        Tu navegador no soporta reproducción de video.
      </video>
    </main>
  </div>
</template>