<template>
    <div class="w-50 m-auto">
        <div class="card card-body d-flex">
            <form>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" placeholder="Enter email" v-model="email">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Enter password" v-model="password">
                </div>
                <button class="btn btn-primary btn-block">Login</button>
                <hr/>
                <div><i class="fas fa-pen"></i> No account yet? <router-link :to="{name: 'home'}">Register</router-link></div>
                <div><i class="fas fa-brain"></i> Forgot Password? <router-link :to="{name: 'home'}">Reset Password</router-link></div>
            </form>
        </div>
        
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            email: null,
            password: null
        }
    }
}
</script>