<script setup lang="ts">
import AnimatedBackground from "../components/AnimatedBackground.vue";
</script>

<template>
  <AnimatedBackground>
    <div class="btn-container">
      <h1>Welcome!</h1>
      <RouterLink to="/task-list" class="nav-btn"> Go to Task List </RouterLink>
      <RouterLink :to="{ name: 'task-counter' }" class="nav-btn">
        Go to Task Counter
      </RouterLink>
    </div>
  </AnimatedBackground>
</template>

<style scoped>
.nav-btn {
  padding: 16px 32px;
  background-color: #42b883;
  color: white;
  border-radius: 6px;
  font-weight: bold;
  position: relative;
  text-decoration: none;
  z-index: 10;
}
.btn-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 30%;
  margin: 150px auto;
  font-size: 25px;
}
</style>
