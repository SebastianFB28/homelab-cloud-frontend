<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { authService } from "../api/authService";

const router = useRouter();

// Estado del formulario
const nickname = ref("");
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const errorMessage = ref("");

const handleRegister = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  try {
    const userData = {
      nickname: nickname.value,
      email: email.value,
      password: password.value,
    };

    await authService.register(userData);
    // Si el registro es exitoso, lo mandamos al login o directo al dashboard
    router.push("/login");
  } catch (error) {
    errorMessage.value = "Error al crear la cuenta. Inténtalo de nuevo.";
    console.error("Register error:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <main
    class="min-h-screen flex flex-col items-center justify-center px-4 bg-[#f9f9f9] relative overflow-hidden"
  >
    <div class="w-full max-w-[400px] flex flex-col items-center z-10">
      <div class="mb-16 text-center">
        <div class="inline-flex items-center justify-center p-1 mb-4">
          <span class="material-symbols-outlined text-[48px] text-black"
            >dns</span
          >
        </div>
        <h1
          class="text-[40px] leading-[1.2] tracking-[-0.02em] font-bold text-black mb-1"
        >
          Create your account
        </h1>
        <p class="text-base text-gray-600">
          Start your personal cloud with Homelab Server
        </p>
      </div>

      <form @submit.prevent="handleRegister" class="w-full space-y-4">
        <div class="space-y-2">
          <label
            class="text-[12px] font-semibold text-gray-500 uppercase tracking-[0.05em] block ml-1"
            for="nickname"
            >Nickname</label
          >
          <input
            v-model="nickname"
            class="w-full px-4 py-4 border border-gray-200 rounded-lg bg-white focus:ring-1 focus:ring-black focus:border-black transition-all outline-none text-base"
            id="nickname"
            placeholder="Your name"
            type="text"
            required
          />
        </div>

        <div class="space-y-2">
          <label
            class="text-[12px] font-semibold text-gray-500 uppercase tracking-[0.05em] block ml-1"
            for="email"
            >Email</label
          >
          <input
            v-model="email"
            class="w-full px-4 py-4 border border-gray-200 rounded-lg bg-white focus:ring-1 focus:ring-black focus:border-black transition-all outline-none text-base"
            id="email"
            placeholder="name@example.com"
            type="email"
            required
          />
        </div>

        <div class="space-y-2">
          <label
            class="text-[12px] font-semibold text-gray-500 uppercase tracking-[0.05em] block ml-1"
            for="password"
            >Password</label
          >
          <input
            v-model="password"
            class="w-full px-4 py-4 border border-gray-200 rounded-lg bg-white focus:ring-1 focus:ring-black focus:border-black transition-all outline-none text-base"
            id="password"
            placeholder="Create a strong password"
            type="password"
            required
          />
        </div>

        <p v-if="errorMessage" class="text-red-600 text-sm mt-2">
          {{ errorMessage }}
        </p>

        <div class="pt-4">
          <button
            :disabled="isLoading"
            class="w-full bg-black text-white font-medium py-4 px-8 rounded-lg hover:opacity-90 active:scale-[0.98] transition-all flex justify-center items-center gap-2 disabled:bg-gray-400"
            type="submit"
          >
            {{ isLoading ? "Creating account..." : "Create account" }}
          </button>
        </div>
      </form>

      <div class="w-full mt-8">
        <div class="relative flex items-center justify-center mb-8">
          <div class="border-t border-gray-200 w-full"></div>
          <span
            class="bg-[#f9f9f9] px-4 text-[12px] font-semibold text-gray-500 uppercase tracking-[0.05em] absolute"
            >or continue with</span
          >
        </div>

        <div class="grid grid-cols-2 gap-4">
          <button
            class="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-4 hover:bg-gray-100 transition-colors text-sm font-semibold"
          >
            <span class="material-symbols-outlined text-[20px]">search</span>
            Google
          </button>
          <button
            class="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-4 hover:bg-gray-100 transition-colors text-sm font-semibold"
          >
            <span class="material-symbols-outlined text-[20px]">terminal</span>
            GitHub
          </button>
        </div>
      </div>

      <div class="mt-16 text-center">
        <p class="text-sm text-gray-500">
          Already have an account?
          <RouterLink
            to="/login"
            class="text-black font-semibold hover:underline transition-all"
            >Sign in</RouterLink
          >
        </p>
      </div>
    </div>

    <div
      class="fixed inset-0 -z-10 overflow-hidden pointer-events-none opacity-20"
    >
      <div
        class="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-gradient-to-br from-gray-300 to-transparent blur-[120px]"
      ></div>
      <div
        class="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-gradient-to-tl from-gray-200 to-transparent blur-[120px]"
      ></div>
    </div>
  </main>
</template>
