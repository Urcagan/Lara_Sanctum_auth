import {createRouter, createWebHistory} from "vue-router";

//   import notFound from '../components/notFound.vue';

const routes = [
    // Pages
    {
        path: "/get",
        name: 'get.index',
        component: () => import ('../components/Get.vue'),
    },
    {
        path: "/user/login",
        name: 'user.login',
        component: () => import('../components/Login.vue'),
    },
    {
        path: "/user/registration",
        name: 'user.registration',
        component: () => import('../components/Registration.vue'),
    },
    {
        path: "/user/personal",
        name: 'user.personal',
        component: () => import('../components/Personal.vue'),
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('x_xsrf_token') // берем токен из локального хранилища

        // проверяем наличие токина
    if(!token) { // если токена нет
        // и если пользователь хочет зайти на роуты  логина или регистрации (тоесть пользователь не зарегистрирован)
        if (to.name === 'user.login' || to.name === 'user.registration') {
            return next() // то пропускаем далее
        } else {
            return next( {          //  иначе принудительно отправляем пользователя на страницу логина
               name: 'user.login'
            })
        }
    }

    // если пользователь авторизован то у него сть токен
    // если пользовател хочет перейти на страници логина или регистрации и у него есть
    // токен, то отправляем него на его страницу.
    if(to.name === 'user.login' || to.name === 'user.registration' && token) {
        return next( {
            name: 'user.personal'
        })
    }

    next() // необходимо триггерить next

})

export default router
