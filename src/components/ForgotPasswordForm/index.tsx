import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-8rem)] bg-gradient-to-br from-blue-50 to-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-xl shadow-xl p-8 space-y-6 border border-gray-200"
      >
        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600">Forgot Password?</h1>
          <p className="text-gray-500 mt-2">
            Enter your email address to receive a reset link
          </p>
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 pl-10 border-gray-300 focus:border-gray-400 focus:ring-0 outline-none shadow-sm"
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md"
        >
          Send Reset Link
        </Button>

        {/* Back to Login */}
        <p className="text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline font-semibold">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}
