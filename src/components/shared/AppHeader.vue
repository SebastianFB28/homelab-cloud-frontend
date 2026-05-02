<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

// Variable reactiva para saber en qué sección estamos
const activeSection = ref('');

// Variable reactiva para controlar el estado del menú móvil
const isMobileMenuOpen = ref(false);

// Funciones para abrir/cerrar el menú
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

onMounted(() => {
  // Configuramos el observador
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id;
      }
    });
  }, { threshold: 0.5 });

  // Buscamos todas las secciones
  document.querySelectorAll('section[id]').forEach((section) => {
    observer.observe(section);
  });
});
</script>

<template>
  <nav class="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-surface-variant">
    <div class="flex justify-between items-center max-w-7xl mx-auto px-6 h-16">
      
      <RouterLink to="/" class="text-lg font-bold text-primary flex items-center gap-2" @click="closeMobileMenu">
        <span class="material-symbols-outlined text-primary" data-icon="dns">dns</span>
        Homelab Server
      </RouterLink>

      <div class="hidden md:flex gap-8 items-center font-label-caps text-sm tracking-tight">
        <a 
          href="#features"
          class="transition-all-custom pb-1"
          :class="activeSection === 'features' ? 'text-black font-bold border-b-2 border-black' : 'text-on-surface-variant hover:text-black'"
        >
          Features
        </a>
        <a 
          href="#dashboard"
          class="transition-all-custom pb-1"
          :class="activeSection === 'dashboard' ? 'text-black font-bold border-b-2 border-black' : 'text-on-surface-variant hover:text-black'"
        >
          Dashboard
        </a>
        <a 
          href="#contacto"
          class="transition-all-custom pb-1"
          :class="activeSection === 'contacto' ? 'text-black font-bold border-b-2 border-black' : 'text-on-surface-variant hover:text-black'"
        >
          Contacto
        </a>
      </div>

      <div class="flex items-center gap-4">
        <RouterLink to="/login" class="hidden md:block px-5 py-2 bg-black text-white rounded-lg text-body-sm font-semibold hover:bg-neutral-800 transition-all-custom btn-scale">
          Iniciar Sesión
        </RouterLink>

        <button @click="toggleMobileMenu" class="md:hidden p-2 text-black focus:outline-none flex items-center justify-center">
          <span class="material-symbols-outlined text-3xl">
            {{ isMobileMenuOpen ? 'close' : 'menu' }}
          </span>
        </button>
      </div>
      
    </div>

    <div 
      v-show="isMobileMenuOpen" 
      class="md:hidden absolute top-16 left-0 w-full bg-white border-b border-surface-variant shadow-xl flex flex-col py-6 px-6 gap-6"
    >
      <a 
        href="#features" 
        @click="closeMobileMenu"
        class="text-lg transition-colors"
        :class="activeSection === 'features' ? 'text-black font-bold' : 'text-gray-600'"
      >
        Features
      </a>
      <a 
        href="#dashboard" 
        @click="closeMobileMenu"
        class="text-lg transition-colors"
        :class="activeSection === 'dashboard' ? 'text-black font-bold' : 'text-gray-600'"
      >
        Dashboard
      </a>
      <a 
        href="#contacto" 
        @click="closeMobileMenu"
        class="text-lg transition-colors"
        :class="activeSection === 'contacto' ? 'text-black font-bold' : 'text-gray-600'"
      >
        Contacto
      </a>
      
      <hr class="border-gray-200" />
      
      <RouterLink 
        to="/login" 
        @click="closeMobileMenu"
        class="w-full text-center py-3 bg-black text-white rounded-lg font-semibold hover:bg-neutral-800 transition-all-custom"
      >
        Iniciar Sesión
      </RouterLink>
    </div>
  </nav>
</template>