<template>
    <div>
        <span>Number of rows: {{rows}}</span>
        <div v-if="isLoading">Loading...</div>
        <div v-else>
            <bookable-list-item 
            v-for="(bookable, index) in bookables"
            :key="index"
            :itemTitle="bookable.title" 
            :itemContent="bookable.content" 
            :price="1200">
        </bookable-list-item>
        </div>
    </div>
</template>

<script>
import BookableListItem from "./BookableListItem";
export default {
    components: {
        BookableListItem
    },
    data: function() {
        return {
            bookables: [],
            isLoading: false,
            columns: 3
        }
    },
    computed: {
        rows: function() {
            return (this.bookables == null) ? 0 : Math.ceil(this.bookables.length / this.columns)
        }
    },
    created() {
        this.isLoading = true;
        console.log("created")
        setTimeout(() => {
            this.bookables = [
            {
                title: "cheap AMG",
                content: "1000000 pln is a lot o money"
            },
            {
                title: "cheap RS3",
                content: "200 000 pln is a sales price"
            },
            {
                title: "cheap AMG",
                content: "1000000 pln is a lot o money"
            },
            {
                title: "cheap AMG",
                content: "1000000 pln is a lot o money"
            },
            {
                title: "cheap AMG",
                content: "1000000 pln is a lot o money"
            },
            {
                title: "cheap AMG",
                content: "1000000 pln is a lot o money"
            },
            {
                title: "cheap AMG",
                content: "1000000 pln is a lot o money"
            },
            {
                title: "cheap AMG",
                content: "1000000 pln is a lot o money"
            }
        ];
        this.isLoading = false;
        }, 2000)
    }
}
</script>