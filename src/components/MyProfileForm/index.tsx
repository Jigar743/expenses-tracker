import React from "react";
import { FormItem } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useAuth } from "@/hooks/useAuth";
import { VerifiedIcon } from "lucide-react";

function MyProfileForm() {
  const { user } = useAuth();

  return (
    <form className="space-y-4 w-[50%] h-[80%] m-auto border p-4 rounded shadow-lg">
      <div className="p-4 border-b-2">
        <h1 className="text-center text-4xl">My Profile</h1>
      </div>
      <FormItem className="flex gap-3 items-center">
        <Label className="w-[30%] text-xl text-end" htmlFor="name">
          Your Name:
        </Label>
        <div className="w-[70%] relative flex items-center">
          <Input
            readOnly
            className="text-xl py-6"
            id="name"
            type="text"
            name="name"
            value={user?.name}
          />
        </div>
      </FormItem>
      <FormItem className="flex gap-3 items-center">
        <Label className="w-[30%] text-xl text-end" htmlFor="email">
          Your Email:
        </Label>
        <div className="w-[70%] relative flex items-center">
          <Input
            readOnly
            className=" text-xl py-6"
            id="email"
            type="email"
            name="email"
            value={user?.email}
          />
          {user?.isVerified && (
            <span className="absolute inset-y-0 right-2 flex items-center pl-3">
              <VerifiedIcon className="text-green-500 h-5 w-5" />
            </span>
          )}
        </div>
      </FormItem>
    </form>
  );
}

export default MyProfileForm;
