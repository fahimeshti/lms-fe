"use client";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { LoginOTP } from "@/components/molecules/LoginOtp";
import UserInfo from "@/components/molecules/UserInfo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUpSection from "./components/SignUp";
import LoginSection from "./components/LoginSection";
import { useRouter, useSearchParams } from "next/navigation";
import BeforeAuth from "@/layouts/BeforeAuth";

const LoginPage = () => {
    const searchParams = useSearchParams();
    const type = searchParams.get('type');
    const router = useRouter();

    return (
        <div>
            <Navbar />
            <div className="custom-container">
                <div className="grid grid-cols-1 md:grid-cols-2 py-4 lg:py-8">
                    <div className="flex items-center justify-center">
                        <img src="https://cdn.10minuteschool.com/images/routine_1722246136916.svg" alt="" />
                    </div>


                    <div className="py-12 flex items-center justify-center text-base">
                        <Tabs value={type || "login"} className="w-[400px]"
                            onValueChange={(value) => {
                                router.push(`/auth/login?type=${value}`);
                            }}
                        >
                            <TabsList className="w-full">
                                <TabsTrigger value="login" className="w-full">
                                    Login
                                </TabsTrigger>
                                <TabsTrigger value="signup" className="w-full">
                                    Signup
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="login">
                                <LoginSection />
                            </TabsContent>
                            <TabsContent value="signup">
                                <SignUpSection />
                            </TabsContent>
                        </Tabs>
                    </div>

                </div>

            </div>
            <Footer />
        </div>
    );
}

export default BeforeAuth(LoginPage);
