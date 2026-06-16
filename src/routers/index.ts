import { createRouter, createWebHistory } from "vue-router";

import Task1 from "../views/Task1.vue";
import TaskListView from "../views/TaskListView.vue";
import Homepage from "../views/Homepage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Homepage,
    },
    {
      path: "/task-counter",
      name: "task-counter",
      component: Task1,
    },
    {
      path: "/task-list",
      name: "task-list",
      component: TaskListView,
    },
  ],
});

export default router;
