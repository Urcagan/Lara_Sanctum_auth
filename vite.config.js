import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [
        laravel( ['resources/js/app.js']),
        vue({
            template: {
                transformAssetUrls: {
                    // The Vue plugin will re-write asset URLs, when referenced
                    // in Single File Components, to point to the Laravel web
                    // server. Setting this to `null` allows the Laravel plugin
                    // to instead re-write asset URLs to point to the Vite
                    // server instead.

                    // Плагин Vue переписывает URL-адреса активов, когда они
                    // упоминаются в компонентах одного файла, чтобы они указывали
                    // на веб-сервер Laravel. Установка для этого параметра значения
                    // «null» позволяет плагину Laravel вместо этого переписывать
                    // URL-адреса активов, чтобы они указывали на сервер Vite.
                    base: null,

                    // The Vue plugin will parse absolute URLs and treat them
                    // as absolute paths to files on disk. Setting this to
                    // `false` will leave absolute URLs un-touched so they can
                    // reference assets in the public directory as expected.

                    // Плагин Vue будет анализировать абсолютные URL-адреса и
                    // рассматривать их как абсолютные пути к файлам на диске.
                    // Установка для этого параметра значения «false» оставит
                    // абсолютные URL-адреса нетронутыми, чтобы они могли
                    // ссылаться на ресурсы в общедоступном каталоге, как и
                    // ожидалось.
                    includeAbsolute: false,
                },
            },
        }),
    ],
});


// import { defineConfig } from 'vite';
// import laravel from 'laravel-vite-plugin';
//
// export default defineConfig({
//     plugins: [
//         laravel({
//             input: [
//                 'resources/sass/app.scss',
//                 'resources/js/app.js',
//             ],
//             refresh: true,
//         }),
//     ],
// });
