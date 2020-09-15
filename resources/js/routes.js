import VueRouter from 'vue-router';
import Bookables from "./components/bookables/Bookables";
import Bookable from "./components/bookable/Bookable"
import Review from "./components/reviews/Review"

const routes = [{
        path: "/",
        component: Bookables,
        name: "home"
    },
    {
        path: "/bookable/:id",
        component: Bookable,
        name: "bookable"
    },
    {
        path: "/review/:id",
        component: Review,
        name: "review"
    }
]

const router = new VueRouter({
    routes: routes,
    mode: 'history'
})

export default router;