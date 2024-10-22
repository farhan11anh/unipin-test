import { $api } from '@/utils/api';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  // State: Data managed by the store
  state: () => ({
    accessToken_data: localStorage?.getItem('accessToken') || null,
    refreshToken_data: localStorage?.getItem('refreshToken') || '1',
  }),

  // Getters: Computed properties based on state
  getters: {
    accessToken: (state) => state.accessToken_data,
    refreshToken: (state) => state.refreshToken_data,
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

          localStorage.setItem('accessToken', response?.data?.responseData?.accessToken);
          localStorage.setItem('refreshToken', response?.data?.responseData?.refreshToken);
        })
        .catch((error) => {
          console.log(error, 'error get token at authStore');
        });
    },

    async getAccessTokenByRefreshToken() {
      await $api.post('/refresh/token', {
        "token" : this.refreshToken
    })
        .then((response) => {
          console.log(response?.data?.responseData?.accessToken, 'refresh token at authStore');
          localStorage.setItem('accessToken', response?.data?.responseData?.accessToken);
          this.accessToken_data = response?.data?.responseData?.accessToken;
        })
        .catch((error) => {
          console.log(error, 'error refresh token at authStore');
        });
    },
  },
});
