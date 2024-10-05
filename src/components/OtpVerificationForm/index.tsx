import React, { useEffect, useState } from "react";
import { FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export default function OtpVerificationForm() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  useEffect(() => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpValue = otp.join("");
    console.log(otpValue);
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
