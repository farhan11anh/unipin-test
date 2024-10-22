<script setup>
import { $api } from '@/utils/api';
import { getCurrentInstance, nextTick } from 'vue';

import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();


const token = authStore.accessToken
console.log(authStore.accessToken);


// if access token not exist
if(token === null) {
  authStore.getAcessToken('cce35147a391b0fab40feb2f085fd1d5b1bd0ab95a8256eae72f579b358e601g');

  // if param no found or param not valid
  if(false) {
    // redirect to brimo again reject acccess web view
  }
  else{
    // allow access webview
  }

}


</script>

<template>
    <div>
        This is Test Page you can visit everytime ...

        BRIMO Simulation ...
    </div>
</template>
