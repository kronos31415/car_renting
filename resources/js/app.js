require('./bootstrap');
import router from "./routes";
import VueRouter from 'vue-router';
import Index from "./Index";
import moment from "moment";
import StarRating from "./components/shared/components/StarRating"

window.Vue = require('vue');
Vue.filter("fromNowDate", value => moment(value).fromNow());

Vue.use(VueRouter);
Vue.component("star-rating", StarRating);
const app = new Vue({
    el: '#app',
    router,
    components: {
        Index
    }
});