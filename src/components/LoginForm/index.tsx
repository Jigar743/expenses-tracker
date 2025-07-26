import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { EyeIcon, EyeOffIcon, Mail, Lock } from "lucide-react";

type FormDataTypes = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormDataTypes>({
    email: "",
    password: "",
  });

  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(formData.email, formData.password);
    setFormData({ email: "", password: "" });
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-8rem)] bg-gradient-to-br from-blue-50 to-white px-4">
      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-xl shadow-xl p-8 space-y-6 border border-gray-200"
      >
        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Log in to manage your expenses</p>
        </div>

        {/* Email */}
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
              value={formData.email}
              onChange={handleChange}
              className="h-12 pl-10 border-gray-300 focus:border-gray-400 focus:ring-0 outline-none shadow-sm"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="h-12 pl-10 pr-10 border-gray-300 focus:border-gray-400 focus:ring-0 outline-none shadow-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          </div>
        </div>

        {/* Forgot password */}
        <div className="text-right">
          <Link href="/auth/forgot-password" className="text-blue-600 text-sm hover:underline">
            Forgot password?
          </Link>
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          size="lg"
          className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md"
        >
          Log In
        </Button>

        {/* Sign up link */}
        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-blue-600 hover:underline font-semibold">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
