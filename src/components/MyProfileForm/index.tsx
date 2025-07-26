import React from "react";
import { FormItem } from "../ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useAuth } from "@/hooks/useAuth";
import { VerifiedIcon } from "lucide-react";

function MyProfileForm() {
  const { user } = useAuth();

  return (
    <form className="max-w-xl w-full mx-auto bg-white rounded-md p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-semibold text-gray-800">My Profile</h1>
        <p className="text-gray-500 text-sm">View your personal details</p>
      </div>

      {/* Name */}
      <FormItem className="flex flex-col space-y-2">
        <Label className="text-gray-700 text-sm font-medium" htmlFor="name">
          Name
        </Label>
        <Input
          readOnly
          id="name"
          type="text"
          name="name"
          value={user?.name || ""}
          className="text-gray-800 bg-gray-50 border border-gray-200 rounded-md px-4 py-3 focus:outline-none"
        />
      </FormItem>

      {/* Email */}
      <FormItem className="flex flex-col space-y-2">
        <Label className="text-gray-700 text-sm font-medium" htmlFor="email">
          Email
        </Label>
        <div className="relative">
          <Input
            readOnly
            id="email"
            type="email"
            name="email"
            value={user?.email || ""}
            className="text-gray-800 bg-gray-50 border border-gray-200 rounded-md px-4 py-3 focus:outline-none pr-10"
          />
          {user?.isVerified && (
            <span className="absolute inset-y-0 right-3 flex items-center">
              <VerifiedIcon className="text-green-500 w-5 h-5" />
            </span>
          )}
        </div>
      </FormItem>
    </form>
  );
}

export default MyProfileForm;
