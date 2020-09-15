<template>
    <div class="d-flex">
        <i class="fas fa-star" 
            v-for="(star, index) in fullStars" 
            :key="index + 'full'"
            @click="$emit('rating-change', star)">
        </i>
        <i class="fas fa-star-half-alt" v-if="halfStar"></i>
        <i class="far fa-star" 
            v-for="(star, index) in emptyStars" 
            :key="index  + 'empty'"
            @click="$emit('rating-change', fullStars + star)">
        </i>
    </div>
</template>

<script>
export default {
    props: {
        rating: Number
    },
    computed: {
        halfStar() {
            const fraction = Math.abs(this.rating - Math.ceil(this.rating));
            return fraction > 0.5 && fraction < 1;
        },
        fullStars() {
            return Math.round(this.rating);
        },
        emptyStars() {
            return 5 - Math.ceil(this.rating);
        }
    }
}
</script>