<template>
  <section id="dashboard" class="bg-gray-50 py-32 border-y border-gray-200">
    <div class="max-w-7xl mx-auto px-6">
      
      <div v-reveal class="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 reveal">
        <div class="max-w-xl">
          <h2 class="text-4xl md:text-5xl font-extrabold text-black tracking-tight mb-4">Real-time Visibility</h2>
          <p class="text-lg text-gray-600">Monitor your entire ecosystem through a unified lens. Transparency across every byte and cycle.</p>
        </div>
        <div class="flex gap-2">
          <span class="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-sm border border-green-200 tracking-wider">SYSTEM ONLINE</span>
        </div>
      </div>
      
      <div v-reveal class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 reveal">
        
        <div class="bg-white p-6 border border-gray-200 rounded-xl shadow-sm hover-lift transition-all-custom">
          <div class="flex justify-between items-start mb-4">
            <span class="font-bold text-[11px] text-gray-500 uppercase tracking-wider">CPU Performance</span>
            <span class="material-symbols-outlined text-gray-400 text-sm" data-icon="memory">memory</span>
          </div>
          <div class="text-2xl font-extrabold text-black mb-1">Ryzen 9</div>
          <div class="text-sm text-gray-500 font-semibold mb-6">12% Load</div>
          <div class="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div class="h-full bg-black w-[12%]"></div>
          </div>
        </div>

        <div class="bg-white p-6 border border-gray-200 rounded-xl shadow-sm hover-lift transition-all-custom">
          <div class="flex justify-between items-start mb-4">
            <span class="font-bold text-[11px] text-gray-500 uppercase tracking-wider">Memory Usage</span>
            <span class="material-symbols-outlined text-gray-400 text-sm" data-icon="developer_board">developer_board</span>
          </div>
          <div class="text-2xl font-extrabold text-black mb-1">64GB DDR4</div>
          <div class="text-sm text-gray-500 font-semibold mb-6">24GB Used</div>
          <div class="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div class="h-full bg-black w-[37.5%]"></div>
          </div>
        </div>

        <div class="bg-white p-6 border border-gray-200 rounded-xl shadow-sm hover-lift transition-all-custom">
          <div class="flex justify-between items-start mb-4">
            <span class="font-bold text-[11px] text-gray-500 uppercase tracking-wider">ZFS Pool</span>
            <span class="material-symbols-outlined text-gray-400 text-sm" data-icon="database">database</span>
          </div>
          <div class="text-2xl font-extrabold text-black mb-1">12TB ZFS</div>
          <div class="text-sm text-gray-500 font-semibold mb-6">45% Free</div>
          <div class="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div class="h-full bg-black w-[55%]"></div>
          </div>
        </div>

        <div class="bg-white p-6 border border-gray-200 rounded-xl shadow-sm hover-lift transition-all-custom">
          <div class="flex justify-between items-start mb-4">
            <span class="font-bold text-[11px] text-gray-500 uppercase tracking-wider">Docker Status</span>
            <span class="material-symbols-outlined text-gray-400 text-sm" data-icon="view_agenda">view_agenda</span>
          </div>
          <div class="text-2xl font-extrabold text-black mb-1">18 Containers</div>
          <div class="text-sm text-gray-500 font-semibold mb-6">Running Stable</div>
          <div class="flex gap-1">
            <div class="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            <div class="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            <div class="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            <div class="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            <div class="w-1.5 h-1.5 rounded-full bg-green-500"></div>
          </div>
        </div>

      </div>

      <div v-reveal class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 reveal">
        
        <div class="md:col-span-2 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row">
          <div class="p-8 flex flex-col justify-between md:w-1/2">
            <div>
              <h4 class="text-2xl font-bold text-black mb-2">Network Topology</h4>
              <p class="text-sm text-gray-600 leading-relaxed">Real-time map of traffic flowing through your Nginx reverse proxy.</p>
            </div>
            <div class="mt-8">
              <button class="text-sm font-bold flex items-center gap-1 text-black hover:gap-2 transition-all">
                OPEN MAP <span class="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
              </button>
            </div>
          </div>
          <div class="bg-gray-100 md:w-1/2 min-h-[200px] relative">
            <img class="absolute inset-0 w-full h-full object-cover grayscale opacity-50 contrast-125 mix-blend-multiply" data-alt="Server Rack" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJCSKb0boHj4Q33ap_Qs-ZEA_Y5vADsvqg3XmyUhhbsmw3Pj02a2CfFFqkDcZKyHDn8eNHkOHy_yiYVUo40vYkAMJ78GpJ0efkES_hTMrJs2jhxeTYy47eWxFEKpqpVcUOC7ofb6nDIrWmYT6HrSe7uapase7pPQGsTw3c8MCCooFb_sVchadsKb9UTz5R-KsixzdREp4R4tkaBMUje27sb_YpqJjDxd7TQ0Y7UgpTWCW-b7DwNSLSl6r8-q8hxds-9gzu_nh3UcSy"/>
          </div>
        </div>

        <div class="bg-black text-white p-8 rounded-xl flex flex-col justify-between">
          <span class="material-symbols-outlined text-4xl mb-6" data-icon="terminal">terminal</span>
          <div>
            <div class="text-2xl font-bold mb-2">CLI First</div>
            <p class="text-gray-400 text-sm leading-relaxed">Every action available via our unified command line tool. Native SSH integration.</p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>