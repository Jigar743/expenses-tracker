import React, { useState } from "react";
import { Form, FormItem } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { EyeIcon, EyeOffIcon } from "lucide-react";

type FormDataTypes = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [newPasswordEyeToggle, setNewPasswordEyeToggle] = useState(false);
  const [formData, setFormData] = useState<FormDataTypes>({
    email: "",
    password: "",
  });

  const { login } = useAuth();

  const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(formData.email, formData.password);
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 h-[80%] m-auto border p-4 rounded shadow-lg sm:w-[100%] md:w-[70%] lg:w-[50%]"
    >
      <div className="p-4 border-b-2">
        <h1 className="text-center text-4xl">Log In</h1>
      </div>
      <FormItem className="flex gap-3 items-center">
        <Label className="w-[30%] text-xl text-end" htmlFor="email">
          Enter Email:
        </Label>
        <Input
          className="w-[70%] text-xl py-6"
          id="email"
          placeholder="Enter your email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleFormDataChange}
        />
      </FormItem>
      <FormItem className="flex  gap-3 items-center">
        <Label className="w-[30%] text-xl text-end" htmlFor="password">
          Enter Password:
        </Label>
        <div className="w-[70%] relative flex items-center">
          <Input
            placeholder="Enter your password"
            className="text-xl py-6"
            id="password"
            type={newPasswordEyeToggle ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <span className="absolute inset-y-0 right-4 flex items-center pl-3">
            {newPasswordEyeToggle ? (
              <EyeOffIcon
                onClick={() => setNewPasswordEyeToggle(!newPasswordEyeToggle)}
                className="text-gray-500 h-5 w-5 cursor-pointer"
              />
            ) : (
              <EyeIcon
                onClick={() => setNewPasswordEyeToggle(!newPasswordEyeToggle)}
                className="text-gray-500 h-5 w-5 cursor-pointer"
              />
            )}
          </span>
        </div>
      </FormItem>
      <div className="text-end">
        <Link className="text-blue-700" href={"/auth/forgot-password"}>
          Forgot password ?
        </Link>
      </div>
      <div className="w-[100%]">
        <Button
          className="w-[100%] text-2xl py-6 text-center"
          size={"lg"}
          type="submit"
        >
          Log In
        </Button>
      </div>
      <p className="text-center text-xl">
        Don&apos;t have Account ?{" "}
        <Link className="text-blue-700" href={"/auth/signup"}>
          Sign Up
        </Link>
      </p>
    </form>
  );
}
