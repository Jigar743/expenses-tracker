import React, { useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    (async () => {
      try {
        const token = Cookies.get("token");
        await fetch(apiConstants.userGenerateOtp, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: token || "",
          }),
          body: JSON.stringify({
            email: user?.email,
          }),
        });
      } catch (error) {
        console.log(error);
      }
    })();
    document.getElementById("otp-0")?.focus();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    if (/^[0-9]?/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }

      if (value && index === otp.length - 1) {
        document.getElementById(`otp-${index}`)?.blur();
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
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token || "",
        }),
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
      className="space-y-4 w-[50%] h-[80%] m-auto border p-4 rounded shadow-lg"
    >
      <div className="p-4 border-b-2">
        <h1 className="text-center text-4xl">OTP Verification Form</h1>
      </div>
      <FormItem className="flex gap-3 items-center">
        <Label className="w-[30%] text-xl text-end" htmlFor="otp">
          Enter OTP:
        </Label>
        {otp.map((_, index) => (
          <Input
            key={index}
            id={`otp-${index}`}
            type="text"
            value={otp[index]}
            maxLength={1}
            onChange={(e) => handleChange(e, index)}
            className="text-center text-xl font-semibold w-12 h-12 p-0"
          />
        ))}
      </FormItem>
      <Button className="w-[100%] text-2xl py-6 text-center" type="submit">
        Submit
      </Button>
    </form>
  );
}
