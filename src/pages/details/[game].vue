<script setup>
import ListGame from "@/components/details/ListGame.vue";
import { Icon } from "@iconify/vue";
import AccountId from "@/components/details/input/AccountId.vue";
import ZoneId from "@/components/details/input/ZoneId.vue";
import { useDetailsGameStore } from "@/stores/details-game";
import { $api } from "@/utils/api";
import { computed } from "vue";

const router = useRouter();
const game_code = useRoute().params.game;
const isTwoFields = computed(() => {
  if (detailsGameStore?.details?.fields?.length === 2) {
    return true;
  }
  return false;
});

const detailsGameStore = useDetailsGameStore();

const isScardSelected = ref(false);
const selectedCardDetails = ref({});
const userid = ref("");
const zoneid = ref("");

detailsGameStore.getData(game_code);
const gameDetails = computed(() => {
  return detailsGameStore.details;
});

const isActiveButton = computed(() => {
  return (
    isScardSelected.value &&
    userid.value !== "" &&
    (zoneid.value !== "" || !isTwoFields.value)
  );
});

const onSelectCard = (details) => {
  isScardSelected.value = true;
  selectedCardDetails.value = details;
  console.log(details);
};

const onsubmit = async () => {
  let params = {
    bayarindFee: selectedCardDetails.value.bayarindFee,
    merchantFee: selectedCardDetails.value.merchantFee,
    originalPrice: selectedCardDetails.value.originalPrice,
    markupPrice: selectedCardDetails.value.markupPrice,
    gameCode: selectedCardDetails.value.gameCode,
    gameName: selectedCardDetails.value.gameName,
    itemId: selectedCardDetails.value.itemId,
    itemName: selectedCardDetails.value.itemName,
    itemCurrency: selectedCardDetails.value.itemCurrency
  };

  params = {
    ...params, fields: gameDetails.value.fields
  }

  params.fields[0] = {
    ...params.fields[0],
    value: userid.value
  }


  // jika ada 2 field
  if(isTwoFields.value) {
    params.fields[1] = {
      ...params.fields[1],
      value: zoneid.value
    }
  }
  try {
    await $api
      .post("/unipin/initiate-order", params)
      .then((response) => {
        console.log(response);
        // redirect ke brimo
      });
  } catch (error) {
    // redirect ke sini dan kosongkan data
    layoutStore.setError(true);
    layoutStore.setErrorMessage('error, failed to purchase item');
  }
};
</script>

<template>
  <VRow>
    <VCol cols="2">
      <button class="back" @click="router.go(-1)">
        <Icon class="icon" icon="ion:chevron-back" width="15" />
      </button>
    </VCol>
    <VCol cols="8">
      <p style="text-align: center">{{ gameDetails?.game?.name }}</p>
    </VCol>
    <VCol cols="2"></VCol>
  </VRow>

  <div class="card-banner mt-5">
    <div style="height: 200px; margin-bottom: 15px">
      <VImg src="/src/assets/img/ml.jpg" width="100%" cover rounded />
    </div>
    <div class="title-game">{{ gameDetails?.game?.name }}</div>
    <div class="description">Top up {{ gameDetails?.game?.name }}</div>
  </div>

  <div class="card-input mt-5">
    <div class="title-game">Input Account ID</div>
    <hr />
    <VRow>
      <VCol :cols="isTwoFields ? 8 : 12">
        <AccountId @valueAccountId="userid = $event" />
      </VCol>
      <VCol cols="4" v-if="isTwoFields">
        <ZoneId @valueZoneId="zoneid = $event" />
      </VCol>
    </VRow>
  </div>

  <!-- list item  -->

  <!-- selectedcard bring items selected  -->
  <div class="mt-5">
    <ListGame
      @selectCard="onSelectCard($event)"
      :items="gameDetails?.denominations"
    />
  </div>

  <div style="width: 100%">
    <div class="btn-done" :class="isActiveButton ? 'active' : 'disabled'">
      <button
        @click="onsubmit()"
        class="btn"
        :class="{ disabled: !isActiveButton }"
        :disabled="!isActiveButton"
      >
        CONTINUE
      </button>
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
