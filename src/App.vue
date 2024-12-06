<template>
  <div class="pa-5">
    {{ layout.isError_data }}
    <v-app>
      <v-main>
        <router-view />
      </v-main>
    </v-app>

    <v-snackbar
      v-model="snackbar"

    >
      <!-- Error from server ... -->
      {{ layout.error_message }}

      <template v-slot:actions>
        <v-btn
          color="red"
          variant="text"
          @click="layout.setError(false)"
        >
          <VIcon icon="mdi-close" />
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import { useLayoutStore } from './stores/layout';
import { VIcon } from 'vuetify/components';

  const layout = useLayoutStore();

  const snackbar = computed(() => layout.isError_data);
</script>
