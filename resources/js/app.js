require('./bootstrap');
import router from "./routes";
import VueRouter from 'vue-router';
import Index from "./Index";
import moment from "moment";
import StarRating from "./components/shared/components/StarRating"
import FatalError from "./components/shared/components/FatalError"
import Success from "./components/shared/components/Success.vue"
import ValidationErrors from "./components/shared/components/ValidationErrors.vue"

window.Vue = require('vue');
Vue.filter("fromNowDate", value => moment(value).fromNow());

Vue.use(VueRouter);
Vue.component("star-rating", StarRating);
Vue.component("fatal-error", FatalError);
Vue.component("success", Success)
Vue.component("validation-errors", ValidationErrors)
const app = new Vue({
    el: '#app',
    router,
    components: {
        Index
    }
});