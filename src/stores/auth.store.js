import { defineStore } from 'pinia';
import { router } from '@/router';
import axios from 'axios';

export const useAuthStore = defineStore('authStore', () => {

    const user = ref();
    const token = ref(localStorage.getItem('token') || '')

    const authenticated = computed(() => !!token.value && !!user);

    const login = async (values) => {
        try {
            const response = await axios.post('/auth/sign-in', values)
            finalize(response);
        } catch(_) {
        }
    }

    const registration = async (values) => {
        try {
            const response = await axios.post('/auth/registration', values)
            finalize(response);
        } catch(_) {}
    }

    const initialize = async () => {
        if (token.value) {
            try {
                const response = await axios.get('/auth/me')
                user.value = response.user;
            } catch (_) {
                logout();
            }
        }
    };

    const finalize = (response) => {
        /* Set user and token */
        user.value = response.user;
        token.value = response.token;

        localStorage.setItem('token', response.token);

        // roles needs to be done
        return router.push({ name: 'dashboard' });
    }

    const logout = () => {
        (user.value = ''), (token.value = '')
        
        localStorage.removeItem('token');

        return router.push({ name: 'sign-in' });
    };

    return { 
        user, 
        token, 
        authenticated, 
        initialize, 
        logout, 
        login, 
        registration 
    };
});
