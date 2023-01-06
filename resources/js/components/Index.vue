<template>
<div>
    <router-link class="btn btn-success m-2" :to="{name: 'get.index'}">Get</router-link>
    <router-link class="btn btn-success m-2" v-if="!token" :to="{name: 'user.login'}">Login</router-link>
    <router-link class="btn btn-success m-2" v-if="token" :to="{name: 'user.personal'}">Personal</router-link>
    <router-link class="btn btn-success m-2" v-if="!token" :to="{name: 'user.registration'}">Registration</router-link>
    <a class="btn btn-success m-2" v-if="token" @click.prevent="logout" href="#" >Logout</a>
<!--    <router-view></router-view>-->
    <router-view :key="$route.fullPath" ></router-view>
</div>
</template>

<script>
export default {
    name: "Index",

    data() {
      return{
          token: null
      }
    },

    mounted() {
        this.getToken()
    },

    // если чтото поменялось, необходио апдейтить
    updated() {
        console.log('Update token')
        this.getToken() // заново подгружаем токен (нужно для обновления состояния кнопок)
    },

    methods: {
        getToken(){
          this.token = localStorage.getItem('x_xsrf_token')
        },

      logout(){
        axios.post('/logout')
            .then( res => {
                // перед выходом пользователя, удаляем из localStorage его x-xsrf-token (уникальный идентификатор)
                localStorage.removeItem('x_xsrf_token');
                // перенаправляем пользователя на страницу логин
                this.$router.push({ name: 'user.login'} )
            })
      },
    },
}
</script>

<style scoped>

</style>
