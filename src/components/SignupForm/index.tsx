import React, { useState } from "react";
import { Form, FormItem } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

type FormDataTypes = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignupForm() {
  const [formData, setFormData] = useState<FormDataTypes>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-[50%] h-[80%] m-auto border p-4 rounded shadow-lg"
    >
      <div className="p-4 border-b-2">
        <h1 className="text-center text-4xl">Sign Up Form</h1>
      </div>
      <p className="text-xl text-center">
        Already Have Account ?{" "}
        <Link className="text-blue-700" href={"/auth/login"}>
          Login
        </Link>
      </p>
      <FormItem className="flex  gap-3 items-center">
        <Label className="w-[40%] text-xl text-end" htmlFor="name">
          Enter Name:
        </Label>
        <Input
          className="w-[60%] text-xl py-6"
          id="name"
          placeholder="Enter your name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleFormDataChange}
        />
      </FormItem>
      <FormItem className="flex  gap-3 items-center">
        <Label className="w-[40%] text-xl text-end" htmlFor="email">
          Enter Email:
        </Label>
        <Input
          className="w-[60%] text-xl py-6"
          id="email"
          placeholder="Enter your email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleFormDataChange}
        />
      </FormItem>
      <FormItem className="flex  gap-3 items-center">
        <Label className="w-[40%] text-xl text-end" htmlFor="password">
          Enter Password:
        </Label>
        <Input
          className="w-[60%] text-xl py-6"
          id="password"
          placeholder="Enter your password"
          type="text"
          name="password"
          value={formData.password}
          onChange={handleFormDataChange}
        />
      </FormItem>
      <FormItem className="flex gap-3 items-center">
        <Label className="w-[40%] text-xl text-end" htmlFor="confirm-password">
          Enter Confirm Password:
        </Label>
        <Input
          className="w-[60%] text-xl py-6 "
          id="confirm-password"
          placeholder="Enter your confirm password"
          type="text"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleFormDataChange}
        />
      </FormItem>

      <div className="w-[100%]">
        <Button
          className="w-[100%] text-2xl py-6 text-center"
          size={"lg"}
          type="submit"
        >
          Sign Up
        </Button>
      </div>
    </form>
  );
}
