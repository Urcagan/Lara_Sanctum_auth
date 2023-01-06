<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">

                <div class="card">
                    <div class="card-header">Регистрация (Registration)</div>
                    <div class="row mb-3">
                        <label for="name" class="col-md-4 col-form-label text-md-end">Name</label>
                        <div class="col-md-6">
                            <input v-model="name" type="name" placeholder="name" class="form-control mt-2">
                        </div>
                    </div>
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
                    <div class="row mb-3">
                        <label for="password_confirmation" class="col-md-4 col-form-label text-md-end">Password
                            confirmation</label>
                        <div class="col-md-6">
                            <input v-model="password_confirmation" type="password"
                                   placeholder="password_confirmation" class="form-control">
                        </div>
                    </div>
                    <div class="row mb-1">
                        <div class="col-md-8 offset-md-4">
                            <input @click.prevent="register" type="submit" value="Registeration"
                                   class="btn btn-primary mb-2">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Registration",

    data() {
        return {
            name: null,
            email: null,
            password: null,
            password_confirmation: null,

        }
    },

    methods: {
        register() {
            axios.get('/sanctum/csrf-cookie')
                .then(response => {
                    //Registration
                    axios.post('/register', {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        password_confirmation: this.password_confirmation
                    })
                        .then( res => {
                            // console.log(res);
                            // После успешной регистрации записываем уникальный идентификатро в localStorage и перенаправляем пользователя на его страницу
                            localStorage.setItem('x_xsrf_token', res.config.headers['X-XSRF-TOKEN']); //записываем x-xsrf-token в localStorage при логине пользователя (это уникальный идентификатор)
                            this.$router.push({ name: 'user.personal'} ) // редиректит залогиненого пользователя на его станицу
                        })
                });
        },
    },
}
</script>

<style scoped>

</style>
