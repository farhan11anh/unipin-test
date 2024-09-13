<script lang="ts" setup>
const props = defineProps({

})

</script>

<template>
  <div>
    <div class="header">
      <h2 class="text-center" >Success Payment</h2>
      <VImg class="my-5 mx-auto" width="300px" src="/src/assets/img/logo-ML.png" />
    </div>
    <div class="ticketContainer">
      <div class="ticket">
        <div class="header-ticket">
          <div class="ticketTitle">Mobile Legends Bang Bang</div>
          <div class="subTitle">503 Diamond + 65 Bonus</div>
        </div>

        <div class="ticketRip">
          <div class="circleLeft"></div>
          <div class="ripLine"></div>
          <div class="circleRight"></div>
        </div>
        <hr />

        <div style="padding: 10px; width: 100%">
          <div class="d-flex justify-space-between">
            <div style="font-size: 12px; font-weight: 600">Payment Detail</div>

            <div style="font-size: 12px; font-weight: 400">Dummy 800K1N9 ID</div>
          </div>

          <div class="card-detail">
            <div class="d-flex justify-space-between mb-2">
              <div>Field Price</div>
              <div style="font-weight: 450">RP. 145.000</div>
            </div>
            <div class="d-flex justify-space-between mb-2">
              <div>Service Price</div>
              <div style="font-weight: 450">RP. 5.000</div>
            </div>
            <div class="d-flex justify-space-between mb-5">
              <div>Insurance</div>
              <div style="font-weight: 450">RP.0</div>
            </div>

            <hr />

            <div class="d-flex justify-space-between mt-5">
              <div style="font-weight: 400">Total Payment</div>
              <div style="font-weight: 800">RP. 150.000</div>
            </div>
          </div>

          <div class="status-payment-card">
            <div class="d-flex justify-space-between">
              <div>Status Pembayaran</div>
              <div style="font-weight: 500">PAID</div>
            </div>
          </div>
        </div>

        <div class="rip-bottom">
          <div
            v-for="item in [1, 2, 3, 4, 5, 6, 7, 8]"
            :key="item"
            class="circle-bottom"
          ></div>
        </div>
      </div>
      <div class="ticketShadow"></div>
    </div>

    <div style="width: 100%;" >
      <div class="btn-done">
        <button>DONE</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rip-bottom {
  display: flex;
  justify-content: center;
  margin-bottom: -12px;
  gap: 12px;
}

.circle-bottom {
  width: 24px;
  height: 24px;
  border-radius: 100%;
  background-color: #121212;
  /* filter: blur(12px); */
}

/* Main Ticket Style */
.ticketContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ticket {
  background-color: white;
  color: darkslategray;
  border-radius: 12px 12px 0 0;
  width: 300px;
}
.ticketShadow {
  animation: bouncingShadow 0.6s ease-out infinite alternate;
  margin-top: 4px;
  width: 95%;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.4);
  filter: blur(12px);
}

/* Ticket Content */

.header-ticket {
  padding: 10px;
}

.subTitle {
  font-size: 12px;
  font-weight: 300;
  color: #f87304;
}
.ticketTitle {
  font-size: 14px;
  font-weight: 700;
}
hr {
  width: 100%;
  border: 1px solid #efefef;
}

/* Ticket Ripper */
.ticketRip {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.circleLeft {
  width: 14px;
  height: 24px;
  background-color: #121212;
  border-radius: 0 12px 12px 0;
}
.ripLine {
  width: 100%;
  border-top: 3px solid #b7b5e4;
  border-top-style: dashed;
}
.circleRight {
  width: 14px;
  height: 24px;
  background-color: #121212;
  border-radius: 12px 0 0 12px;
}

.card-detail {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #eaebeb;
  width: 100%;
  /* height: 200px; */
  font-size: 12px;
  font-weight: 300;
}

.status-payment-card {
  padding: 10px;
  background-color: #ebf7ff;
  border: 0.5px solid #b2ddff;
  border-radius: 10px;
  width: 100%;
  font-size: 12px;
  font-weight: 300;
  margin-top: 10px;
}

.btn-done {
  width: 300px;
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

</style>
