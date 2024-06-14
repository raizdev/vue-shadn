import App from './App.vue';

import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';
import { router } from '@/router';
import { useAuthStore } from '@/stores';

import './assets/index.scss';
import './lib/axios';

const pinia = createPinia();

pinia.use(({ store }) => {
    store.router = markRaw(router);
});

const app = createApp(App);
app.use(pinia);

const auth = useAuthStore();
auth.initialize().then(() => {
    app.use(router);
    app.mount('#app');
});
