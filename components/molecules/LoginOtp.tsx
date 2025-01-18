"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

// import { toast } from "@/components/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/FormField";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

const FormSchema = z.object({
    pin: z.string().min(4, {
        message: "Your one-time password must be 4 characters.",
    }),
})

export function LoginOTP() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    });
    const { formState } = form;
    const { isValid, isSubmitting } = formState;

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log("Submitting data...", data);
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating async submission
        console.log("Submitted!");
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 max-w-sm">
                <FormField
                    control={form.control}
                    name="pin"
                    render={({ field }) => (
                        <FormItem className="space-y-2">
                            <FormLabel className="text-lg">faid@dsd.dsd নাম্বার/ইমেইল পাঠানো 4 সংখ্যার কোডটি লিখুন</FormLabel>
                            <FormControl>
                                <InputOTP maxLength={4} {...field}>
                                    <InputOTPGroup className="grid grid-cols-4 w-full">
                                        <InputOTPSlot index={0} className="h-12 lg:h-14 w-full text-lg" />
                                        <InputOTPSlot index={1} className="h-12 lg:h-14 w-full text-lg" />
                                        <InputOTPSlot index={2} className="h-12 lg:h-14 w-full text-lg" />
                                        <InputOTPSlot index={3} className="h-12 lg:h-14 w-full text-lg" />
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            <div className="w-full flex justify-end">
                                <button type="button">
                                    <FormDescription className="text-base text-primary">
                                        আবার কোড পাঠান
                                    </FormDescription>
                                </button>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={!isValid || isSubmitting}>Submit</Button>
            </form>
        </Form>
    )
}
