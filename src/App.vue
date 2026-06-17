<script setup lang="ts">
import { RouterView } from "vue-router";
import AnimatedBackground from "./components/AnimatedBackground.vue";
</script>

<template>
  <header class="app-header">
    <nav class="page-nav">
      <RouterLink to="/home">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/stats">Stats</RouterLink>
    </nav>
  </header>

  <main>
    <AnimatedBackground>
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in" appear>
          <component :is="Component" />
        </Transition>
      </RouterView>
    </AnimatedBackground>
  </main>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #f8fafc;
  font-family: Arial, sans-serif;
}
.app-header {
  margin-bottom: 24px;
}
.page-nav {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #73c8ed;
  padding: 8px;
  border-radius: 8px;
  position: relative;
  z-index: 10;
}

.page-nav a {
  color: #2d3748;
  text-decoration: none;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.page-nav a:hover {
  background: rgba(255, 255, 255, 0.5);
  color: #1a202c;
}

.page-nav a.router-link-exact-active {
  color: #ffffff;
  background: rgb(56, 150, 213);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
