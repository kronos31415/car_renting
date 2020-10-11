<template>
    <div class="row">
        <div class="col-md-8 pb-3">
            <div class="card">
                <div class="card-body">
                    <div v-if="!isLoading">
                        <h4>{{bookable.title}}</h4>
                        <hr/>
                        <article>{{bookable.description}}</article>
                    </div>
                    <div v-else>
                        Loading...
                    </div>
                </div>
            </div>
            <review-list :bookableId="this.$route.params.id"></review-list>
        </div>
        <div class="col-md-4 pb-3">
            <availability :bookableId="this.$route.params.id" @availability="checkPrice"></availability>
            <transition>
                <price-breakdown v-if="price" :price="price" class="pt-4 pb-4"></price-breakdown>
            </transition>
            <transition name="fade">
                <button v-if="price" :disabled="isInBasketAlready" class=" mt-4 btn btn-block btn-outline-primary" @click.prevent="addToBasket">BOOK NOW</button>
            </transition>

            <transition name="fade">
                <button v-if="isInBasketAlready" :disabled="!isInBasketAlready" class=" mt-4 btn btn-block btn-outline-primary" @click.prevent="removeFromBasket">Remove</button>
            </transition>
            <div v-if="isInBasketAlready" class="mt-4 text-muted text-danger warning">This Item is already added. To add with different days please remove first</div>
            
        </div>

    </div>
</template>
<script>
import Availability from "./Availability";
import ReviewList from "./ReviewList";
import PriceBreakdown from "./../shared/components/PriceBreakdown"
import {mapState} from "vuex";
export default {
    name: "Bookable",
    components: {
        Availability,
        ReviewList,
        PriceBreakdown
    },
    data: function() {
        return {
            bookable: null,
            isLoading: false,
            price: null
        }
    },
    methods: {
        async checkPrice(hasAvailability) {
            if(!hasAvailability) {
                this.price = null;
                return
            }
            try {
                this.price = (await axios.get(`/api/bookables/${this.bookable.id}/price?from=${this.lastSearch.from}&to=${this.lastSearch.to}`)).data;
            } catch(err) {
                this.price = null;
            }
        },
        addToBasket() {
            this.$store.dispatch('addToBasket', {
                bookable: this.bookable,
                dates: this.lastSearch,
                price: this.price
            })
        },
        removeFromBasket() {
            this.$store.dispatch('removeFromBasket', this.bookable.id)
        }
    },
    computed: {
        ...mapState({
            lastSearch: "lastSearch",
            
        }),
        isInBasketAlready() {
            if(this.bookable == null) {
                return false;
            }
            return this.$store.getters.isInBasketAlready(this.bookable.id);
        }
    },
    created() {
        this.isLoading = true;
        axios.get(`/api/bookables/${this.$route.params.id}`)
            .then(response => {
                this.bookable = response.data;
                this.isLoading = false;
            })
            .catch(error => consol.log(error));
    }
}
</script>

<style scoped>
    .warning {
        font-size: 0.8rem;
        color: red
    }
</style>