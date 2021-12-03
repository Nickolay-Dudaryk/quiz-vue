import { createRouter, createWebHashHistory } from "vue-router";
import Menu from "../components/pages/Menu.vue";
import Quiz from "../components/pages/Quiz.vue";
import Settings from "../components/pages/Settings.vue";

const routes = [
  {
    path: "/",
    name: "Menu",
    component: Menu,
  },
  {
    path: "/quiz",
    name: "Quiz",
    component: Quiz,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
