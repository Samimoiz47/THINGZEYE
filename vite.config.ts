import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/app.ts',
                'resources/css/app.css',
                'resources/css/main.css',
                'resources/css/neon-effects.css',  // Added neon-effects.css
                'public/css/loading-styles.css',
                'public/js/loading-manager.js'
            ],
            ssr: 'resources/js/ssr.ts',
            refresh: true,
        }),
        tailwindcss(),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    server: {
        host: '0.0.0.0',
        port: 3000,
        hmr: {
            host: 'localhost'
        }
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'vue-vendor': ['vue', '@vueuse/core'],
                    'inertia-vendor': ['@inertiajs/vue3', 'ziggy-js'],
                }
            }
        }
    }
});
