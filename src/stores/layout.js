import { defineStore } from 'pinia';

export const useLayoutStore = defineStore('layout', {
  // State: Data managed by the store
  state: () => ({
    isLoading_data: false,
    isError_data: false,
  }),

  // Getters: Computed properties based on state
  getters: {
    isLoading: (state) => state.isLoading_data,
    isError: (state) => state.isError_data,
  },

  // Actions: Methods to modify the state (can be async)
  actions: {
    setLoading(isLoading) {
      this.isLoading_data = isLoading;
    },
    setError(isError) {
      this.isError_data = isError;
    },
  },
});
