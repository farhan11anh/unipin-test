import axios from "axios";
// import CryptoJS from 'crypto-js';
import { useLayoutStore } from "@/stores/layout";
import { useAuthStore } from "@/stores/auth";

const layoutStore = useLayoutStore();
const authStore = useAuthStore();

export const $api = axios.create({
  baseURL: "https://eternal-hot-doe.ngrok-free.app/api/v1.0",
});

$api.CancelToken = axios.CancelToken;
$api.isCancel = axios.isCancel;

let isRefreshing = false;
let failedQueue = [];

// Function to process failed requests once the token is refreshed
const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

/*
 * The interceptor here ensures that we check for the token in local storage every time an $api request is made
 */
$api.interceptors.request.use(
  (config) => {
    // console.log(import.meta.env.VITE_API_BASE_URL);

    // const partnerid = import.meta.env.VITE_PARTNER_ID; // Replace with actual partner ID
    // const timestamp = Math.floor(Date.now() / 1000);
    // const path = config.url.slice(1); // Replace with the actual API path
    // const secretKey = import.meta.env.VITE_SECRET; // Replace with your secret key

    // // Concatenate the partnerid, timestamp, and path
    // const dataToHash = partnerid + timestamp + path;

    // // Generate HMAC-SHA256 hash
    // const hash = CryptoJS.HmacSHA256(dataToHash, secretKey).toString(CryptoJS.enc.Hex);
    // useLayoutStore().setLoading(true);

    // if (config?.params?.is_noloading || config?.data?.is_noloading) {
    //   useAuth().setLoading(false);
    //   useAuth().setSoftLoading(true);
    //   if (config.params?.is_noloading)
    //     delete config.params.is_noloading;
    //   if (config.data?.is_noloading)
    //     delete config.data.is_noloading;
    // } else {
    //   useAuth().setLoading(true);
    // }

    // let token = useAuth().token;
    // let token = useCookie("accessToken").value;

    // if (hash) {
    //   // config.headers["Authorization"] = `Bearer ${hash}`;
    //   config.headers["partnerid"] = partnerid;
    //   config.headers["timestamp"] = timestamp;
    //   config.headers["path"] = path;
    //   config.headers["auth"] = hash;
    // }

    if (localStorage.getItem("accessToken")) {
      config.headers.Authorization = `Bearer ${localStorage.getItem(
        "accessToken"
      )}`;
    }

    // if (['post', 'put', 'patch', 'delete'].includes(config.method)) {
    //   config.data = { data: { ...encrypt(JSON.parse(JSON.stringify(config.data))) } }
    // }

    // if (config.params) {
    //   Object.keys(config?.params).forEach((key) => {
    //     if (!config?.params?.[key] && (typeof config?.data?.[key] != 'number')) {
    //       delete config?.params?.[key];
    //     }
    //   });
    //   if (config?.params?.['only_params']) {
    //     delete config?.params?.['only_params'];
    //   }
    //   if (config?.params?.['is_noloading']) {
    //     delete config?.params?.['is_noloading'];
    //   }
    // }
    // if (config.data) {
    //   Object.keys(config.data).forEach((key) => {
    //     if (!config?.data?.[key] && (typeof config?.data?.[key] != 'number' && typeof config?.params?.[key] != 'string' && typeof config?.data?.[key] != 'boolean' && config?.data?.[key] !== "")) {
    //       delete config.data[key];
    //     }
    //   });
    //   if (config?.data?.['is_noloading']) {
    //     delete config?.data?.['is_noloading'];
    //   }
    // }
    layoutStore.setLoading(true);

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

$api.interceptors.response.use(
  (response) => {
    layoutStore.setLoading(false);
    // useLayoutStore().setLoading(false);
    // if (response.status >= 200 && response.status < 300) {
    //   response.data = JSON.parse(decrypt(response.data.data));
    // }
    // clearTimeout(delay_on_isloading);
    // delay_on_isloading = setTimeout(() => {
    //   useAuth().setLoading(false);
    //   useAuth().setSoftLoading(false);
    // }, 2000);
    return response;
  },
  async (err) => {
    const originalRequest = err.config;

    console.log(err.config, "err broh");
    if (
      err?.response?.status === 401 &&
      err.response.data.responseMessage == "Invalid Token"
    ) {
      // localStorage.removeItem("accessToken");
      // authStore.getAccessTokenByRefreshToken();

      console.log(isRefreshing, "is refreshing ... ");

      if (isRefreshing) {
        // Queue the request if a token refresh is already in progress
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            console.log(token, "token yang di perlakukan ini ....");
            debugger;

            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return $api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      console.log("a");

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = authStore.refreshToken;
      console.log(refreshToken, "refresh token");

      if (refreshToken == "1" || !refreshToken) {
        // Handle no refresh token case, e.g., redirect to login
        console.log("no refresh token", Promise.reject);

        return new Promise(function () {
          layoutStore.setError(true);
          layoutStore.setLoading(false);
          console.log(err, "error broh pesan");
          layoutStore.setErrorMessage('Session Expired!');
        });
      }

      try {
        await authStore.getAccessTokenByRefreshToken();
        localStorage.setItem("accessToken", authStore.accessToken);
        // Retry the failed requests with the new token
        processQueue(null, authStore.accessToken);

        // Retry the original request with the new token
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${authStore.accessToken}`;
        console.log($api, "original request");

        return $api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        // Handle refresh token failure (e.g., redirect to login)
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    if (
      err?.response?.status === 401 &&
      err.response.data.responseMessage == "Invalid Refresh Token"
    ) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }

    if (
      err?.response?.status === 401 &&
      err.response.data.responseMessage == "[Failed to access token]"
    ) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      // alert("Invalid OTT, please try again");
      console.log('Invalid OTT, please try again');

      layoutStore.setError(true);
      layoutStore.setErrorMessage("Invalid OTT, please try again");
    }

    return new Promise(function () {
      layoutStore.setError(true);
      layoutStore.setLoading(false);

      console.log(err?.response?.data?.responseMessage, "error broh pesan");

      layoutStore.setErrorMessage(err?.response?.data?.responseMessage);
      //   /resolve, reject/
      //   // clearTimeout(delay_on_isloading);
      //   // delay_on_isloading = setTimeout(() => {
      //     useAuth().setLoading(false);
      //     useAuth().setSoftLoading(false);
      //   // }, 2000);

      //   if(err.code == "ERR_NETWORK"){
      //     useLayout().setNotification({
      //       show: true,
      //       title: "Error!",
      //       message: Network Error!,
      //       type: "error",
      //     });
      //   }

      //   if (
      //     err?.response?.status === 403 &&
      //     err?.config &&
      //     !err?.config?.__isRetryRequest
      //   ) {

      //     // if you ever get an unauthorized, logout the user
      //     // useAuthStore().removeSession();
      //     try {
      //       useAuth().logout();
      //       navigateTo('/auth/login')
      //     } catch (error) {
      //       console.log("error", error);
      //     }
      //     // you can also redirect to /login if needed !
      //   }
      //   // err.response.data = JSON.parse(decrypt(err.response.data.data));
      //   console.log(err);
      //   throw err;
    });
  }
);
