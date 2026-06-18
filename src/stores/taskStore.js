import { ref, computed } from "vue";
import { defineStore } from "pinia";

// TODO 1: Export a useTaskStore function using defineStore
// The store ID is 'tasks' — this appears in Vue DevTools
export const useTaskStore = defineStore("tasks", () => {
  // TODO 2: Define state using ref()
  const tasks = ref([]);
  const nextId = ref(1);

  // TODO 3: Define getters using computed()
  const totalCount = computed(() => tasks.value.length);
  const doneCount = computed(
    () => tasks.value.filter((task) => task.done === true).length,
  );
  const pendingCount = computed(
    () => tasks.value.filter((task) => task.done === false).length,
  );

  // TODO 4: Define addTask(name) action
  // - Guard against empty names
  // - Push a new task: { id: nextId.value++, name, done: false }
  function addTask(newTask) {
    tasks.value.push({
      id: nextId.value++,
      name: newTask,
      done: false,
      priority: "low",
    });
  }

  // TODO 5: Define toggleTask(id) action
  function toggleTask(id) {
    const task = tasks.value.find((task) => task.id === id);
    task.done = !task.done;
  }

  // TODO 6: Define removeTask(id) action
  function removeTask(id) {
    tasks.value = tasks.value.filter((task) => task.id !== id);
  }

  // TODO 7: Return everything the component needs to access
  return {
    tasks,
    totalCount,
    doneCount,
    pendingCount,
    addTask,
    toggleTask,
    removeTask,
  };
});

// import { defineStore } from "pinia";

// export const useTaskStore = defineStore("taskStore", {
//   state: () => ({
//     tasks: [
//       { id: 1, name: "Learn Pinia", done: true, dueDate: "June 19, 2026" },
//       { id: 2, name: "Build an app", done: true, dueDate: "June 19, 2026" },
//       {
//         id: 3,
//         name: "Learn API integration",
//         done: false,
//         dueDate: "June 19, 2026",
//       },
//     ],
//   }),
//   getters: {
//     totalCount(state) {
//       return state.tasks.length;
//     },
//     doneCount(state) {
//       return state.tasks.filter((task) => task.done === true).length;
//     },
//     pendingCount(state) {
//       return state.tasks.filter((task) => task.done === false).length;
//     },
//   },
//   actions: {},
// });
