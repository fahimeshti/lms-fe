"use client";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CartContainer() {
    const router = useRouter();

    return (
        <div className="py-12 lg:pb-20">
            <div className="flex items-center gap-4 mb-4">
                <Button size="icon" variant="outline" className="rounded-full" onClick={() => router.back()}>
                    <ArrowLeft className="w-4 h-4" />
                    <span className="sr-only">Refresh</span>
                </Button>
                <h1 className="text-2xl font-semibold">Shopping Cart</h1>
            </div>

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-8 space-y-4">
                    <Card className="grid gap-4 p-4 md:grid-cols-3 md:gap-4">
                        <div className="flex items-center gap-4 md:col-span-2">
                            <img
                                src="https://placehold.co/180x120"
                                alt="Product image"
                                width={200}
                                height={200}
                                className="aspect-square object-cover border border-gray-200 rounded-lg w-full max-w-[180px] md:max-h-[120px] overflow-hidden dark:border-gray-800"
                            />
                            <div className="grid gap-1.5 line-clamp-2">
                                <Link href="#" className="line-clamp-2 text-lg font-medium hover:underline" prefetch={false}>
                                    SSC 2025 শেষ মুহূর্তের প্রস্তুতি কোর্স [ব্যবসায় শিক্ষা বিভাগ]
                                </Link>
                                <p className="text-gray-400 text-sm line-clamp-2">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi officia eos suscipit.
                                </p>
                            </div>
                        </div>
                        <div className="ml-auto flex items-center gap-1.5">
                            <div className="text-2xl font-semibold text-primary">৳ 2500</div>
                            <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon">
                                    <TrashIcon className="w-4 h-4" />
                                    <span className="sr-only">Delete</span>
                                </Button>
                            </div>
                        </div>
                    </Card>
                    <Card className="grid gap-4 p-4 md:grid-cols-3 md:gap-4">
                        <div className="flex items-center gap-4 md:col-span-2">
                            <img
                                src="https://placehold.co/180x120"
                                alt="Product image"
                                width={200}
                                height={200}
                                className="aspect-square object-cover border border-gray-200 rounded-lg w-full max-w-[180px] md:max-h-[120px] overflow-hidden dark:border-gray-800"
                            />
                            <div className="grid gap-1.5 line-clamp-2">
                                <Link href="#" className="line-clamp-2 text-lg font-medium hover:underline" prefetch={false}>
                                    SSC 2025 শেষ মুহূর্তের প্রস্তুতি কোর্স [ব্যবসায় শিক্ষা বিভাগ]
                                </Link>
                                <p className="text-gray-400 text-sm line-clamp-2">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi officia eos suscipit.
                                </p>
                            </div>
                        </div>
                        <div className="ml-auto flex items-center gap-1.5">
                            <div className="text-2xl font-semibold text-primary">৳ 2500</div>
                            <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon">
                                    <TrashIcon className="w-4 h-4" />
                                    <span className="sr-only">Delete</span>
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="col-span-12 md:col-span-4 space-y-2">
                    <Card className="p-4">
                        <h5 className="text-xl font-bold">Order Summary</h5>
                        <div className="space-y-2 mt-4">
                            <div className="flex items-center justify-between">
                                <div>Subtotal</div>
                                <div>৳ 99.00</div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>Shipping</div>
                                <div>৳ 10.00</div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>Tax</div>
                                <div>৳ 10.90</div>
                            </div>
                            <Separator className="w-full" />
                            <div className="flex items-center justify-between font-medium">
                                <div>Total</div>
                                <div>৳ 119.90</div>
                            </div>
                        </div>
                    </Card>
                    <div className="flex flex-col gap-2">
                        <div />
                        <Button>Apply coupon</Button>
                    </div>
                    <Button size="lg" className="w-full">
                        Proceed to checkout
                    </Button>
                </div>
            </div>
        </div>
    )
}

function HeartIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    )
}


function RefreshCwIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M8 16H3v5" />
        </svg>
    )
}


function TrashIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
    )
}