<!--
=============================================================
  DAY 3 ASSIGNMENT — HomeView.vue
  Shows the task list with router-link navigation to each task
=============================================================
-->
<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useTaskStore } from "../stores/taskStore.js";

const taskStore = useTaskStore();
const { tasks, doneCount, pendingCount, totalCount } = storeToRefs(taskStore);
const { addTask, toggleTask, removeTask } = taskStore;
const route = useRoute();

const newTaskName = ref("");

function handleAdd() {
  taskStore.addTask(newTaskName.value);
  newTaskName.value = "";
}

// Read route.query.error — if it equals 'notfound', show a warning banner
const showErrorBanner = computed(() => {
  if (route.query.error === "notfound") {
    return true;
  }
});
</script>

<template>
  <div class="home-view">
    <h1>📝 My Tasks</h1>

    <!-- Show a warning banner if showErrorBanner is true -->
    <div class="error-banner" v-if="showErrorBanner">
      ⚠️ Task not found. Redirected back to home.
    </div>

    <div class="input-row">
      <input
        v-model="newTaskName"
        placeholder="New task..."
        @keyup.enter="handleAdd"
      />
      <button @click="handleAdd">Add</button>
    </div>

    <span v-if="taskStore.tasks.length == 0">
      All tasks have been completed or deleted!
    </span>

    <!-- Render each task as a RouterLink to /task/:id -->
    <ul class="task-list">
      <li v-for="task in taskStore.tasks" :key="task.id">
        <!-- Wrap this in a RouterLink -->
        <input type="checkbox" v-model="task.done" @click="toggleTask" />
        <RouterLink :to="`/task/${task.id}`">
          <span :class="{ done: task.done }">{{ task.name }}</span>
        </RouterLink>
        <button @click="removeTask(task.id)">X</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.home-view {
  max-width: 520px;
  margin: 40px auto;
  padding: 24px;
  font-family: Arial, sans-serif;
  position: relative;
  z-index: 10;
}

h1 {
  color: #1b2a4a;
  padding: 16px;
}

.error-banner {
  background: #fef3c7;
  border: 1px solid #f59e0b;
  border-radius: 6px;
  padding: 10px 14px;
  margin-bottom: 16px;
  color: #92400e;
  font-size: 14px;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-list li {
  padding: 12px;
  background: white;
  border-radius: 8px;
  margin-bottom: 8px;
  border: 1px solid #eee;
  cursor: pointer;
  display: flex;
  gap: 10px;
}

.task-list li:hover {
  border-color: #42b883;
}

.done {
  text-decoration: line-through;
  color: #9ca3af;
}

.input-row {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
}
.input-row input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}
</style>
