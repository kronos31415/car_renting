<template>
    <div>
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
</template>
<script>
export default {
    data: function() {
        return {
            review: {
                rating: 5,
                content: null
            }
        }
    },
    methods: {
        
    }
}
</script>