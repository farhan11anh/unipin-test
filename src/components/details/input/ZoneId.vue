<script setup>
const zoneId = ref("");
const isError = ref(false);

const emit = defineEmits(["valueZoneId"]);

const onFoucus = () => {
  console.log("focus");
  isError.value = false
};

const onBlur = () => {
  if(zoneId.value === "") {
    isError.value = true
  } else {
    isError.value = false
  }
};

</script>



<template>
  <div class="input-server">
    <span class="parenthesis">(</span>
    <input
      type="number"
      placeholder="Zone ID"
      v-model="zoneId"
      @focus="onFocus"
      @blur="onBlur"
      @input="emit('valueZoneId', zoneId.toString())"
    />
    <span class="parenthesis">)</span>
  </div>
  <div v-show="isError" style="color: red; font-size: 12px; font-weight: 400;" >
    zone id required
  </div>
</template>

<style scoped>
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
</style>
