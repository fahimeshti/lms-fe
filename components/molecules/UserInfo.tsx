
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/FormField";
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const FormSchema = z
    .object({
        phone: z.string().min(1, "Phone number is required"),
        fullName: z.string().min(1, "Full Name is required"),
        password: z.string().min(8, "Password must be at least 8 characters long"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"], // This ensures the error is shown for confirmPassword
    });

const UserInfo = () => {
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
            <h4 className="text-lg font-semibold mb-4">
                Fill in your information
            </h4>

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
                                <FormLabel>Mobile No./Email</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Mobile No./Email" className="my-2" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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

                    <Button className="w-full" disabled={!isValid || isSubmitting}>Submit</Button>
                </form>
            </FormProvider>
        </div>
    );
}

export default UserInfo;