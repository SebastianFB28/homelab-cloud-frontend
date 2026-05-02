<script setup>
import AppHeader from '@/components/shared/AppHeader.vue';
import AppFooter from '@/components/shared/AppFooter.vue';
import LandingHero from '../components/LandingHero.vue';
import TechMarquee from '../components/TechMarquee.vue';
import FeaturesGrid from '../components/FeaturesGrid.vue';
import SystemDashboard from '../components/SystemDashboard.vue';
</script>

<template>
  <div class="bg-surface-container-lowest text-primary min-h-screen flex flex-col">
    <AppHeader />
    
    <main class="flex-grow">
      <LandingHero />
      <TechMarquee />
      <FeaturesGrid />
      <SystemDashboard />
    </main>

    <AppFooter />
  </div>
</template>