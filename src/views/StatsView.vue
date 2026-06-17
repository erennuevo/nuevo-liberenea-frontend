<script setup>
import { computed, ref } from "vue";
import { useTaskStore } from "../stores/taskStore.js";
import AnimatedBackground from "../components/AnimatedBackground.vue";

// Initialize the Pinia task store
const taskStore = useTaskStore();

// Core computed breakdowns reading directly from Pinia state
const totalCount = computed(() => taskStore.tasks.length);
const doneCount = computed(
  () => taskStore.tasks.filter((task) => task.done === true).length,
);
const pendingCount = computed(
  () => taskStore.tasks.filter((task) => task.done === false).length,
);

// Filtering System for the local breakdown list
const currentFilter = ref("all");

function setFilter(filterValue) {
  currentFilter.value = filterValue;
}

const filteredTasks = computed(() => {
  if (currentFilter.value === "all") {
    return taskStore.tasks;
  } else if (currentFilter.value === "done") {
    return taskStore.tasks.filter((task) => task.done === true);
  } else if (currentFilter.value === "pending") {
    return taskStore.tasks.filter((task) => task.done === false);
  }
});

// Priority map mapping to match your exact CSS select color classes dynamically
function getPriorityClass(priority) {
  return priority ? priority.toLowerCase() : "low";
}
</script>

<template>
  <AnimatedBackground>
    <div class="app">
      <h1>📊 My Stats</h1>

      <div class="stats-grid">
        <div class="stat-card total">
          <span class="stat-label">Total Tasks</span>
          <span class="stat-number">{{ totalCount }}</span>
        </div>
        <div class="stat-card done">
          <span class="stat-label">Completed</span>
          <span class="stat-number">{{ doneCount }}</span>
        </div>
        <div class="stat-card pending">
          <span class="stat-label">Pending</span>
          <span class="stat-number">{{ pendingCount }}</span>
        </div>
      </div>
    </div>
  </AnimatedBackground>
</template>

<style scoped>
.app {
  margin: 200px auto;
  font-family: Arial, sans-serif;
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  max-width: 450px;
  position: relative;
  z-index: 10;
}

h1 {
  color: #1b2a4a;
  margin-bottom: 20px;
  text-align: center;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 16px;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 8px;
  border-radius: 8px;
  text-align: center;
}

.stat-card.total {
  background: #f1f5f9;
  color: #334155;
}
.stat-card.done {
  background: #e9f7f0;
  color: #15803d;
}
.stat-card.pending {
  background: #fff7ed;
  color: #c2410c;
}

.stat-label {
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.stat-number {
  font-size: 20px;
  font-weight: 800;
}
.empty {
  text-align: center;
  color: #94a3b8;
  font-style: italic;
  margin: 20px 0;
  font-size: 13px;
}
</style>
