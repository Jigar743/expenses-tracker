import React, { useState } from "react";
import { Form, FormItem } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { EyeIcon, EyeOffIcon } from "lucide-react";

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
  const [passwordEyeToggle, setPasswordEyeToggle] = useState(false);
  const [confirmPasswordToggle, setConfirmPasswordToggle] = useState(false);

  const { signup } = useAuth();

  const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(formData.name, formData.email, formData.password);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-[50%] h-[80%] m-auto border p-4 rounded shadow-lg"
    >
      <div className="p-4 border-b-2">
        <h1 className="text-center text-4xl">Sign Up</h1>
      </div>

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
        <div className="w-[70%] relative flex items-center">
          <Input
            className="text-xl py-6"
            id="password"
            placeholder="Enter your password"
            name="password"
            type={passwordEyeToggle ? "text" : "password"}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <span className="absolute inset-y-0 right-4 flex items-center pl-3">
            {passwordEyeToggle ? (
              <EyeOffIcon
                onClick={() => setPasswordEyeToggle(!passwordEyeToggle)}
                className="text-gray-500 h-5 w-5 cursor-pointer"
              />
            ) : (
              <EyeIcon
                onClick={() => setPasswordEyeToggle(!passwordEyeToggle)}
                className="text-gray-500 h-5 w-5 cursor-pointer"
              />
            )}
          </span>
        </div>
      </FormItem>
      <FormItem className="flex gap-3 items-center">
        <Label className="w-[40%] text-xl text-end" htmlFor="confirm-password">
          Enter Confirm Password:
        </Label>
        <div className="w-[70%] relative flex items-center">
          <Input
            className="text-xl py-6"
            id="confirm-password"
            placeholder="Enter your confirm password"
            name="confirmPassword"
            type={confirmPasswordToggle ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
          <span className="absolute inset-y-0 right-4 flex items-center pl-3">
            {confirmPasswordToggle ? (
              <EyeOffIcon
                onClick={() => setConfirmPasswordToggle(!confirmPasswordToggle)}
                className="text-gray-500 h-5 w-5 cursor-pointer"
              />
            ) : (
              <EyeIcon
                onClick={() => setConfirmPasswordToggle(!confirmPasswordToggle)}
                className="text-gray-500 h-5 w-5 cursor-pointer"
              />
            )}
          </span>
        </div>
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
      <p className="text-xl text-center">
        Already Have Account ?{" "}
        <Link className="text-blue-700" href={"/auth/login"}>
          Login
        </Link>
      </p>
    </form>
  );
}
