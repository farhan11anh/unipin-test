<script setup>
import mlBannerImg from "../../assets/img/ml_banner_.jpg";
import hokBannerImg from "../../assets/img/hok_banner_.jpg";
import ffBannerImg from "../../assets/img/ff_banner_.jpg";
import pubgBannerImg from "../../assets/img/pubg_banner_.jpg";

const colors = ref([
  "indigo",
  "warning",
  "pink darken-2",
  "red lighten-1",
  "deep-purple accent-4",
]);

const slides = ref([mlBannerImg, hokBannerImg, ffBannerImg, pubgBannerImg]);
</script>

<template>
  <v-carousel
    height="400"
    :show-arrows="false"
    cycle
    hide-delimiter-background
  >
    <v-carousel-item v-for="(slide, i) in slides" :key="i">
      <v-sheet :color="colors[i]" height="100%">
        <VImg :src="slide" width="100%" cover />
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<style scoped>
:deep .v-window__container {
  height: 95% !important;
  border-radius: 20px;
}

:deep .v-img--booting {
  overflow: hidden;
  border-radius: 20px;
}

:deep .v-btn--active .v-icon {
  width: 50px;
  background-color: #f87304 !important;
  border-radius: 20px !important;
  color: #f87304 !important;
}

:deep .v-carousel__controls__item .v-icon {
  background-color: #e1e1e2;
  color: #e1e1e2;
  border-radius: 100%;
}

:deep .v-btn__overlay,
:deep .v-btn__underlay {
  display: none;
}

.v-carousel {
  height: 200px !important;
}

:deep .v-carousel__controls {
  bottom: -15px;
}
</style>
