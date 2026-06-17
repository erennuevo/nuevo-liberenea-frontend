import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [
      { id: 1, name: "Learn Pinia", done: true, dueDate: "June 19, 2026" },
      { id: 2, name: "Build an app", done: true, dueDate: "June 19, 2026" },
      {
        id: 3,
        name: "Learn API integration",
        done: false,
        dueDate: "June 19, 2026",
      },
    ],
  }),
  getters: {},
  actions: {},
});
