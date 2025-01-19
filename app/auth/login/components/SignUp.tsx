import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/FormField";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
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
        },
    });
    const { formState } = form;
    const { isValid, isSubmitting } = formState;

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        console.log("Submitting data...", data);
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating async submission
        console.log("Submitted!");
        router.push('/auth/login?type=login');
    };

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
                                    <Input type="text" placeholder="Password" className="my-2" {...field} />
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
                                    <Input type="text" placeholder="Confirm  Password" className="my-2" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button className="w-full" disabled={!isValid || isSubmitting}>Sign Up</Button>
                </form>
            </FormProvider>
        </div>
    );
}

export default SignUpSection;