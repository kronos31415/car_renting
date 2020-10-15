<template>
    <div class="w-50 m-auto">
        <div class="card card-body  shadow p-3 mb-5 bg-white rounded">
            <form>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" placeholder="Enter email" v-model="email"
                    :class="[{'is-invalid': errorsFor('email')}]">
                    <validation-errors :errors="this.errorsFor('email')"></validation-errors>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Enter password" v-model="password"
                    :class="[{'is-invalid': errorsFor('password')}]">
                    <validation-errors :errors="this.errorsFor('password')"></validation-errors>
                </div>
                <button class="btn btn-primary btn-block" :disabled="isLoading" @click.prevent="login">Login</button>
                <hr/>
                <div><i class="fas fa-pen"></i> No account yet? <router-link :to="{name: 'register'}">Register</router-link></div>
                <div><i class="fas fa-brain"></i> Forgot Password? <router-link :to="{name: 'reset'}">Reset Password</router-link></div>
            </form>
        </div>
        
    </div>
</template>
<script>
import validationErrorMixin from "./../shared/mixins/validationErrorMixin"
import { logIn } from "./../shared/utils/auth"
export default {
    mixins: [validationErrorMixin],
    data: function() {
        return {
            email: null,
            password: null,
            isLoading: false,
        }
    },
    methods: {
        async login() {
            this.isLoading = true;
            this.errors = null;
            try {
                await axios.get('/sanctum/csrf-cookie');
                await axios.post('/login', {
                    email: this.email,
                    password: this.password
                });
                logIn();
                this.$store.dispatch("loadUser");
                this.$router.push({name: 'home'})
            } catch (error) {
                this.errors = error.response && error.response.data.errors;
            }
            this.isLoading = false;
        }
    }
}
</script>