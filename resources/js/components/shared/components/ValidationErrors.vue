<template>
    <div>
        <div class="invalid-feedback" 
        v-for="(error, i) in errors" :key="key(i)">
            {{error}}
        </div>
    </div>
</template>

<script>
export default {
    props: ["errors"],
    methods: {
        key(index) {
            return `validation${index}${Math.random()}`
        }
    }
}
</script>

<style scoped>
.form-control.is-invalid ~ div > .invalid-feedback {
    display: block;
}
    
</style>