<script setup lang="ts">
import { RouterView } from "vue-router";
import AnimatedBackground from "./components/AnimatedBackground.vue";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <header>
    <Navbar />
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
