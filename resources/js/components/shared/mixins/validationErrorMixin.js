export default {
    data() {
        return {
            errors: null,
        }
    },
    methods: {
        errorsFor: function(field) {
            return this.errors != null && this.errors[field] ? this.errors[field] : null;
        }
    }
}