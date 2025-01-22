"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/FormField";
import { useApi } from "@/hooks/useApiCall";
import { loginWithEmailPassword } from "@/utils/api/auth";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { AUTH_TOKEN_KEY, USER_PROFILE_KEY } from "@/utils/constants";
import Cookies from 'js-cookie';

const FormSchema = z.object({
    // phone: z
    //     .string()
    //     .min(1, { message: "This field is required" })
    //     .refine(
    //         (value) =>
    //             phoneRegex.test(value) || z.string().email().safeParse(value).success,
    //         {
    //             message: "Must be a valid email or phone number",
    //         }
    //     ),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

const LoginSection = () => {
    const { login } = useAuth();
    const { loading, data, execute: signIn } = useApi<any, any>(
        loginWithEmailPassword,
        false,
        true,
    );

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        mode: "onChange",
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const { formState } = form;
    const { isValid, isSubmitting } = formState;

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        await signIn(data);
    };

    useEffect(() => {
        if (data) {
            // localStorage.setItem(AUTH_TOKEN_KEY, data.data?.data?.session?.access_token);
            Cookies.set(AUTH_TOKEN_KEY, data?.data?.data?.session?.access_token, {
                expires: 1, // Expires in 1 days
                secure: true, // HTTPS only
                sameSite: 'Strict', // Strict cookie policy
            });

            localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(data.data?.data?.user));
            login();
        }
    }, [data]);

    return (
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='w-full max-w-sm space-y-2 pt-2'
            >
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem className="col-span-3 sm:col-span-1">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Email" className="my-2" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem className="col-span-3 sm:col-span-1">
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Password" className="my-2" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button className="w-full" disabled={!isValid || isSubmitting || loading}>Log In</Button>
            </form>
        </FormProvider>
    );
}

export default LoginSection;