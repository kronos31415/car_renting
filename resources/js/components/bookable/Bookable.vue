<template>
    <div class="row">
        <div class="col-md-8 pb-3">
            <div class="card">
                <div class="card-body">
                    <div v-if="!isLoading">
                        <h4>{{bookable.title}}</h4>
                        <hr/>
                        <article>{{bookable.description}}</article>
                    </div>
                    <div v-else>
                        Loading...
                    </div>
                </div>
            </div>
            <review-list></review-list>
        </div>
        <div class="col-md-4 pb-3">
            <availability></availability>
        </div>

    </div>
</template>
<script>
import Availability from "./Availability";
import ReviewList from "./ReviewList";
export default {
    name: "Bookable",
    components: {
        Availability,
        ReviewList
    },
    data: function() {
        return {
            bookable: null,
            isLoading: false,
        }
    },
    created() {
        this.isLoading = true;
        axios.get(`/api/bookables/${this.$route.params.id}`)
            .then(response => {
                this.bookable = response.data;
                this.isLoading = false;
            })
            .catch(error => consol.log(error));
    }
}
</script>