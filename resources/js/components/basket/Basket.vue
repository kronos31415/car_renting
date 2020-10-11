<template>
    <div>
        <div class="row">
            <div class="col-md-7">
                Checkout Form
            </div>
            <div class="col-md-5">
                <div class="d-flex justify-content-between">
                    <h6 class="text-uppercase text-secondary font-weight-bolder">Your Cart</h6>
                    <h6 class="badge badge-secondary text-uppercase">
                        <span v-if="itemsInBasket">Items {{itemsInBasket}}</span>
                        <span v-else>Empty {{itemsInBasket}}</span>
                    </h6>
                </div>
                <transition-group tag="div">
                    <div v-for="(item, index) in basket" :key="index + item.price">
                        <div class="pt-2 pb-2 border-top d-flex justify-content-between">
                            <span>
                                <router-link :to="{name: 'bookable', params: {id: item.bookable.id}}"> {{item.bookable.title}} </router-link>
                            </span>
                            <span class="">
                                <i class="fas fa-dollar-sign"></i> {{item.price.price | decimalAmount}}
                            </span>
                        </div>

                        <div class="pt-2 pb-2 d-flex justify-content-between">
                            <span class="date">
                                From: <i class="far fa-calendar-check"></i> {{item.dates.from}}
                            </span>
                            <span class="date">
                                To: <i class="far fa-calendar-check"></i> {{item.dates.to}}
                            </span>
                        </div>
                        <div class="pt-2 pb-2 text-right">
                            <button class="btn btn-sm btn-outline-secondary" title="delete Item" @click.prevent="removeFromBasket(item.bookable.id)">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                </transition-group>
                <div class="pt-2 pb-2 d-flex justify-content-between border-top summary">
                            <span>Total: <i class="fas fa-calculator"></i></span>
                            <span><i class="fas fa-dollar-sign"></i> {{totalPrice | decimalAmount}}</span>
                        </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
    computed: {
        ...mapState({
            basket: state => state.basket.items
        }),
        ...mapGetters({
            itemsInBasket: 'itemsInBasket',
            totalPrice: 'getTotalPrice'
        })
    },
    methods: {
        ...mapActions([
            'removeFromBasket'
        ])
    },
    filters: {
        decimalAmount: function (value) {
            return value.toFixed(2)
        }
    }
}
</script>
<style scoped>
    .date {
        font-size: 0.7rem;
    }
    a {
        color:gray;
        text-decoration: none;
    }
    i:hover {
        cursor: pointer;
    }
    .summary {
        font-size: 1.2rem;
    }
</style>