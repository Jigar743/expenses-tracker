import React, { useState } from "react";
import { FormItem } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiConstants } from "@/lib/contants";
import Cookies from "js-cookie";

type FormDataTypes = {
  new_password: string;
  confirm_password: string;
};

function ChangePasswordForm() {
  const { toast } = useToast();

  const [newPasswordEyeToggle, setNewPasswordEyeToggle] = useState(false);
  const [confirmPasswordEyeToggle, setConfirmPasswordEyeToggle] =
    useState(false);

  const [formData, setFormData] = useState<FormDataTypes>({
    new_password: "",
    confirm_password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.new_password !== formData.confirm_password) {
      toast({
        description: "Passwords do not match",
        duration: 5000,
      });
      return;
    }
    try {
      const token = Cookies.get("token");

      const response = await fetch(apiConstants.changePassword, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token || "",
        },
        body: JSON.stringify({
          newPassword: formData.new_password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast({
          description: data.message,
          duration: 5000,
        });
      }
    } catch (error) {
      console.error(error);
    }
    setFormData({
      new_password: "",
      confirm_password: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl w-full mx-auto bg-white rounded-md p-6 space-y-6"
    >
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-semibold text-gray-800">
          Change Password
        </h1>
        <p className="text-gray-500 text-sm">Update your account password</p>
      </div>

      {/* New Password */}
      <FormItem className="flex flex-col space-y-2">
        <Label
          className="text-gray-700 text-sm font-medium"
          htmlFor="new-password"
        >
          New Password
        </Label>
        <div className="relative">
          <Input
            id="new-password"
            type={newPasswordEyeToggle ? "text" : "password"}
            name="new_password"
            value={formData.new_password}
            onChange={(e) =>
              setFormData({ ...formData, new_password: e.target.value })
            }
            placeholder="Enter new password"
            className="text-gray-800 bg-gray-50 border border-gray-200 rounded-md px-4 py-3 focus:outline-none pr-10"
          />
          <span className="absolute inset-y-0 right-3 flex items-center">
            {newPasswordEyeToggle ? (
              <EyeOffIcon
                onClick={() => setNewPasswordEyeToggle(false)}
                className="text-gray-500 h-5 w-5 cursor-pointer"
              />
            ) : (
              <EyeIcon
                onClick={() => setNewPasswordEyeToggle(true)}
                className="text-gray-500 h-5 w-5 cursor-pointer"
              />
            )}
          </span>
        </div>
      </FormItem>

      {/* Confirm Password */}
      <FormItem className="flex flex-col space-y-2">
        <Label
          className="text-gray-700 text-sm font-medium"
          htmlFor="confirm-password"
        >
          Confirm Password
        </Label>
        <div className="relative">
          <Input
            id="confirm-password"
            type={confirmPasswordEyeToggle ? "text" : "password"}
            name="confirm_password"
            value={formData.confirm_password}
            onChange={(e) =>
              setFormData({ ...formData, confirm_password: e.target.value })
            }
            placeholder="Re-enter new password"
            className="text-gray-800 bg-gray-50 border border-gray-200 rounded-md px-4 py-3 focus:outline-none pr-10"
          />
          <span className="absolute inset-y-0 right-3 flex items-center">
            {confirmPasswordEyeToggle ? (
              <EyeOffIcon
                onClick={() => setConfirmPasswordEyeToggle(false)}
                className="text-gray-500 h-5 w-5 cursor-pointer"
              />
            ) : (
              <EyeIcon
                onClick={() => setConfirmPasswordEyeToggle(true)}
                className="text-gray-500 h-5 w-5 cursor-pointer"
              />
            )}
          </span>
        </div>
      </FormItem>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full  bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-md"
      >
        Change Password
      </Button>
    </form>
  );
}

export default ChangePasswordForm;
