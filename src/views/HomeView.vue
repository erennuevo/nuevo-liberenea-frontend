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
  return route.query.error === "notfound";
});
</script>

<template>
  <div class="home-view">
    <h1>📝 My Tasks</h1>

    <div class="error-banner" v-if="showErrorBanner">
      ⚠️ Task not found. Redirected back to home.
    </div>

    <div class="input-row">
      <input
        v-model="newTaskName"
        placeholder="New task..."
        @keyup.enter="handleAdd"
      />
      <button class="add-btn" @click="handleAdd">Add</button>
    </div>

    <div v-if="tasks.length === 0" class="empty-state">
      There are currently no tasks.
    </div>

    <ul class="task-list">
      <li v-for="task in tasks" :key="task.id" class="task-item">
        <input
          type="checkbox"
          class="task-checkbox"
          :checked="task.done"
          @change="toggleTask(task.id)"
        />

        <RouterLink :to="`/task/${task.id}`" class="task-link">
          <span :class="{ done: task.done }">{{ task.name }}</span>
        </RouterLink>

        <button class="delete-btn" @click="removeTask(task.id)">×</button>
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
  padding: 16px 0;
  margin: 0;
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

.input-row {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.input-row input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.input-row input:focus {
  border-color: rgb(56, 150, 213);
}

.add-btn {
  background-color: rgb(56, 150, 213);
  color: white;
  border: none;
  padding: 0 20px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-btn:hover {
  background-color: rgb(46, 130, 193);
}

.empty-state {
  color: #718096;
  font-style: italic;
  padding: 16px 0;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-item {
  padding: 12px 16px;
  background: white;
  border-radius: 8px;
  margin-bottom: 8px;
  border: 1px solid #eee;
  display: flex;
  align-items: center;
  gap: 12px;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.task-item:hover {
  border-color: #73c8ed;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.task-checkbox {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.task-link {
  flex: 1;
  text-decoration: none;
  color: #2d3748;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.task-link:hover {
  color: rgb(46, 130, 193);
}

.task-link .done {
  text-decoration: line-through;
  color: #9ca3af;
}

.delete-btn {
  background: none;
  border: none;
  color: #a0aec0;
  font-size: 20px;
  font-weight: bold;
  line-height: 1;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.delete-btn:hover {
  background-color: #fed7d7;
  color: #e06767;
}
</style>
