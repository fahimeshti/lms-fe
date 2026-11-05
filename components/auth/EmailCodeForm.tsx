"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAuth } from "@/context/AuthContext";
import { sendLoginCode, verifyLoginCode } from "@/utils/api/auth";
import { saveSession } from "@/utils/session";

const CODE_LENGTH = 6;
const RESEND_SECONDS = 60;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Test login convenience: when NEXT_PUBLIC_TEST_LOGIN_EMAIL / _CODE are set,
// every login form is pre-filled with the test user's email and the fixed
// code the backend issues to it. Remove both variables before launch.
const TEST_EMAIL = process.env.NEXT_PUBLIC_TEST_LOGIN_EMAIL ?? "";
const TEST_CODE = process.env.NEXT_PUBLIC_TEST_LOGIN_CODE ?? "";
const isTestMode = () => !!TEST_EMAIL;

const testCodeFor = (email: string) =>
  TEST_CODE &&
  isTestMode() &&
  email.trim().toLowerCase() === TEST_EMAIL.toLowerCase()
    ? TEST_CODE
    : "";

const errorMessage = (err: any) =>
  err?.response?.data?.message || "Something went wrong, please try again";

// Passwordless login/signup: email -> 6-digit code -> signed in.
const EmailCodeForm = ({ mode }: { mode: "login" | "signup" }) => {
  const { login } = useAuth();
  const [step, setStep] = useState<"email" | "code">("email");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Pre-fill the test email (client-side only, see isTestMode).
  useEffect(() => {
    if (mode === "login" && isTestMode()) setEmail((e) => e || TEST_EMAIL);
  }, [mode]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const emailValid = EMAIL_RE.test(email.trim());
  const nameValid = mode === "login" || fullName.trim().length > 0;

  const requestCode = async () => {
    if (!emailValid || !nameValid || loading) return;
    setLoading(true);
    try {
      await sendLoginCode({ email: email.trim() });
      toast.success("আপনার ইমেইলে একটি কোড পাঠানো হয়েছে");
      setStep("code");
      setCode(testCodeFor(email));
      setCooldown(RESEND_SECONDS);
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const submitCode = async (value = code) => {
    if (value.length !== CODE_LENGTH || loading) return;
    setLoading(true);
    try {
      const res = await verifyLoginCode({
        email: email.trim(),
        otp: value,
        ...(mode === "signup" ? { full_name: fullName.trim() } : {}),
      });
      const { user, session } = res.data?.data ?? {};
      if (!session?.access_token) throw new Error();
      saveSession(session.access_token, user);
      login(); // BeforeAuth redirects to ?redirect=... or "/"
    } catch (err) {
      toast.error(errorMessage(err));
      setCode("");
    } finally {
      setLoading(false);
    }
  };

  if (step === "code") {
    return (
      <form
        className="w-full max-w-sm space-y-4 pt-2"
        onSubmit={(e) => {
          e.preventDefault();
          submitCode();
        }}
      >
        <div className="space-y-1">
          <Label>কোডটি লিখুন</Label>
          <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-700">{email.trim()}</span>-এ পাঠানো{" "}
            {CODE_LENGTH} সংখ্যার কোড
          </p>
        </div>
        <InputOTP
          maxLength={CODE_LENGTH}
          value={code}
          onChange={(v) => {
            const digits = v.replace(/\D/g, "");
            setCode(digits);
            if (digits.length === CODE_LENGTH) submitCode(digits);
          }}
          inputMode="numeric"
          autoComplete="one-time-code"
          autoFocus
          disabled={loading}
        >
          <InputOTPGroup className="grid w-full grid-cols-6">
            {Array.from({ length: CODE_LENGTH }, (_, i) => (
              <InputOTPSlot key={i} index={i} className="h-12 w-full text-lg" />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <Button className="w-full" disabled={code.length !== CODE_LENGTH || loading}>
          {mode === "signup" ? "Sign Up" : "Log In"}
        </Button>
        <div className="flex items-center justify-between text-sm">
          <button
            type="button"
            className="text-gray-600 underline-offset-4 hover:underline"
            onClick={() => setStep("email")}
          >
            ইমেইল পরিবর্তন করুন
          </button>
          <button
            type="button"
            className="text-primary underline-offset-4 hover:underline disabled:text-gray-400 disabled:no-underline"
            disabled={cooldown > 0 || loading}
            onClick={requestCode}
          >
            {cooldown > 0 ? `আবার পাঠান (${cooldown}s)` : "আবার কোড পাঠান"}
          </button>
        </div>
      </form>
    );
  }

  return (
    <form
      className="w-full max-w-sm space-y-3 pt-2"
      onSubmit={(e) => {
        e.preventDefault();
        requestCode();
      }}
    >
      {mode === "signup" && (
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            placeholder="Full Name"
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor={`email-${mode}`}>Email</Label>
        <Input
          id={`email-${mode}`}
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Button className="w-full" disabled={!emailValid || !nameValid || loading}>
        কোড পাঠান
      </Button>
      <p className="text-center text-xs text-gray-500">
        পাসওয়ার্ড লাগবে না — আপনার ইমেইলে একটি লগইন কোড পাঠানো হবে।
      </p>
    </form>
  );
};

export default EmailCodeForm;
