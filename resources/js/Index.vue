<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
            <router-link :to="{name: 'home', params: {}}" class="navbar-brand mr-auto">Link to Home PAge</router-link>
            <router-link class="btn nav-button" :to="{name: 'home', params: {}}">
               <i class="fas fa-shopping-cart fa-lg"></i>
               <span v-if="itemsInBasket" class="badge badge-pill badge-success">{{itemsInBasket}}</span>
            </router-link>
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
            lastSearchComputed: "lastSearch"
        }),
        ...mapGetters({
            itemsInBasket: "itemsInBasket"
        })
    },
    beforeCreate() {
        this.$store.dispatch('loadStoredState')
    }
}
</script>