<script setup>
// 1. Imports directos de los SVGs (Nombres exactos de la terminal)
import archlinuxIcon from '@/assets/icons/archlinux.svg';
import debianIcon from '@/assets/icons/debian.svg';
import dockerIcon from '@/assets/icons/docker.svg';
import gitIcon from '@/assets/icons/git.svg';
import githubIcon from '@/assets/icons/github.svg';
import javascriptIcon from '@/assets/icons/javascript.svg';
import kubernetesIcon from '@/assets/icons/kubernetes.svg';
import nginxIcon from '@/assets/icons/nginx.svg';
import nodejsIcon from '@/assets/icons/nodedotjs.svg';
import openjdkIcon from '@/assets/icons/openjdk.svg';
import openHardwareIcon from '@/assets/icons/opensourcehardware.svg';
import proxmoxIcon from '@/assets/icons/proxmox.svg';
import pythonIcon from '@/assets/icons/python.svg';
import truenasIcon from '@/assets/icons/truenas.svg';
import ubuntuIcon from '@/assets/icons/ubuntu.svg';
import vuejsIcon from '@/assets/icons/vuedotjs.svg';

// 2. Lista para el Marquee
const techStack = [
  { name: 'ARCH LINUX', icon: archlinuxIcon },
  { name: 'DEBIAN', icon: debianIcon },
  { name: 'DOCKER', icon: dockerIcon },
  { name: 'GIT', icon: gitIcon },
  { name: 'GITHUB', icon: githubIcon },
  { name: 'JAVASCRIPT', icon: javascriptIcon },
  { name: 'KUBERNETES', icon: kubernetesIcon },
  { name: 'NGINX', icon: nginxIcon },
  { name: 'NODE.JS', icon: nodejsIcon },
  { name: 'OPENJDK', icon: openjdkIcon },
  { name: 'OPEN HARDWARE', icon: openHardwareIcon },
  { name: 'PROXMOX', icon: proxmoxIcon },
  { name: 'PYTHON', icon: pythonIcon },
  { name: 'TRUENAS', icon: truenasIcon },
  { name: 'UBUNTU', icon: ubuntuIcon },
  { name: 'VUE.JS', icon: vuejsIcon }
];
</script>

<template>
  <section class="py-12 border-y border-surface-variant bg-white overflow-hidden">
    <div class="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused]">
      
      <div class="flex gap-24 items-center px-8">
        <span 
          v-for="(tech, index) in techStack" 
          :key="`first-${index}`" 
          class="flex items-center gap-3 text-label-caps text-black font-bold transition-transform hover:scale-110"
        >
          <img :src="tech.icon" :alt="tech.name" class="w-7 h-7 object-contain" />
          {{ tech.name }}
        </span>
      </div>

      <div class="flex gap-24 items-center px-8">
        <span 
          v-for="(tech, index) in techStack" 
          :key="`second-${index}`" 
          class="flex items-center gap-3 text-label-caps text-black font-bold transition-transform hover:scale-110"
        >
          <img :src="tech.icon" :alt="tech.name" class="w-7 h-7 object-contain" />
          {{ tech.name }}
        </span>
      </div>

    </div>
  </section>
</template>