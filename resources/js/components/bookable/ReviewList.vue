<template>
    <div style="padding: 1.25rem">
        <h6 class="text-uppercase text-secondary font-weight-bolder pt-4"> REVIEW LIST</h6>
        <div v-if="isLoading">Loading...</div>
        <div v-else>
            <div class="border-bottom d-none d-md-block" v-for="(review, index) in reviews" :key="index">
                <div class="row pt-4">
                    <div class="col-md-6">Author: Pawcio</div>
                    <div class="col-md-6 d-flex justify-content-end">
                        <star-rating :rating="review.rating" class="fa-2x"></star-rating>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">{{review.created_at | fromNowDate}}</div>
                </div>
                <div class="row">
                    <div class="col-md-12 pt-4 pb-4">{{review.content}}</div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            reviews: null,
            isLoading: false,
        }
    },
    props: {
        bookableId: [String, Number]
    },
    created: function() {
        axios.get(`/api/bookables/${this.bookableId}/reviews`)
            .then(response => this.reviews = response.data)
            .catch(error => console.log(error));
    }
}
</script>