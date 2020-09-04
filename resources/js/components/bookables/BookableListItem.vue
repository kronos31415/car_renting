<template>
    <div class="w-100">
        <div class="card text-white bg-danger mb-3">
            <div class="card-body">
                <router-link :to="{name:'bookable', params: {id: id}}">
                    <div class="card-title"><h5>{{ title }}</h5></div>
                </router-link>
                
                <div class="card-text">{{ description }}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "BookableListItem",
    props: {
        title: String,
        description: String,
        id: Number
    }
}
</script>
<style scoped>
    .card-body a {
        color: rgb(223, 219, 213);
    }
</style>