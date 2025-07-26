import React, { useEffect, useState } from "react";
import { FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { apiConstants } from "@/lib/contants";
import Cookies from "js-cookie";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";

export default function OtpVerificationForm() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const { user } = useAuth();
  const router = useRouter();

  // Generate OTP when component mounts
  useEffect(() => {
    (async () => {
      try {
        const token = Cookies.get("token");
        await fetch(apiConstants.userGenerateOtp, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token || "",
          },
          body: JSON.stringify({ email: user?.email }),
        });
      } catch (error) {
        console.log(error);
      }
    })();

    document.getElementById("otp-0")?.focus();
  }, [user?.email]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpValue = otp.join("");
    try {
      const token = Cookies.get("token");
      const response = await fetch(apiConstants.userOtpVerification, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token || "",
        },
        body: JSON.stringify({
          email: user?.email,
          otp: otpValue,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg w-full mx-auto bg-white rounded-md p-6 space-y-6 shadow"
    >
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-semibold text-gray-800">Verify OTP</h1>
        <p className="text-gray-500 text-sm">
          Enter the 6-digit code sent to your email
        </p>
      </div>

      {/* OTP Inputs */}
      <div className="flex justify-center gap-3">
        {otp.map((_, index) => (
          <Input
            key={index}
            id={`otp-${index}`}
            type="text"
            value={otp[index]}
            maxLength={1}
            onChange={(e) => handleChange(e, index)}
            className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md text-lg"
      >
        Verify OTP
      </Button>
    </form>
  );
}
