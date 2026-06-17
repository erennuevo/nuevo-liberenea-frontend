<script setup>
import VueLogo from "../assets/vue.svg";
</script>

<template>
  <div class="about-card">
    <div class="logo-wrapper">
      <img :src="VueLogo" alt="Vue Logo" class="vue-logo" />
    </div>

    <h1>About Vue</h1>

    <p class="description">
      Vue is the progressive JavaScript framework: An approachable, performant
      and versatile framework for building web user interfaces.
    </p>
  </div>
</template>

<style scoped>
.about-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  padding: 32px 24px;
  text-align: center;
  box-sizing: border-box;
  margin: 150px auto;
  position: relative;
  z-index: 10;
  width: 40%;
}

.logo-wrapper {
  background: #f8fafc;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px auto;
}

.vue-logo {
  width: 44px;
  height: 44px;
}

h1 {
  color: #1b2a4a;
  font-size: 40px;
  padding: 5px;
  font-weight: 700;
}

.description {
  color: #4a5568;
  font-size: 20px;
  line-height: 1.3;
  margin: 0 0 24px 0;
}
</style>
