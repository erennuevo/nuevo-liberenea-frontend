<script setup>
const staticBackgroundBoxes = [];

// Create 15 floating boxes with random positions and movements
for (let i = 0; i < 15; i++) {
  staticBackgroundBoxes.push({
    style: {
      "--top": `${Math.floor(Math.random() * 85) + 5}%`,
      "--left": `${Math.floor(Math.random() * 85) + 5}%`,
      "--delay": `${Math.random() * 5}s`,
      "--duration": `${Math.floor(Math.random() * 6) + 7}s`,
    },
  });
}
</script>

<template>
  <div class="bg">
    <div class="box">
      <div
        v-for="(box, index) in staticBackgroundBoxes"
        :key="index"
        class="animated-cube"
        :style="box.style"
      ></div>
    </div>

    <slot />
  </div>
</template>

<style scoped>
.bg {
  background: linear-gradient(
    0deg,
    white 0%,
    rgb(255, 255, 208) 50%,
    rgb(192, 232, 255) 100%
  );
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 40px 20px;
  overflow: hidden;
  width: 100vw;
  min-height: 100vh;
}

.animated-cube {
  position: absolute;
  width: 60px;
  height: 60px;
  background-color: transparent;
  border: 6px solid rgb(149, 204, 209);
  opacity: 0;
  z-index: 1;

  top: var(--top);
  left: var(--left);

  animation: animate var(--duration, 10s) linear infinite both;
  animation-delay: var(--delay, 0s);
  pointer-events: none;
}

@keyframes animate {
  0% {
    transform: scale(0) translateY(0) rotate(0);
    opacity: 1;
  }
  100% {
    transform: scale(1.3) translateY(-90px) rotate(360deg);
    opacity: 0;
  }
}
</style>
