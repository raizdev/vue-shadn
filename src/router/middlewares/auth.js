import { useAuthStore } from '@/stores';

export default function ({ from, to, next, router }) {
    const { authenticated } = useAuthStore();

    if (!authenticated) router.push({ name: 'sign-in' });

    return next();
}
