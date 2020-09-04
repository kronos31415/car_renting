<template>
    <div>
        <div class="card text-white bg-success mb-3">
            <div class="card-body">
                <div class="card-title"><h5>{{ itemTitle }}</h5></div>
                <div class="card-text">{{ itemDescription }}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "BookableListItem",
    props: {
        itemTitle: String,
        itemDescription: String,
        price: Number
    }
}
</script>