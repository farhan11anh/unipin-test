<script setup>
import { computed, ref } from "vue";

const emit = defineEmits(["selectCard"]);

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

// Reactive state for selected card
const selectedCard = ref(null);

// Method to handle card selection
const selectCard = (value) => {
  selectedCard.value = value;
  console.log(selectedCard.value, "selected card ..");

  // bring items selected details
  emit("selectCard", selectedCard.value);
};

const cards = computed(() => {
  return props.items;
});

const isLoading = ref(cards);
</script>

<template>
  <div v-if="cards?.length == 0">
    <VRow>
      <VCol
        cols="6"
        v-for="item in [1,2,3,4, 5,6, 7, 8]" :key="item"
        height="50px"
      >
        <v-skeleton-loader type="list-item">
        </v-skeleton-loader>
      </VCol>
    </VRow>
  </div>

  <div class="card-container" v-else>
    <div
      v-for="(x, cards) in items"
      :key="index"
      :class="['card', { 'is-selected': selectedCard === x?.id }]"
      @click="selectCard(x)"
    >
      <div>
        <!-- <VImg :src="card.image" width="50px" height="50px" cover style="margin-left: auto; margin-right: auto;" /> -->
        <div>{{ x?.name }}</div>
        <div
          style="margin-top: 10px"
          :style="{ color: selectedCard === x?.id ? 'white' : 'orange' }"
        >
          {{ x?.currency }}. {{ x?.totalAmount }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  width: 100%;
  justify-content: space-between;
}

.card {
  flex-basis: calc(50% - 7.5px);
  width: 100%;
  padding: 16px;
  background-color: rgb(43, 67, 102);
  color: #fff;
  /* text-align: center; */
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.card-tall {
  flex-basis: calc(100%);
}

.card img {
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
}

.card:hover {
  background-color: rgb(255, 150, 46);
}

.is-selected {
  background-color: rgb(255, 150, 46);
}
</style>
