import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useUserStore } from "./userStore.js";

export const useTaskStore = defineStore(
  "tasks",
  () => {
    const userStore = useUserStore();
    const allTasks = ref({});
    const nextId = ref(1);

    const tasks = computed(() => {
      const currentUsername = userStore.currentUser;

      if (!userStore.isLoggedIn || currentUsername === "Guest") {
        return [];
      }
      if (!allTasks.value[currentUsername]) {
        allTasks.value[currentUsername] = [];
      }
      return allTasks.value[currentUsername];
    });

    // TODO 3: Define getters using computed()
    const totalCount = computed(() => tasks.value.length);
    const doneCount = computed(
      () => tasks.value.filter((task) => task.done === true).length,
    );
    const pendingCount = computed(
      () => tasks.value.filter((task) => task.done === false).length,
    );

    function addTask(newTask) {
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
