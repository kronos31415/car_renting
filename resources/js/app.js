require('./bootstrap');
import router from "./routes";
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Index from "./Index";
import moment from "moment";
import StarRating from "./components/shared/components/StarRating"
import FatalError from "./components/shared/components/FatalError"
import Success from "./components/shared/components/Success.vue"
import ValidationErrors from "./components/shared/components/ValidationErrors.vue"
import storeDefiniton from "./store.js"
import Axios from "axios";

window.Vue = require('vue');
Vue.filter("fromNowDate", value => moment(value).fromNow());

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.component("star-rating", StarRating);
Vue.component("fatal-error", FatalError);
Vue.component("success", Success)
Vue.component("validation-errors", ValidationErrors)

const store = new Vuex.Store(storeDefiniton);

window.axios.interceptors.request.use(
    response => response,
    error => {
        if (error.response.status == 401) {
            this.$store.dispatch('logout');
        }
        return Promise.reject(error)
    }
)

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        Index
    },
    async beforeCreate() {
        this.$store.dispatch('loadUser')
    }
});