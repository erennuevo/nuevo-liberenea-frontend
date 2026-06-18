import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useUserStore } from "./userStore.js";

export const useTaskStore = defineStore(
  "tasks",
  () => {
    const userStore = useUserStore();
    const allTasks = ref({});
    const nextId = ref(1);

    // Function to return a user's tasks
    const tasks = computed(() => {
      const currentUsername = userStore.currentUser;

      // If no user is logged in
      if (!userStore.isLoggedIn || currentUsername === "Guest") {
        return [];
      }

      // If the current user has no tasks array yet
      if (!allTasks.value[currentUsername]) {
        allTasks.value[currentUsername] = [];
      }

      return allTasks.value[currentUsername];
    });

    const totalCount = computed(() => tasks.value.length);
    const doneCount = computed(
      () => tasks.value.filter((task) => task.done === true).length,
    );
    const pendingCount = computed(
      () => tasks.value.filter((task) => task.done === false).length,
    );

    function addTask(newTask) {
      // Users not logged in cannot add tasks
      if (!userStore.isLoggedIn || !newTask.trim()) {
        return;
      }

      tasks.value.push({
        id: nextId.value++,
        name: newTask,
        done: false,
        priority: "low",
      });
    }

    function toggleTask(id) {
      const task = tasks.value.find((task) => task.id === id);
      task.done = !task.done;
    }

    function removeTask(id) {
      const currentUsername = userStore.currentUser;
      allTasks.value[currentUsername] = allTasks.value[currentUsername].filter(
        (task) => task.id !== id,
      );
    }

    return {
      tasks,
      totalCount,
      doneCount,
      pendingCount,
      addTask,
      toggleTask,
      removeTask,
    };
  },
  {
    persist: true,
  },
);
