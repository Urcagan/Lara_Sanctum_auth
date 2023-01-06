<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">

                <div class="card">
                    <div class="card-header">Login</div>
                    <div class="row mb-3">
                        <label for="email" class="col-md-4 col-form-label text-md-end">Email Address</label>
                        <div class="col-md-6">
                            <input v-model="email" type="email" placeholder="email" class="form-control mt-2">
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="password" class="col-md-4 col-form-label text-md-end">Password</label>
                        <div class="col-md-6">
                            <input v-model="password" type="password" placeholder="password" class="form-control">
                        </div>
                    </div>
                    <div class="row mb-1">
                        <div class="col-md-8 offset-md-4">
                            <input @click.prevent="login" type="submit" value="login" class="btn btn-primary mb-2">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
export default {
    name: "Login",

    data() {
        return {
            email: null,
            password: null,
        }
    },

    methods: {
        login() {
            axios.get('/sanctum/csrf-cookie')
                .then(response => {
                    // Login...
                    axios.post('/login', {email: this.email, password: this.password})
                        .then(r => {
                            // console.log(r.config.headers['X-XSRF-TOKEN']);
                            localStorage.setItem('x_xsrf_token', r.config.headers['X-XSRF-TOKEN']); //записываем x-xsrf-token в localStorage при логине пользователя (это уникальный идентификатор)
                            this.$router.push({ name: 'user.personal'} ) // редиректит залогиненого пользователя на его станицу
                        })
                        .catch(err => {
                            // console.log(err.response.data.message);
                        })
                });
        },
    },
}
</script>

<style scoped>

</style>
