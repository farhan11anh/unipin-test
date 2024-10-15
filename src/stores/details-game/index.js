import { $api } from '@/utils/api';
import { defineStore } from 'pinia';

export const useDetailsGameStore = defineStore('details-game', {
  // State: Data managed by the store
  state: () => ({
    details_data: null,
  }),

  // Getters: Computed properties based on state
  getters: {
    details: (state) => state.details_data,
  },

  // Actions: Methods to modify the state (can be async)
  actions: {
    async getData(gameCode) {
      await $api.post('/unipin/game/detail', {
        gameCode,
      })
        .then((response) => {
          console.log(response);

          this.details_data = response.data.responseData;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
});
