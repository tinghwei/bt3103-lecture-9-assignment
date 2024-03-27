import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import OnlyProfit from "@/views/OnlyProfit.vue";
import Login from "@/components/Login.vue";
import LogOut from "@/components/LogOut.vue";
import NotFound from "@/views/NotFound.vue";
import Profile from "@/views/Profile.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/logout",
    name: "Logout",
    component: LogOut,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/profit",
    name: "OnlyProfit",
    component: OnlyProfit,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
