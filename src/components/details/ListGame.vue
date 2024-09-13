<script setup>
import { ref } from 'vue';

// Card data
const cards = [
  { value: 'Start', label: "MLBB Twilight Pass", image: "/src/assets/img/twilightML.png" },
  { value: 'WL', label: "Mobile Legends Weekly Pass", image: "/src/assets/img/weekly.png" },
  { value: 77, label: "77 Diamonds + 8 Bonus", image: "/src/assets/img/diamondML.png" },
  { value: 40, label: "40 Diamonds + 4 Bonus", image: "/src/assets/img/diamondML.png" },
  { value: 53, label: "53 Diamonds + 6 Bonus", image: "/src/assets/img/diamondML.png" },
  { value: 88, label: "88 Diamonds + 8 Bonus", image: "/src/assets/img/diamondML.png" },
  { value: 129, label: "129 Diamonds + 4 Bonus", image: "/src/assets/img/diamondML.png" },
  { value: 259, label: "259 Diamonds + 6 Bonus", image: "/src/assets/img/diamondML.png" },
  { value: 500, label: "500 Diamonds + 8 Bonus", image: "/src/assets/img/diamondML.png" },
  { value: 100, label: "100 Diamonds + 4 Bonus", image: "/src/assets/img/diamondML.png" },
  { value: 250, label: "253 Diamonds + 6 Bonus", image: "/src/assets/img/diamondML.png" },
  { value: 1000, label: "1077 Diamonds + 8 Bonus", image: "/src/assets/img/diamondML.png" },
  // Add more cards as needed
];

// Reactive state for selected card
const selectedCard = ref(null);

// Method to handle card selection
const selectCard = (value) => {
  selectedCard.value = value;
  console.log(selectedCard.value);

};
</script>


<template>
  <div class="card-container">
    <div
      v-for="(card, index) in cards"
      :key="index"
      :class="['card', { 'is-selected': selectedCard === card.value }, { 'card-tall': index < 2 }]"
      @click="selectCard(card.value)"
    >
      <VRow v-if="index < 2">
        <VCol
          cols="3"
        >
          <VImg
            :src="card.image"
            width="80"
            cover
          />
        </VCol>
        <VCol
          cols="8"
        >
          <p style="margin-top: 12px; margin-left: -20px; text-align: left;" >{{ card.label }}</p>
        </VCol>
      </VRow>
      <div v-else >
        <VImg :src="card.image" width="50px" height="50px" cover style="margin-left: auto; margin-right: auto;" />
        <p>{{ card.label }}</p>
      </div>
    </div>
  </div>
</template>


<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap:15px;
  width: 100%;
  justify-content: space-between;
}

.card {
  flex-basis: calc(50% - 7.5px);
  width: 100%;
  padding: 16px;
  background-color: rgb(43, 67, 102);
  color: #fff;
  text-align: center;
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
