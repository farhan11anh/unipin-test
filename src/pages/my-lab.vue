<script setup>
import { $api } from '@/utils/api';
import { getCurrentInstance, nextTick } from 'vue';

import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();


const token = authStore.accessToken
console.log(token);


// if access token not exist
if(token === null) {
  authStore.getAcessToken('077766179aa2cc2ccaa92f44d9cb92f2a76da84aae522339031b215785f86a20');

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
