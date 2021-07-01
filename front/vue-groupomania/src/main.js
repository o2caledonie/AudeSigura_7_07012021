import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const app = createApp(App);

app.use(router).use(store).mount('#app');

app.provide('notyf', new Notyf({
    duration: 3000,
    position: {
      x: "center",
      y: "top",
    },
  }));
