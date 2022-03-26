<template>
  <div class="container">
    <h1 class="title">Remember Me!</h1>
    <p>Remember and open all the green cells.</p>

    <app-board> </app-board>
  </div>
</template>

<script>
import AppBoard from './components/AppBoard.vue'
export default {
  components: { AppBoard }
}
</script>

<style scoped>
.container {
  margin: 40px;
  text-align: center;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
</style>