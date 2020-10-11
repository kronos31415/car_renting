<template>
    <div>
        <h6 class="text-secondary text-uppercase text-center font-weight-bold">price breakdown</h6>
        <div v-for="(days, price) in price.breakdown"
            :key="price"
            class="pt-2 pb-2 border-bottom border-top d-flex justify-content-between">
            <span>{{days}} <i class="fas fa-times"></i> ${{price}}</span>
            <span>${{days * price}}</span>
        </div>
        <div class="pt-2 pb-2 border-bottom border-top d-flex justify-content-between">
            <span class="font-weight-bold">Total: <i class="fas fa-calculator"></i></span>
            <span>${{price.price}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        price: Object,
    }
}
</script>