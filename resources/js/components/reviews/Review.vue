<template>
    <div>
        <div v-if="isLoading">Loading...</div>
        <div v-else>
            <div v-if="alreadyReviewed">
                <span>You have already reviewed that bookable</span>
            </div>
            <div v-else>
                <div class="form-group">
                    <label for="rating" class="text-muted">What is your score for (5 is thebest, 1 is worst)</label>
                    <star-rating :rating="review.rating" class="fa-3x" @rating-change="review.rating = $event"></star-rating>
                </div>
                <div class="form-group">
                    <label for="content" class="text-muted">Content</label>
                    <textarea class="form-control" id="content" rows="6"></textarea>
                </div>
                <div class="btn btn-primary btn-block">SEND REVIEW</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            review: {
                rating: 5,
                content: null
            },
            existingReview: null,
            isLoading: false
        }
    },
    methods: {
        
    },
    created: function() {
        this.isLoading = true;
        axios.get(`/api/reviews/${this.$route.params.id}`)
            .then(response => {
                console.log(response)
                this.existingReview = response.data})
            .catch(error => console.log(error))
            .then(() => this.isLoading = false);
    },
    computed: {
        alreadyReviewed: function() {
            return this.existingReview != null;
        }
    }
}
</script>