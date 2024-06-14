import { defineStore } from 'pinia';
import { router } from '@/router';
import axios from 'axios';

export const useAuthStore = defineStore('authStore', () => {

    const user = ref();
    const token = ref(localStorage.getItem('token') || '')

    const authenticated = computed(() => !!token.value && !!user);

    const login = async (values) => {
        const res = await axios.post('/auth/sign-in', values)

        try {
            token.value = res.token, user.value  = res.user
            localStorage.setItem('token', res.token);

            return router.push({ name: 'dashboard' })
        } catch(_) {
        }
    }

    const initialize = async () => {
        if (token.value) {
            try {
                const res = await axios.get('/auth/me')
                user.value = res.user;
            } catch (_) {
                logout();
            }
        }
    };

    const logout = () => {
        (user.value = ''), (token.value = '')
        
        localStorage.removeItem('token');

        return router.push({ name: 'sign-in' });
    };

    return { user, token, authenticated, initialize, logout, login };
});
