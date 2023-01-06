import _ from 'lodash';

window._ = _;

import 'bootstrap';

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from 'axios';
import router from "./router";

window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.withCredentials = true; // Необходимо добавить для sanctum (CORS)

// проверяем на ошибку если токен высох
// если токен стал недействительным, то бэк перестанет отвечать и это надо отлавить
// при такой ошибке надо удалить токен из localStorage и перенаправить пользователя на логин
window.axios.interceptors.response.use({}, err => {
    // console.log(err.response);
    // Проверяем статус ответа, если статус === 401 или 419 то перенаправляем пользователя на страницу логина
    if( err.response.status === 401 || err.response.status === 419 ) {
        // так же необходимо удалить токен из localStorage
        // для этого читаем его из локального хранилищя, проверяем на его наличие
        // и если он есть, то удаляем
        const token = localStorage.getItem('x_xsrf_token')
        if (token) {
            localStorage.removeItem('x_xsrf_token')
        }
        router.push({name: 'user.login'})
    }
})

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// import Pusher from 'pusher-js';
// window.Pusher = Pusher;

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: import.meta.env.VITE_PUSHER_APP_KEY,
//     wsHost: import.meta.env.VITE_PUSHER_HOST ?? `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
//     wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
//     wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
//     forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
//     enabledTransports: ['ws', 'wss'],
// });
