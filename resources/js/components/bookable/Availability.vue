<template>
    <div>
        <h6 class="text-secondary text-uppercase text-center font-weight-bold">Check availability
            <span class="text-success" v-if="hasAvailability">(AVAILABLE)</span>
            <span class="text-danger" v-if="noAvailability">(NOT AVAILABLE)</span>
        </h6>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="from">FROM</label>
                <input type="date" class="form-control form-control-sm" id="from" placeholder="From date"
                    v-model="from"
                    v-on:keyup.enter="check"
                    :class="[{'is-invalid': this.errorsFor('from')}]">
                <validation-errors :errors="this.errorsFor('from')"></validation-errors>
            </div>
            <div class="form-group col-md-6">
                <label for="to">TO</label>
                <input type="date" class="form-control form-control-sm" placeholder="To date"
                    v-model="to"
                    v-on:keyup.enter="check"
                    :class="[{'is-invalid': this.errorsFor('to')}]">
                    <validation-errors :errors="this.errorsFor('to')"></validation-errors>
            </div>
            <button class="btn btn-secondary btn-block mr-1 ml-1" @click.prevent="check" :disabled="isLoading">CHECK</button>
        </div>
    </div>
</template>

<script>
import validationErrorMixin from "./../shared/mixins/validationErrorMixin"
export default {
    mixins: [validationErrorMixin],
    data: function() {
        return {
            from: this.$store.state.lastSearch.from,
            to: this.$store.state.lastSearch.to,
            status: null,
            isLoading: false
        }
    }, 
    props: {
        bookableId: [String, Number]
    },
    methods: {
        check: function() {
            this.errors = null;
            this.isLoading = true;
            this.$store.dispatch('setLastSearchGlobaly', {
                from: this.from,
                to: this.to
            })
            console.log(this.$store.state.lastSearch);
            axios.get(`/api/bookables/${this.bookableId}/availability?from=${this.from}&to=${this.to}`)
                .then(response => {
                    this.status = response.status;
                })
                .catch(error => {
                    if (422 === error.response.status) {
                        this.errors = error.response.data.errors;
                    }
                    this.status = error.response.status;
                })
                .then(() => this.isLoading = false);
        }
    },
    computed :{
        hasErrors() {
            return 422 == this.status && this.errors != null;
        },
        hasAvailability() {
            return 200 == this.status;
        },
        noAvailability(){
            return 404 == this.status;
        }
    }
}
</script>
<style scoped>
    label {
        font-size: 0.8rem;
        text-transform: uppercase;
        color: gray;
        font-weight: bolder;
    }
</style>