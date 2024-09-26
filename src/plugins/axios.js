// src/plugins/axios.js
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api', // Your API base URL
  timeout: 10000, // Timeout limit (in milliseconds)
  headers: {
    'Content-Type': 'application/json'
  }
})

// Setup request interceptors (optional)
axiosInstance.interceptors.request.use(
  (config) => {
    // Add Authorization token or other configurations here
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Setup response interceptors (optional)
axiosInstance.interceptors.response.use(
  (response) => {
    // Process response data
    return response
  },
  (error) => {
    // Handle errors globally
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, maybe redirect to login
    }
    return Promise.reject(error)
  }
)

export default {
  install(app) {
    console.log('Axios plugin registered') // Debugging log
    app.config.globalProperties.$axios = axiosInstance
    app.provide('axios', axiosInstance)
  }
}
