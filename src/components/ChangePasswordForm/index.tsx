import React, { useState } from "react";
import { FormItem } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({ formData });

    if (formData.new_password !== formData.confirm_password) {
      toast({
        title: "Scheduled: Catch up",
        description: "Friday, February 10, 2023 at 5:57 PM",
      });
    } else {
      console.log(formData);
      setFormData({
        new_password: "",
        confirm_password: "",
      });
    }
  };

  return (
    <form
      method="post"
      onSubmit={handleSubmit}
      className="space-y-4 w-[50%] h-[80%] m-auto border p-4 rounded shadow-lg"
    >
      <div className="p-4 border-b-2">
        <h1 className="text-center text-4xl">My Profile</h1>
      </div>
      <FormItem className="flex gap-3 items-center">
        <Label className="w-[30%] text-xl text-end" htmlFor="new-password">
          New Password:
        </Label>
        <div className="w-[70%] relative flex items-center">
          <Input
            className="text-xl py-6"
            id="new-password"
            type={newPasswordEyeToggle ? "text" : "password"}
            name="new_password"
            value={formData.new_password}
            onChange={(e) =>
              setFormData({ ...formData, new_password: e.target.value })
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
      <FormItem className="flex gap-3 items-center">
        <Label className="w-[30%] text-xl text-end" htmlFor="confirm-password">
          Confirm Password:
        </Label>
        <div className="w-[70%] relative flex items-center">
          <Input
            className="text-xl py-6"
            id="confirm-password"
            type={confirmPasswordEyeToggle ? "text" : "password"}
            name="confirm_password"
            value={formData.confirm_password}
            onChange={(e) =>
              setFormData({ ...formData, confirm_password: e.target.value })
            }
          />
          <span className="absolute inset-y-0 right-4 flex items-center pl-3">
            {confirmPasswordEyeToggle ? (
              <EyeOffIcon
                onClick={() =>
                  setConfirmPasswordEyeToggle(!confirmPasswordEyeToggle)
                }
                className="text-gray-500 h-5 w-5 cursor-pointer"
              />
            ) : (
              <EyeIcon
                onClick={() =>
                  setConfirmPasswordEyeToggle(!confirmPasswordEyeToggle)
                }
                className="text-gray-500 h-5 w-5 cursor-pointer"
              />
            )}
          </span>
        </div>
      </FormItem>
      <div className="w-[100%]">
        <Button
          type="submit"
          size={"lg"}
          className="w-[100%] text-white px-6 text-lg py-6 rounded-md"
        >
          Change Password
        </Button>
      </div>
    </form>
  );
}

export default ChangePasswordForm;
