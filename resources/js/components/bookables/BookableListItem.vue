<template>
    <div>
        <div class="card text-white bg-success mb-3">
            <div class="card-body">
                <div class="card-title"><h2>{{ itemTitle }}</h2></div>
                <div class="card-text">{{ itemContent }}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "BookableListItem",
    props: {
        itemTitle: String,
        itemContent: String,
        price: Number
    }
}
</script>