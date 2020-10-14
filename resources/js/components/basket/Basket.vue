<template>
    <div>
        <div class="row shadow p-3 mb-5 rounded">
            <div class="col-md-7" v-if="itemsInBasket">
                Checkout Form
                <!-- first name and last name -->
                <div class="row">
                    <div class="col-md-6 form-group-row">
                        <label for="first_name">First Name</label>
                        <input type="text" class="form-control" id="first_name" placeholder="First Name..." v-model="customer.first_name">
                    </div>
                    <div class="col-md-6 form-group">
                        <label for="last_name">Last Name</label>
                        <input type="text" class="form-control" id="last_name" placeholder="Last Name..." v-model="customer.last_name">
                    </div>
                </div>

                <!-- Email  -->
                <div class="row">
                    <div class="col-md-12 form-group">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" id="email" placeholder="Email..." v-model="customer.email">
                    </div>
                </div>

                <!-- Street and City -->
                <div class="row">
                    <div class="col-md-6 form-group">
                        <label for="city">City</label>
                        <input type="text" class="form-control" id="city" placeholder="City..." v-model="customer.city">
                    </div>
                    <div class="col-md-6 form-group">
                        <label for="street">Street</label>
                        <input type="text" class="form-control" id="street" placeholder="Street..." v-model="customer.street">
                    </div>
                </div>

                <!-- Country State Zip -->
                <div class="row">
                    <div class="col-md-6 form-group">
                        <label for="country">Country</label>
                        <input type="text" class="form-control" id="country" placeholder="Country..." v-model="customer.country">
                    </div>
                    <div class="col-md-4 form-group">
                        <label for="state">State</label>
                        <input type="text" class="form-control" id="state" placeholder="State..." v-model="customer.state">
                    </div>
                    <div class="col-md-2 form-group">
                        <label for="zip">Zip</label>
                        <input type="text" class="form-control" id="zip" placeholder="Zip..." v-model="customer.zip">
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12 form-group">
                        <button type="submit" class="btn btn-info btn-block" @click.prevent="book">Book now</button>
                    </div>    
                </div>
            </div>
            <div class="col-md-7" v-else>
                <div class="jumbotron jumbotron-fluid text-center">
                    <h2>Empty basket</h2>
                </div>
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
import validationErrors from "./../shared/mixins/validationErrorMixin";
export default {
    mixins: [validationErrors],
    data: function() {
        return {
            isLoading: false,
            customer: {
                first_name: null,
                last_name: null,
                email: null,
                city: null,
                street: null,
                country: null,
                state: null,
                zip: null
            }
        }
    },
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
        async book() {
            this.isLoading = true;

            try {
                await axios.post('/api/checkout', {
                    customer: this.customer,
                    bookings: this.basket.map(basketItem => ({
                        bookable_id: basketItem.bookable.id,
                        from: basketItem.dates.from,
                        to: basketItem.dates.to
                    }))
                })
            } catch (err) {
                console.log(err)
            }
            
        },
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