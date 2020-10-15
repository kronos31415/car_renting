<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
            <router-link :to="{name: 'home', params: {}}" class="navbar-brand mr-auto">Link to Home PAge</router-link>
            <ul class="navbar-nav">
                <li class="nav-item" v-if="isLoggedin">
                    <router-link class="nav-link basket" :to="{name: 'basket'}">
                        <i class="fas fa-shopping-cart fa-lg"></i>
                        <span v-if="itemsInBasket" class="badge badge-pill badge-success">{{itemsInBasket}}</span>
                    </router-link>
                </li>
                <li class="nav-item" v-if="!isLoggedin">
                    <router-link :to="{name: 'register'}"><button class="btn btn-primary btn-sm mr-2">Register</button></router-link>
                </li>
                <li class="nav-item" v-if="!isLoggedin">
                    <router-link :to="{name: 'login'}"><button class="btn btn-primary btn-sm">Login</button></router-link>
                </li>
                <li class="nav-item" v-if="isLoggedin">
                    <a href="#" class="nav-link" @click.prevent="logout"><button class="btn btn-primary btn-sm">Logout</button></a>
                </li>
            </ul>
        </nav>
        <div class="container mt-5 mb-5 pr-5 pl-5">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
import {mapGetters} from "vuex";
export default {
    data() {
        return {
            lastSearch: this.$store.state.lastSearch
        }
    },
    computed: {
        ...mapState({
            lastSearchComputed: "lastSearch",
            isLoggedin: 'isLoggedin'
        }),
        ...mapGetters({
            itemsInBasket: "itemsInBasket"
        })
    },
    methods: {
        async logout() {
            try {
                axios.post('/logout');
                this.$store.dispatch('logout');
                this.$router.push({name: 'login'})
            } catch (error) {
                this.$store.dispatch('logout');
                this.$router.push({name: 'login'})
            }
        }
    },
    beforeCreate() {
        this.$store.dispatch('loadStoredState')
    }
}
</script>
<style scoped>

    .basket:hover {
    animation: shake 0.5s ;
    transform: translate3d(0, 0, 0);
    }
    @keyframes shake {
        10%, 90% {
            transform: translate3d(-1px, 0, 0);
        }

        40%, 60% {
            transform: translate3d(4px, 0, 0);
        }
    }
</style>