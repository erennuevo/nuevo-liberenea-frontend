import { createApp } from "vue";
import { createPinia } from "pinia";
import persistedState from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./routers/index.js";

const app = createApp(App);
const pinia = createPinia();

pinia.use(persistedState);

app.use(router);
app.use(pinia);

app.mount("#app");
