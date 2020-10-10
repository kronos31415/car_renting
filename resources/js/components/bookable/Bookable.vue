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
            <transition name="fade">
                <price-breakdown v-if="price" :price="price" class="pt-4 pb-4"></price-breakdown>
            </transition>
            <transition name="fade">
                <button v-if="price" class=" mt-4 btn btn-block btn-outline-primary">BOOK NOW</button>
            </transition>
            
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
            console.log(hasAvailability)
            console.log(this.lastSearch.from)
            if(!hasAvailability) {
                this.price = null;
                return
            }
            try {
                this.price = (await axios.get(`/api/bookables/${this.bookable.id}/price?from=${this.lastSearch.from}&to=${this.lastSearch.to}`)).data;
            } catch(err) {
                this.price = null;
            }
        }
    },
    computed: 
        mapState({
            lastSearch: "lastSearch"
        })
    ,
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