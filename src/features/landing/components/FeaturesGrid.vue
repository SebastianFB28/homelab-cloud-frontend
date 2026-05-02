<template>
  <section id="features" class="max-w-7xl mx-auto px-6 py-32">
    
    <div v-reveal class="text-center mb-20 reveal">
      <h2 class="text-4xl md:text-5xl font-extrabold text-black tracking-tight mb-4">
        Engineered for Sovereignty
      </h2>
      <p class="text-lg text-gray-600 max-w-xl mx-auto">
        Focus on your workloads, while we handle the orchestration layers of your private lab.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      <div v-reveal class="bg-white border border-gray-200 p-10 rounded-xl hover-lift transition-all-custom reveal">
        <div class="w-14 h-14 bg-gray-100 flex items-center justify-center rounded-xl mb-6">
          <span class="material-symbols-outlined text-black text-3xl" data-icon="encrypted">encrypted</span>
        </div>
        <h3 class="text-2xl font-bold text-black mb-3">Local First</h3>
        <p class="text-gray-600 leading-relaxed">
          Keep your data where it belongs. Zero-trust architecture designed for offline-capable, high-availability setups.
        </p>
      </div>

      <div v-reveal class="bg-white border border-gray-200 p-10 rounded-xl hover-lift transition-all-custom reveal">
        <div class="w-14 h-14 bg-gray-100 flex items-center justify-center rounded-xl mb-6">
          <span class="material-symbols-outlined text-black text-3xl" data-icon="extension">extension</span>
        </div>
        <h3 class="text-2xl font-bold text-black mb-3">Modular</h3>
        <p class="text-gray-600 leading-relaxed">
          Scale your stack as your needs grow. From a single Raspberry Pi to a multi-node enterprise cluster.
        </p>
      </div>

      <div v-reveal class="bg-white border border-gray-200 p-10 rounded-xl hover-lift transition-all-custom reveal">
        <div class="w-14 h-14 bg-gray-100 flex items-center justify-center rounded-xl mb-6">
          <span class="material-symbols-outlined text-black text-3xl" data-icon="auto_awesome">auto_awesome</span>
        </div>
        <h3 class="text-2xl font-bold text-black mb-3">Automated</h3>
        <p class="text-gray-600 leading-relaxed">
          Smooth workflows with minimal maintenance. Auto-updating containers and self-healing systems.
        </p>
      </div>

    </div>
  </section>
</template>