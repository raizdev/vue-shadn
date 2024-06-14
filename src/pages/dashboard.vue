<template>Dashboard</template>

<script setup>
definePage({
    name: 'dashboard',
    meta: {
        middleware: 'auth',
        layout: 'AppLayout'
    }
});
</script>
