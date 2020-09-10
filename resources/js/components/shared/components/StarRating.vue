<template>
    <div class="d-flex">
        <i class="fas fa-star" v-for="(star, index) in fullStars" :key="index + 'full'"></i>
        <i class="fas fa-star-half-alt" v-if="halfStar"></i>
        <i class="far fa-star" v-for="(star, index) in emptyStars" :key="index  + 'empty'"></i>
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
            console.log(fraction, "polowka")
            return fraction > 0.5 && fraction < 1;
        },
        fullStars() {
            console.log(Math.round(this.rating), "full")
            return Math.round(this.rating);
        },
        emptyStars() {
            console.log(5 - Math.ceil(this.rating), "empty")
            return 5 - Math.ceil(this.rating);
        }

    }
}
</script>