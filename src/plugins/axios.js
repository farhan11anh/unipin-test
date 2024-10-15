// src/plugins/axios.js
import axios from 'axios';

export default {
  install(app) {
    const axiosInstance = axios.create({
      baseURL: 'https://api.example.com', // Ganti dengan URL API-mu
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Tambahkan interceptor request
    axiosInstance.interceptors.request.use(
      (config) => {
        // Contoh: menambahkan auth token ke header request
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        // Jika terjadi error saat mengirim request
        return Promise.reject(error);
      }
    );

    // Tambahkan interceptor response
    axiosInstance.interceptors.response.use(
      (response) => {
        // Jika respon berhasil, langsung return respon
        return response;
      },
      (error) => {
        // Contoh: menangani error 401 (unauthorized)
        if (error.response && error.response.status === 401) {
          // Lakukan sesuatu, misalnya redirect ke halaman login
          console.error('Unauthorized! Redirecting to login.');
        }
        return Promise.reject(error);
      }
    );

    // Tambahkan Axios ke globalProperties agar dapat diakses di seluruh aplikasi
    app.config.globalProperties.$axios = axiosInstance;
  },
};
