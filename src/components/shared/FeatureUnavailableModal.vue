<script setup>
import working from '@/assets/working.svg';

defineProps({
  feature: { type: String, default: 'Esta función' }
});

const emit = defineEmits(['close']);
</script>

<template>
  <div class="fixed inset-0 z-[200] flex items-center justify-center bg-[#21201a]/35 p-4 backdrop-blur-sm" @click.self="emit('close')">
    <section role="dialog" aria-modal="true" aria-labelledby="feature-unavailable-title" class="relative w-full max-w-md overflow-hidden rounded-2xl bg-white px-7 py-8 text-center shadow-2xl">
      <button type="button" aria-label="Cerrar" @click="emit('close')" class="absolute right-4 top-4 rounded-full p-1 text-[#49473f] transition-colors hover:bg-[#f3f3f4]">
        <span class="material-symbols-outlined text-[20px]">close</span>
      </button>

      <img :src="working" alt="Función en desarrollo" class="mx-auto h-36 w-36 object-contain" />
      <span class="material-symbols-outlined mt-2 text-[26px] text-[#0059ba]">construction</span>
      <h2 id="feature-unavailable-title" class="mt-3 text-2xl font-bold tracking-tight text-[#21201a]">Estamos trabajando en ello</h2>
      <p class="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#49473f]">
        {{ feature }} todavía no está disponible. Estamos preparando esta funcionalidad para ti.
      </p>
      <button type="button" @click="emit('close')" class="mt-6 rounded-lg bg-[#21201a] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90">
        Entendido
      </button>

      <div class="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]">
        <div class="absolute -bottom-24 -left-24 h-56 w-56 rounded-full border border-[#7a776e]"></div>
        <div class="absolute -right-24 -top-24 h-56 w-56 rounded-full border border-[#7a776e]"></div>
      </div>
    </section>
  </div>
</template>
