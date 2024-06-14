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
    name: 'registration',
    meta: {
        middleware: 'guest',
        layout: 'AuthLayout'
    }
});

const formSchema = toTypedSchema(
    z.object({
        username: z.string().min(2).max(50),
        email: z.string().email(),
        password: z.string().min(4),
        password_confirmation: z.string().min(4),
    }).refine(
      (values) => {
        return values.password === values.password_confirmation;
      },
      {
        message: "Passwords must match!",
        path: ["password_confirmation"],
      }
    )
);

const form = useForm({
    validationSchema: formSchema
});

const onSubmit = form.handleSubmit((values) => {
    return authStore.registration(values);
});
</script>

<template>
    <div class="grid gap-2 text-center">
        <h1 class="text-3xl font-bold">Create account</h1>
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

            <FormField v-slot="{ componentField }" name="email">
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type="email" v-bind="componentField" />
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

            <FormField v-slot="{ componentField }" name="password_confirmation">
                <FormItem>
                    <FormLabel>Password Confirmation</FormLabel>
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
        Already have an account?
        <RouterLink :to="{ name: 'sign-in'}"> Sign up </RouterLink>

    </div>
</template>
