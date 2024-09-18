<script setup>
import { Icon } from "@iconify/vue";

const accoundId = ref("");
const emit = defineEmits(["valueAccountId"]);
const isError = ref(false);

const onFoucus = () => {
  console.log("focus");
  isError.value = false
};

const onBlur = () => {
  if(accoundId.value === "") {
    isError.value = true
  } else {
    isError.value = false
  }
};


</script>

<template>
  <div class="input-custom">
    <Icon
      class="icon"
      icon="flowbite:users-group-solid"
      width="25"
      color="orange"
    />
    <input
      type="text"
      placeholder="Account ID"
      v-model="accoundId"
      @focus="onFoucus()"
      @blur="onBlur()"
      @input="emit('valueAccountId', accoundId)"
    />
  </div>

  <div v-show="isError" style="color: red; font-size: 12px; font-weight: 400;" >
    account id required
  </div>
</template>

<style scoped>
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
</style>
