import React, { useState } from "react";
import { FormItem } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-[50%] h-[80%] m-auto border p-4 rounded shadow-lg"
    >
      <div className="p-4 border-b-2">
        <h1 className="text-center text-4xl">Forgot Password Form</h1>
      </div>
      <FormItem className="flex  gap-3 items-center">
        <Label className="w-[30%] text-xl text-end" htmlFor="email">
          Enter Email:
        </Label>
        <Input
          className="w-[70%] text-xl py-6"
          id="email"
          placeholder="Enter your email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormItem>
      <div className="w-[100%]">
        <Button
          className="w-[100%] text-2xl py-6 text-center"
          size={"lg"}
          type="submit"
        >
          Send Reset Link
        </Button>
      </div>
    </form>
  );
}
