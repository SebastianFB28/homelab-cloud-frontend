<script setup>
// Aquí luego importaremos el store de Auth para mostrar el nombre e imagen real del usuario logueado en el SideNavBar. Por ahora, se muestra un nombre e imagen de ejemplo.
import { useAuthStore } from '@/features/auth/store/auth.js';
// const authStore = useAuthStore();
</script>

<template>
  <div class="font-body-md overflow-x-hidden bg-[#f9f9f9] text-[#1a1c1c] min-h-screen">
    <!-- SideNavBar -->
    <aside class="flex flex-col fixed left-0 top-0 h-full p-4 gap-4 bg-white border-r border-[#EDEDED] w-64 font-['Inter'] text-sm antialiased z-50">
      <div class="flex flex-col items-start px-2 py-2 mb-2">
        <img alt="Profile" class="w-10 h-10 rounded-full mb-3 object-cover border border-[#EDEDED]" src="https://ui-avatars.com/api/?name=Admin+User&background=random" />
        <h2 class="text-base font-bold text-[#37352F]">Alex Rivers</h2>
        <p class="text-[12px] text-[#37352F]/60">alex@cloud.home</p>
      </div>

      <nav class="flex flex-col gap-1">
        <RouterLink to="/dashboard" class="flex items-center gap-3 px-3 py-1.5 bg-[#F7F7F5] text-[#37352F] font-medium rounded-[4px] scale-100 active:scale-[0.98] transition-all">
          <span class="material-symbols-outlined text-[20px]">description</span>
          <span>Home</span>
        </RouterLink>
        <RouterLink to="/files" class="flex items-center gap-3 px-3 py-1.5 text-[#37352F]/60 hover:bg-[#F7F7F5]/50 rounded-[4px] scale-100 active:scale-[0.98] transition-all">
          <span class="material-symbols-outlined text-[20px]">folder</span>
          <span>Files</span>
        </RouterLink>
      </nav>

      <div class="h-[1px] bg-[#EDEDED] mx-2"></div>

      <nav class="flex flex-col gap-1">
        <RouterLink to="/settings" class="flex items-center gap-3 px-3 py-1.5 text-[#37352F]/60 hover:bg-[#F7F7F5]/50 rounded-[4px] scale-100 active:scale-[0.98] transition-all">
          <span class="material-symbols-outlined text-[20px]">settings</span>
          <span>Settings</span>
        </RouterLink>
      </nav>
    </aside>

    <!-- Main Content Area -->
    <main class="ml-64 min-h-screen">
      <!-- TopAppBar -->
      <header class="flex justify-between items-center px-8 h-14 bg-white/80 backdrop-blur-md border-b border-[#EDEDED] sticky top-0 z-40 font-['Inter'] text-sm tracking-tight">
        <div class="flex items-center gap-4 w-1/3">
          <div class="relative w-full max-w-sm">
            <span class="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-[#37352F]/40 text-[18px]">search</span>
            <input class="w-full bg-[#F7F7F5] border-none rounded-[4px] py-1.5 pl-9 pr-4 text-sm focus:ring-1 focus:ring-secondary/20 placeholder:text-[#37352F]/30" placeholder="Search files..." type="text" />
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button class="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#EDEDED] text-[#37352F] rounded-[4px] hover:bg-[#F7F7F5] transition-colors">
            <span class="material-symbols-outlined text-[18px]">create_new_folder</span>
            <span>New Folder</span>
          </button>
          <button class="flex items-center gap-2 px-3 py-1.5 bg-[#21201a] text-white rounded-[4px] hover:opacity-90 transition-opacity">
            <span class="material-symbols-outlined text-[18px]">upload</span>
            <span>Upload</span>
          </button>
        </div>
      </header>

      <!-- Aquí se inyecta el contenido de cada vista -->
      <slot />
    </main>
  </div>
</template>