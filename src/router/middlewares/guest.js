import { useAuthStore } from '@/stores';

export default function ({ next, router }) {
    const { authenticated, token, user } = useAuthStore();
    console.log(token, user)
    if (authenticated) router.push({ path: 'dashboard' });

    return next();
}
