<template>
    <div>
        <h6 class="text-secondary text-uppercase text-center font-weight-bold">Check availability</h6>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="from">FROM</label>
                <input type="date" class="form-control form-control-sm" id="from" placeholder="From date"
                    v-model="from"
                    v-on:keyup.enter="check">
            </div>
            <div class="form-group col-md-6">
                <label for="to">TO</label>
                <input type="date" class="form-control form-control-sm" placeholder="To date"
                    v-model="to"
                    v-on:keyup.enter="check">
            </div>
            <button class="btn btn-secondary btn-block mr-1 ml-1" @click.prevent="check">CHECK</button>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            from: null,
            to: null
        }
    }, 
    methods: {
        check: function() {
            alert("Sprawdzam dostepnosc")
        }
    }
}
</script>
