<template>
    <div class="w-50 m-auto">
        <div class="card card-body  shadow p-3 mb-5 bg-white rounded">
            <form>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" placeholder="Enter name" v-model="user.name"
                    :class="[{'is-invalid': errorsFor('name')}]">
                    <validation-errors :errors="this.errorsFor('name')"></validation-errors>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" placeholder="Enter email" v-model="user.email"
                    :class="[{'is-invalid': errorsFor('email')}]">
                    <validation-errors :errors="this.errorsFor('email')"></validation-errors>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Enter password" v-model="user.password"
                    :class="[{'is-invalid': errorsFor('password')}]">
                    <validation-errors :errors="this.errorsFor('password')"></validation-errors>
                </div>
                <div class="form-group">
                    <label for="password">Retype Password</label>
                    <input type="password" class="form-control" id="password_confirmation" name="password_confirmation"
                        placeholder="Confirm password" v-model="user.password_confirmation"
                        :class="[{'is-invalid': errorsFor('password_confirmation')}]">
                    <validation-errors :errors="this.errorsFor('password_confirmation')"></validation-errors>
                </div>
                <button class="btn btn-primary btn-block" :disabled="isLoading" @click.prevent="register">Register</button>
                <hr/>
                <div><i class="fas fa-pen"></i> Have account? <router-link :to="{name: 'login'}">Login</router-link></div>
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
            user: {
                email: null,
                password: null,
                password_confirmation: null,
                name: null
            },
            isLoading: false,
        }
    },
    methods: {
        async register() {
            this.isLoading = true;
            this.errors = null;
            try {
                const response = await axios.post('/register', this.user);
                if(response.status == 201) {
                    logIn();
                    this.$store.dispatch("loadUser");
                    this.$router.push({name: 'home'})
                }
            } catch (error) {
                this.errors = error.response && error.response.data.errors;
            }
            this.isLoading = false;
        }
    }
}
</script>