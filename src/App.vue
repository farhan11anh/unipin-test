<template>
  <div class="pa-5">
    <v-app>
      <v-main>
        <router-view />
      </v-main>
    </v-app>

    <v-snackbar
      v-model="snackbar"
      multi-line
    >
      Error from server ...

      <template v-slot:actions>
        <v-btn
          color="red"
          variant="text"
          @click="layout.setError(false)"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import { useLayoutStore } from './stores/layout';

  const layout = useLayoutStore();

  const snackbar = computed(() => layout.isError_data);
</script>
