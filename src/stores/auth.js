import { $api } from '@/utils/api';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  // State: Data managed by the store
  state: () => ({
    accessToken_data: localStorage?.getItem('access_token') || null,
  }),

  // Getters: Computed properties based on state
  getters: {
    accessToken: (state) => state.accessToken_data,
  },

  // Actions: Methods to modify the state (can be async)
  actions: {
    async getAcessToken(ott) {
      await $api.post('/webview', {
        "oneTimeToken" : ott
    })
        .then((response) => {
          this.details_data = response?.data?.responseData?.accessToken
          console.log(response);

          localStorage.setItem('access_token', response?.data?.responseData?.accessToken)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
});
