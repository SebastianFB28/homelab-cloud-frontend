<template>
  <div class="fixed inset-0 z-50 bg-[#f9f9f9] font-body-md text-on-background m-0 p-0 antialiased overflow-hidden">
    <div class="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#f9f9f9]/80 backdrop-blur-sm pointer-events-none">
      <div class="flex flex-col items-center space-y-4">
        <span class="material-symbols-outlined text-black text-4xl mb-2 skeleton-pulse">dns</span>
        <p class="text-black font-medium tracking-tight skeleton-pulse">Preparing your workspace...</p>
      </div>
    </div>

    <div class="flex h-screen w-full opacity-60">
      <aside class="hidden md:flex flex-col h-full w-64 p-4 space-y-2 bg-[#F7F7F5] border-r border-neutral-200">
        <div class="flex items-center space-x-3 px-3 py-4 mb-4">
          <div class="w-6 h-6 bg-neutral-200 rounded-lg animate-pulse"></div>
          <div class="space-y-1">
            <div class="w-24 h-3 bg-neutral-300 rounded-full animate-pulse"></div>
            <div class="w-12 h-2 bg-neutral-200 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div class="space-y-4">
          <div class="flex items-center space-x-3 px-3 py-2 bg-white rounded-md border border-neutral-200 shadow-sm animate-pulse">
            <div class="w-5 h-5 bg-neutral-200 rounded"></div>
            <div class="w-20 h-3 bg-neutral-200 rounded"></div>
          </div>
          <div class="flex items-center space-x-3 px-3 py-2 animate-pulse" v-for="i in 4" :key="i">
            <div class="w-5 h-5 bg-neutral-200 rounded"></div>
            <div class="w-24 h-3 bg-neutral-200 rounded"></div>
          </div>
        </div>
      </aside>

      <main class="flex-1 flex flex-col overflow-hidden">
        <header class="h-14 flex items-center justify-between px-6 w-full border-b border-neutral-100 bg-white sticky top-0 z-40">
          <div class="w-32 h-4 bg-neutral-200 rounded-full animate-pulse"></div>
          <div class="flex items-center space-x-4">
            <div class="w-8 h-8 bg-neutral-300 rounded-full animate-pulse"></div>
          </div>
        </header>

        <div class="flex-1 overflow-y-auto p-8">
          <div class="max-w-[1100px] mx-auto space-y-8">
            <div class="space-y-4 pb-4">
              <div class="w-64 h-10 bg-neutral-200 rounded-lg animate-pulse"></div>
              <div class="w-full max-w-lg h-4 bg-neutral-100 rounded-full animate-pulse"></div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="md:col-span-2 bg-white border border-[#EDEDED] p-8 space-y-4 rounded-lg">
                <div class="w-40 h-6 bg-neutral-200 rounded animate-pulse"></div>
                <div class="w-full h-32 bg-neutral-50 rounded-lg animate-pulse"></div>
              </div>
              <div class="bg-white border border-[#EDEDED] p-8 space-y-4 rounded-lg">
                <div class="w-24 h-6 bg-neutral-200 rounded animate-pulse"></div>
                <div class="space-y-4 pt-2">
                  <div class="flex items-center space-x-2" v-for="i in 3" :key="'list-'+i">
                    <div class="w-8 h-8 bg-neutral-100 rounded-full animate-pulse"></div>
                    <div class="w-20 h-3 bg-neutral-100 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.skeleton-pulse {
  animation: pulse-custom 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse-custom {
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
}
</style>