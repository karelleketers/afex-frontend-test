import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        }, {
            path: "/home",
            redirect: "/",
        },{
            path: "/:catchall(.*)*",
            name: "Not Found",
            component: NotFoundView,
        }
    ]
})

export default router;