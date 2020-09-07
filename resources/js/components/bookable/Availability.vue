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
                    :class="[{'is-invalid': this.hasErrors}]">
                <div class="invalid-feedback d-flex" v-for="(error, i) in this.errorsFor('from')" :key="'from' + i">
                    {{error}}
                </div>
            </div>
            <div class="form-group col-md-6">
                <label for="to">TO</label>
                <input type="date" class="form-control form-control-sm" placeholder="To date"
                    v-model="to"
                    v-on:keyup.enter="check"
                    :class="[{'is-invalid': this.errorsFor('to')}]">
                    <div class="invalid-feedback d-flex" v-for="(error, i) in this.errorsFor('to')" :key="'to' + i">
                        {{error}}
                    </div>
            </div>
            <button class="btn btn-secondary btn-block mr-1 ml-1" @click.prevent="check" :disabled="isLoading">CHECK</button>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            from: null,
            to: null,
            status: null,
            errors: null,
            isLoading: false
        }
    }, 
    methods: {
        check: function() {
            this.errors = null;
            this.isLoading = true;
            axios.get(`/api/bookables/${this.$route.params.id}/availability?from=${this.from}&to=${this.to}`)
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
        },
        errorsFor: function(field) {
            return this.hasErrors && this.errors[field] ? this.errors[field] : null;
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