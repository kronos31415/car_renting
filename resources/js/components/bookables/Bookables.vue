<template>
    <div>
        <div v-if="isLoading">Loading...</div>
        <div v-else>
            <div class="row" v-for="row in rows" :key="row + 'row'">
                <div class="col" 
                    v-for="(bookable, index) in bookablesInRow(row)" 
                    :key="index">
                        <bookable-list-item 
                            :title="bookable.title" 
                            :description="bookable.description" 
                            :id="bookable.id">
                        </bookable-list-item>
                </div>
                <div class="col" v-for="placeholder in placeholders(row)" :key="placeholder + 'ph'"></div>
            </div>
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
    methods: {
        bookablesInRow: function(row) {
            return this.bookables.slice((row - 1) * this.columns, row * this.columns);
        },
        placeholders: function(row) {
            return  this.columns - this.bookablesInRow(row).length;
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
        axios.get("/api/bookables")
            .then(response => {
                this.bookables = response.data;
                this.isLoading = false;
            })
    }
}
</script>