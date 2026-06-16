<!--
=============================================================
  DAY 2 ASSIGNMENT — TaskListView.vue (Parent Component)
  This file renders a list of TaskCard components.
=============================================================
-->
<script setup>
import { ref } from "vue";
import TaskCard from "../components/TaskCard.vue";

// TODO 1: Create a ref() tasks array with at least 3 sample tasks
// Each task: { id, name, done, dueDate }
const tasks = ref([
  {
    id: 1,
    name: "Study",
    done: false,
    dueDate: "June 17, 2026",
    priority: "Low",
  },
  {
    id: 2,
    name: "Study again",
    done: false,
    dueDate: "June 17, 2026",
    priority: "Medium",
  },
  {
    id: 3,
    name: "Study again and again",
    done: false,
    dueDate: "June 17, 2026",
    priority: "Medium",
  },
  {
    id: 4,
    name: "Study again and again and again",
    done: false,
    dueDate: "June 17, 2026",
    priority: "Medium",
  },
]);

// TODO 2: Write handleComplete(id) — toggle the done state of the task with this id
function handleComplete(id) {
  const task = tasks.value.find((task) => task.id === id);
  task.done = !task.done;
}

// TODO 3: Write handleDelete(id) — remove the task with this id from the array
function handleDelete(id) {
  tasks.value = tasks.value.filter((task) => task.id !== id);
}

// function handleUpdate(id) {
//   const task = tasks.value.find((task) => task.id === id);
//   task.name = task.name;
// }
</script>

<template>
  <div class="task-list-view">
    <h1>My Tasks</h1>

    <span v-if="tasks.length == 0">
      All tasks have been completed or deleted!
    </span>

    <!-- TODO 4: Render a <TaskCard> for each task using v-for
         - Pass :task="task" as a prop
         - Listen @complete="handleComplete"
         - Listen @delete="handleDelete"
         - Fill the "meta" named slot with the due date
    -->
    <TaskCard
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @complete="handleComplete"
      @delete="handleDelete"
    >
      <template #meta> Due: {{ task.dueDate }} </template>
    </TaskCard>
  </div>
</template>

<style scoped>
.task-list-view {
  max-width: 520px;
  margin: 40px auto;
  padding: 24px;
  font-family: Arial, sans-serif;
}
h1 {
  color: #1b2a4a;
  margin-bottom: 24px;
}
</style>
