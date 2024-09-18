<template>
  <VRow>
    <VCol cols="2">
      <button class="back">
        <Icon class="icon" icon="ion:chevron-back" width="15" />
      </button>
    </VCol>
    <VCol cols="8">
      <p style="text-align: center">Game Top Up Unipin</p>
    </VCol>
    <VCol cols="2"></VCol>
  </VRow>

  <!-- carousel  -->
  <div class="mt-5">
    <!-- <v-carousel
      height="200"
      show-arrows="hover"
      cycle
      hide-delimiter-background
    >
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet :color="colors[i]" height="100%">
          <div class="d-flex fill-height justify-center align-center">
            <div class="text-h2">{{ slide }} Slide</div>
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel> -->

    <div>
      <GlobalCarousel />
    </div>
  </div>

  <!-- search input -->
  <div class="mt-5">
    <h4 class="title mb-5">Search for a game</h4>
    <div class="search-input-container">
      <Icon class="search-icon" icon="mdi-magnify" />
      <input
        type="text"
        class="search-input"
        placeholder="Search..."
        v-model="search"
      />
    </div>
  </div>

  <!-- game list -->
  <div class="mt-15">
    <h4 class="title mb-5">Most Popular</h4>
    <div>
      <VRow>
        <VCol
          cols="6"
          v-for="game in gameListFiltered"
          @click="router.push({ path: `/details/${game.name}` })"
        >
          <VCard>
            <VImg :src="game.image" height="120px" cover />
          </VCard>
          <p class="title-text">{{ game.name }}</p>
          <p class="text-caption">{{ game.description }}</p>
        </VCol>
      </VRow>
    </div>
  </div>
</template>

<script setup>
import GlobalCarousel from "@/components/Global/GlobalCarousel.vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

const router = useRouter();

const colors = ref([
  "indigo",
  "warning",
  "pink darken-2",
  "red lighten-1",
  "deep-purple accent-4",
]);
const slides = ref(["First", "Second", "Third", "Fourth", "Fifth"]);
const search = ref("");

const gameListFiltered = computed(() => {
  const res = game_list.value.filter((game) => {
    return game.name.toLowerCase().includes(search.value.toLowerCase());
  });
  return res;
});

// example data
const game_list = ref([
  {
    name: "Mobile Legend",
    description: "Top up diamond",
    image: "/src/assets/img/ml.jpg",
  },
  {
    name: "PUBG",
    description: "Top up UC",
    image: "/src/assets/img/pubg.jpg",
  },
  {
    name: "Honor of King",
    description: "Top up Coupon",
    image: "/src/assets/img/hok.jpg",
  },
  {
    name: "Free Fire",
    description: "Top up diamond",
    image: "/src/assets/img/ff.jpg",
  },
  {
    name: "Free Fire Max",
    description: "Top up diamond",
    image: "/src/assets/img/ff.jpg",
  },
]);
</script>

<style scoped>
.back {
  border: 1px solid #e4e4e4;
  border-radius: 12px;
  padding: 8px 8px;
  width: 30px;
  height: 30px;
  color: #7e7e7e;
  position: relative;
}

.back .icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.carousel {
  /* overflow: hidden; */
  border-radius: 15px;
  box-shadow: 10px 10px 60px 0 rgba(226, 221, 221, 0.2);
}


.search-input-container {
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px; /* Slim border */
  border-radius: 15px;
  background: linear-gradient(
    to right,
    rgba(0, 150, 255, 0.4),
    rgba(255, 100, 0, 0.4)
  ); /* Soft gradient */
  transition: background 0.3s ease;
}

.search-input {
  width: 100%;
  height: 50px;
  padding: 10px 15px 10px 50px; /* Extra left padding for the icon */
  border: none;
  border-radius: 15px;
  background-color: #000; /* Dark background for the input */
  color: white;
  font-size: 16px;
  outline: none;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6); /* Light placeholder text */
}

/* Icon Style */
.search-icon {
  position: absolute;
  left: 15px; /* Position the icon to the left of the input */
  font-size: 24px; /* Adjust the icon size */
  color: rgba(255, 255, 255, 0.6); /* Icon color */
}

/* Hover and Focus States */
.search-input-container:hover {
  background: linear-gradient(
    to right,
    rgba(0, 255, 255, 0.4),
    rgba(255, 165, 0, 0.4)
  ); /* Softer hover gradient */
}

.search-input:focus {
  background-color: #111;
  color: white;
}

.search-input-container input:focus + .search-input-container {
  background: linear-gradient(
    to right,
    rgba(173, 216, 230, 0.4),
    rgba(255, 128, 128, 0.4)
  ); /* Soft focus gradient */
}

/* game list  */
.text-caption {
  color: #7e7e7e !important;
}

.title-text {
  color: #f8f8f8da !important;
  font-weight: bold !important;
  font-size: 14px !important;
}
</style>
