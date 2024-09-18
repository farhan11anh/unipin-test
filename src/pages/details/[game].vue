<script setup>
import ListGame from "@/components/details/ListGame.vue";
import { Icon } from "@iconify/vue";
import AccountId from "@/components/details/input/AccountId.vue";
import ZoneId from "@/components/details/input/ZoneId.vue";

const game = useRoute().params.game;

const isScardSelected = ref(false);
const accoundId = ref("");
const zoneId = ref("");


const isActiveButton = computed(()=> {
  console.log(isScardSelected.value);

  return isScardSelected.value && accoundId.value !== "" && zoneId.value !== "";
})

</script>

<template>
  <VRow>
    <VCol cols="2">
      <button class="back">
        <Icon class="icon" icon="ion:chevron-back" width="15" />
      </button>
    </VCol>
    <VCol cols="8">
      <p style="text-align: center">{{ game }}</p>
    </VCol>
    <VCol cols="2"></VCol>
  </VRow>

  <div class="card-banner mt-5">
    <div style="height: 200px; margin-bottom: 15px">
      <VImg src="/src/assets/img/ml.jpg" width="100%" cover rounded />
    </div>
    <div class="title-game">Mobile Legends Bang Bang</div>
    <div class="description">Diamond Top up</div>
  </div>

  <div class="card-input mt-5">
    <div class="title-game">Input Account ID</div>
    <hr />
    <VRow>
      <VCol
        cols="8"
      >
        <AccountId @valueAccountId="accoundId = $event" />
      </VCol>
      <VCol
        cols="4"
      >
        <ZoneId @valueZoneId="zoneId = $event" />
      </VCol>
    </VRow>
  </div>

  <!-- list item  -->
   <div class="mt-5" >
      <ListGame
        @selectCard="isScardSelected = true"
      />
   </div>

   <div style="width: 100%;" >
      <div class="btn-done" :class="isActiveButton ? 'active' : 'disabled'">
        <button class="btn" :disabled="!isActiveButton">CONTINUE</button>
      </div>
    </div>

</template>

<style scoped>

.back {
  border: 1px solid #e4e4e4;
  border-radius: 12px;
  padding: 8px;
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

.card-banner {
  border: 0.1px solid #292929;
  border-radius: 12px;
  padding: 10px;
  width: 100%;
  position: relative;
}

.card-input {
  border: 0.1px solid #424242;
  border-radius: 12px;
  padding: 15px;
  width: 100%;
  position: relative;
}

.title-game {
  font-size: 15px;
  font-weight: bold;
  color: #ffffff;
}

.description {
  font-size: 12px;
  font-weight: normal;
  color: #ffffff97;
}

hr {
  border: none;
  border-top: 1px dashed #d3b3b396;
  color: #fff;
  /* background-color: #fff; */
  height: 1px;
  width: 100%;
  margin: 15px 0;
}

.input-custom {
  background-color: #fff;
  width: 100%;
  padding: 8px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  border: 2px solid #2196f3; /* Blue outline */
}

.input-custom .icon {
  margin-right: 10px;
}

.input-custom input {
  width: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  color: #292424;
  font-size: 14px; /* Adjust font size for larger text */
  font-weight: bold; /* Make text bold */
}

.input-server {
  background-color: #fff;
  width: 100%;
  padding: 8px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #2196f3; /* Blue outline */
}

.input-server input {
  width: 85%;
  border: none;
  outline: none;
  background-color: transparent;
  text-align: center; /* Center the placeholder text */
  font-size: 14px;
  font-weight: bold;
  color: #292424;
}

.parenthesis {
  font-size: 16px;
  color: #292424;
  font-weight: bold;
}

.btn-done {
  height: 50px;
  background-color: #00549b;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
}

.btn-done button {
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 14px;
  font-weight: 500;
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #656565;
}
</style>
