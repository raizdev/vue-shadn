<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { useAuthStore } from '@/stores';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const authStore = useAuthStore();

definePage({
    name: 'sign-in',
    meta: {
        middleware: 'guest',
        layout: 'AuthLayout'
    }
});

const formSchema = toTypedSchema(
    z.object({
        username: z.string().min(2).max(50),
        password: z.string().min(2).max(50)
    })
);

const form = useForm({
    validationSchema: formSchema
});

const onSubmit = form.handleSubmit((values) => {
    return authStore.login(values);
});
</script>

<template>
    <div class="grid gap-2 text-center">
        <h1 class="text-3xl font-bold">Login</h1>
        <p class="text-balance text-muted-foreground">Enter your email below to login to your account</p>
    </div>
    <div class="grid gap-4">
        <form @submit="onSubmit">

            <FormField v-slot="{ componentField }" name="username">
                <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input type="text" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="password">
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input type="password" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <Button type="submit" class="w-full my-4"> Submit </Button>
        </form>
    </div>
    <div class="mt-4 text-center text-sm">
        Don't have an account?
        <a href="#" class="underline"> Sign up </a>
    </div>
</template>
