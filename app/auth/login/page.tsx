"use client";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/FormField";
import { phoneRegex } from "@/utils/constants";
import { LoginOTP } from "@/components/molecules/LoginOtp";
import UserInfo from "@/components/molecules/UserInfo";

const FormSchema = z.object({
    phone: z
        .string()
        .min(1, { message: "This field is required" })
        .refine(
            (value) =>
                phoneRegex.test(value) || z.string().email().safeParse(value).success,
            {
                message: "Must be a valid email or phone number",
            }
        ),
});

const LoginPage = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        mode: "onChange",
        defaultValues: {
            phone: '',
        },
    });
    const { formState } = form;
    const { isValid, isSubmitting } = formState;

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        console.log("Submitting data...", data);
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating async submission
        console.log("Submitted!");
    };

    return (
        <div>
            <Navbar />
            <div className="custom-container">
                <div className="grid grid-cols-1 md:grid-cols-2 py-4 lg:py-8">
                    <div className="flex items-center justify-center">
                        <img src="https://cdn.10minuteschool.com/images/routine_1722246136916.svg" alt="" />
                    </div>

                    <div className="py-12">
                        <FormProvider {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className='w-full max-w-sm space-y-2'
                            >
                                <FormField
                                    control={form.control}
                                    name='phone'
                                    render={({ field }) => (
                                        <FormItem className="col-span-3 sm:col-span-1">
                                            <FormLabel>মোবাইল নাম্বার/ ইমেইল দিয়ে এগিয়ে যান</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="মোবাইল নাম্বার/ ইমেইল" className="my-2" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button className="w-full" disabled={!isValid || isSubmitting}>Submit</Button>
                            </form>
                        </FormProvider>
                        <br />
                        <LoginOTP />
                        <br />
                        <UserInfo />
                    </div>

                </div>

            </div>
            <Footer />
        </div>
    );
}

export default LoginPage;