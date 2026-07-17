<script setup>
import { useTypewriter } from '../composables/useTypewriter';

// Instanciamos el composable para el Título (80ms de velocidad, 200ms de retraso inicial)
const { displayText: titleText, isTyping: titleTyping } = useTypewriter('Homelab Server', 80, 200);

// Instanciamos el composable para el Párrafo (30ms de velocidad, empieza cuando casi termina el título)
const { displayText: descText, isTyping: descTyping } = useTypewriter(
  'Your personal local server ecosystem, simplified. Take back control of your data.', 
  30, 
  1500 
);
</script>

<template>
  <header class="w-full pt-40 pb-40 flex items-center">
    <div class="max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-between gap-12">
      
      <div class="md:w-1/2 text-left">
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full text-label-caps text-[10px] mb-6">
          <span class="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
          V2.0 RELEASED: THE LOCAL CLOUD
        </div>

        <h1 class="font-h1 text-4xl md:text-6xl leading-tight mb-6 text-primary flex items-center flex-wrap">
          <span>{{ titleText }}</span>
          <span v-if="titleTyping" class="inline-block w-4 h-[1em] ml-2 bg-primary animate-pulse"></span>
        </h1>

        <p class="font-body-md text-on-surface-variant text-lg mb-8 min-h-[56px]">
          {{ descText }}
          <span v-if="descTyping && !titleTyping" class="inline-block w-2 h-[1em] ml-1 bg-on-surface-variant animate-pulse relative top-1"></span>
        </p>

        <div class="flex gap-4">
          <RouterLink 
            to="/register" 
            class="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-neutral-800 transition-all-custom btn-scale"
          >
            Regístrate Ya
          </RouterLink>
          <a 
            href="#features" 
            class="px-6 py-3 bg-white text-black border border-surface-variant shadow-sm rounded-lg font-semibold hover:bg-gray-50 transition-all-custom btn-scale"
          >
            Explorar Features
          </a>
        </div>
      </div>

      <div class="md:w-1/2 flex justify-center">
        <img 
          src="@/assets/undraw_mcp-server_7kvc.svg" 
          alt="Server Illustration" 
          class="w-full max-w-lg md:max-w-2xl animate-digital-assemble"
          style="opacity: 0;" 
          loading="eager"
        />
      </div>

    </div>
  </header>
</template>