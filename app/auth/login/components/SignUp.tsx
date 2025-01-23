"use client";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/FormField";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useApi } from "@/hooks/useApiCall";
import { signUpWithEmailPassword } from "@/utils/api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const FormSchema = z.object({
    fullName: z.string().min(1, "Full Name is required"),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),

}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // This ensures the error is shown for confirmPassword
});

const SignUpSection = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        mode: "onChange",
        defaultValues: {
            email: '',
            password: '',
            fullName: '',
            confirmPassword: '',
        },
    });

    const { loading, data, execute: signUp } = useApi<any, any>(
        signUpWithEmailPassword,
        false,
        true,
    );

    const { formState } = form;
    const { isValid, isSubmitting } = formState;

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        const d = {
            email: data.email,
            password: data.password,
            full_name: data.fullName,
        };
        await signUp(d);
    };

    useEffect(() => {
        if (data?.data) {
            toast.success("Sign up successful, please check your email");
            router.push('/auth/login?type=login');
        } else if (data?.data?.error) {
            toast.error(data?.data?.message || "Something went wrong, please try again");
        }
    }, [data]);

    return (
        <div>
            <FormProvider {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full max-w-sm space-y-2 pt-2'
                >
                    <FormField
                        control={form.control}
                        name='fullName'
                        render={({ field }) => (
                            <FormItem className="col-span-3 sm:col-span-1">
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Full Name" className="my-2" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem className="col-span-3 sm:col-span-1">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Email" className="my-2" {...field} />
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
                                    <PasswordInput
                                        {...field}
                                        id="password"
                                        placeholder="Password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='confirmPassword'
                        render={({ field }) => (
                            <FormItem className="col-span-3 sm:col-span-1">
                                <FormLabel>Confirm  Password</FormLabel>
                                <FormControl>
                                    <PasswordInput
                                        {...field}
                                        id="confirmPassword"
                                        placeholder="Confirm  Password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button className="w-full" disabled={!isValid || isSubmitting || loading}>Sign Up</Button>
                </form>
            </FormProvider>
        </div>
    );
}

export default SignUpSection;