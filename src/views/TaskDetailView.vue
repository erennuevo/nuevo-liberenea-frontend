<!--
=============================================================
  DAY 3 ASSIGNMENT — TaskDetailView.vue
  Displays full details for a single task
=============================================================
-->
<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTaskStore } from "../stores/taskStore.js";

// TODO 1: Get the current route and router instances
const route = useRoute();
const router = useRouter();

const taskStore = useTaskStore();

// TODO 2: Find the task matching the route param
// Remember: route.params.id is a STRING — cast to Number before comparing
const task = computed(() =>
  taskStore.tasks.find((t) => t.id === Number(route.params.id)),
);

// TODO 3: Write goBack() using router.push() to navigate to '/home'
function goBack() {
  router.push("/home");
}
</script>

<template>
  <div class="detail-view">
    <!-- TODO 4: Show this only if task is found (v-if="task") -->
    <div v-if="task">
      <button class="back-btn" @click="goBack">← Back</button>

      <!-- TODO 5: Display task.name, task.dueDate, and task.done status -->
      <h1>{{ task.name }}</h1>
      <p>
        Status:
        {{ task.done ? "Done" : "Not Done" }}
      </p>
      <p>
        Due:
        {{ task.dueDate }}
      </p>
    </div>

    <!-- This case is handled by the router guard, but good to have a fallback -->
    <div v-if="false">
      <p>Task not found.</p>
      <button @click="goBack">Go Back</button>
    </div>
  </div>
</template>

<style scoped>
.detail-view {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  padding: 32px 24px;
  box-sizing: border-box;
  margin: 200px auto;
  max-width: 40%;
  font-family: Arial, sans-serif;
  position: relative;
  z-index: 10;
}
.back-btn {
  background-color: #66a6ea;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.2s ease;
}

.back-btn:hover {
  background-color: #4b92de;
}
h1 {
  color: #1b2a4a;
  font-size: 24px;
  margin-bottom: 12px;
}
p {
  color: #4a5568;
  font-size: 15px;
  margin: 6px 0;
}
</style>
