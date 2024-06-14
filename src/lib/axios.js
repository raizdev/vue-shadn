import { useToast } from '@/components/ui/toast/use-toast'
import { useAuthStore } from '@/stores';
import { router } from '../router';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_SERVER;
axios.defaults.withCredentials = true;

axios.interceptors.request.use((request) => {
    const { user, token } = useAuthStore();

    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
});

axios.interceptors.response.use(
    function (res) {
        return res.data.data;
    },
    async (err) => {

        const { toast } = useToast()

        toast({
            class: "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
            title: 'Error orcurred!',
            description: err.response.data.errors[0].message,
            variant: 'destructive'
        });

        return Promise.reject(err);
    }
);
