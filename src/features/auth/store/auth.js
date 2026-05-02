import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    accessToken: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },
  actions: {
    setToken(token) {
      this.accessToken = token;
    },
    setUser(userData) {
      this.user = userData;
    },
    logout() {
      this.accessToken = null;
      this.user = null;
    }
  }
});