<template>
    <div>
        <div v-if="error"><fatal-error></fatal-error></div>
        <div class="row" v-else>
            <div :class="[{'col-md-4': oneColumn}, {'d-none': twoColumns}]">
                <div class="card">
                    <div class="card-body">
                        <div v-if="isloading">Loading...</div>
                        <div v-if="hasBooking">
                            <p>
                                Stayed at <router-link :to="{name: 'bookable', params: {id: booking.bookable.id}}">
                                {{booking.bookable.title}}
                            </router-link>
                            </p>
                            <p>
                                From {{booking.from}} to {{booking.to}}
                            </p>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div :class="[{'col-md-8': oneColumn}, {'col-md-12': twoColumns}]">

            <div>
                <div v-if="isloading">
                    Loading...
                </div>
                <div v-if="hasBooking">
                    <div v-if="alreadyReviewed">
                        <h3>You already reviewed this booking</h3>
                    </div>
                        <div v-else>
                            <div class="form-group">
                                <label class="text-dark">Slect what you think (1 star is bad, 5 i best)</label>
                                <star-rating :rating="review.rating" class="fa-3x" @rating-change="review.rating = $event"></star-rating>
            
                            </div>

                                
                            <div class="form-group">
                                <label for="content" class="text-dark">Please leave a coment:</label>
                                <textarea class="form-control" name="content" col="5" rows="3" v-model="review.content"></textarea>
                            </div>

                            <button class="btn btn-lg btn-primary btn-block" 
                                @click.prevent = "submit" 
                                :disabled="isloading">SAVE</button>
                        </div>
                        </div>
                </div>
        </div>
        </div>     
    </div>
</template>
<script>
import {is404, is422} from "./../shared/utils/response"
export default {
    data() {
        return {
            review: {
                id: null,
                rating: 5,
                content: null,
            },
            existingReview: null,
            isloading: false,
            booking: null,
            error: false,
            errors: null
        }
    },
    methods: {
        submit() {
            this.isloading = true;
            this.error = false;
            axios.post(`/api/reviews`, this.review)
                .then(response => console.log(response))
                .catch(err => {
                    if (is422(err)) {
                        const errors = err.response.data.errors;
                        if(errors["content"] && _.size(errors) === 1) {
                            this.errors = errors;
                            return;
                        }
                    }
                    this.error = true;
                })
                .then(() => this.isloading = false)
        },
        onRatingChanged(rating) {
            console.log(rating);
        }
    },
    created() {
        this.review.id = this.$route.params.id;
        this.isloading = true;
        axios.get(`/api/reviews/${this.review.id}`)
            .then(response => {this.existingReview = response.data})
            .catch(err => {
                if(is404(err)) {
                    return axios.get(`/api/booking-by-review/${this.review.id}`).then(response => {
                        this.booking = response.data;
                    }).catch((err) => {
                        if(!is404(err)) {
                            this.error = true;
                        }
                    })
                }
                this.error = true;
            })
            .then((response) => {
                console.log(response, "data"); 
                this.isloading = false
            })
    },
    computed: {
        alreadyReviewed() {
            return this.hasReviewed || !this.booking;
        },
        hasReviewed() {
            return this.existingReview != null;
        },
        hasBooking() {
            return this.booking != null;
        },
        oneColumn() {
            return this.isloading || !this.alreadyReviewed
        },
        twoColumns() {
            return !this.isloading && this.alreadyReviewed
        }
    }
}
</script>