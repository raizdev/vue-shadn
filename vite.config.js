import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';

import Layouts from 'vite-plugin-vue-layouts';
import vue from '@vitejs/plugin-vue';

import VueRouter from 'unplugin-vue-router/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        rollupOptions: {
            external: [/^node:.*/]
        }
    },
    css: {
        postcss: {
            plugins: [tailwind(), autoprefixer()]
        }
    },
    plugins: [
        Components({
            dirs: ['src/components'],
            deep: true
        }),
        AutoImport({
            imports: ['vue', 'vue-router']
        }),
        Layouts(),
        VueRouter({
            routesFolder: 'src/pages',
            importMode: 'sync'
        }),
        vue()
    ],
    base: '/',
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
});
