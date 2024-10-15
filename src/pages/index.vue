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
          @click="router.push({ path: `/details/${game.gameCode}` })"
        >
          <v-skeleton-loader
            type="card-avatar"
            v-if="isLoading"
          >

          </v-skeleton-loader>
          <template v-else>
            <VCard>
              <VImg :src="game.iconURL" height="120px" cover />
            </VCard>
            <p class="title-text">{{ game.categoryName }}</p>
            <p class="text-caption">{{ game.gameName }}</p>
          </template>
        </VCol>
      </VRow>
    </div>
  </div>

</template>

<script setup>
import GlobalCarousel from "@/components/Global/GlobalCarousel.vue";
import { $api } from "@/utils/api";
import { Icon } from "@iconify/vue";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useLayoutStore } from "@/stores/layout";

const layoutStore = useLayoutStore();

const isLoading = computed(() => layoutStore.isLoading)

const router = useRouter();

const search = ref("");

const gameListFiltered = computed(() => {
  const res = game_list.value.filter((game) => {

    return game.categoryName?.toLowerCase().includes(search.value.toLowerCase());
  });
  return res;
});

// example data
const game_list = ref([
  {
    category_name: "-",
    description: "Top up diamond",
    image: "/src/assets/img/ml.jpg",
  },
  {
    category_name: "-",
    description: "Top up diamond",
    image: "/src/assets/img/ml.jpg",
  },
  {
    category_name: "-",
    description: "Top up diamond",
    image: "/src/assets/img/ml.jpg",
  },
  {
    category_name: "-",
    description: "Top up diamond",
    image: "/src/assets/img/ml.jpg",
  },
]);

const fetchData = async () => {
  try {
    await $api.post("/unipin/game/list").then((response) => {
      console.log(response);

      game_list.value = response.data.responseData.gameList;
      // IF NEED FILTER BY GAME NAME //
      // const uniqueCategories = response.data.game_list.reduce((acc, current) => {
      //   // Cek apakah game_category sudah ada dalam accumulator
      //   if (!acc.some((item) => item.game_category === current.game_category)) {
      //     acc.push(current); // Jika belum ada, tambahkan item ke accumulator
      //   }
      //   return acc;
      // }, []);

      // console.log(uniqueCategories);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    console.log('Error fetching data:');
  }
};

fetchData();
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
