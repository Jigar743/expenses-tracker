import { Categories } from "@/types/epenses.types";
import React, { useState } from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { CalendarIcon, Tag, IndianRupee } from "lucide-react";
import { apiConstants } from "@/lib/contants";
import Cookies from "js-cookie";

interface FormData {
  category: number | string;
  amount: number;
  title: string;
  date: Date | null;
}

export default function AddExpenseForm({
  categoryList,
  onClose,
}: {
  categoryList: Categories;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<FormData>({
    category: "",
    amount: 0,
    title: "",
    date: null,
  });

  const resetForm = () => {
    setFormData({
      category: "",
      amount: 0,
      title: "",
      date: null,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      const response = await fetch(apiConstants.addExpense, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token || "",
        }),
        body: JSON.stringify({
          ...formData,
          date: formData.date?.toISOString(),
          category: Number(formData.category),
          amount: parseFloat(formData.amount.toString()),
        }),
      });
      if (response.ok) {
        onClose();
        resetForm();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Add Expense
      </h2>
      <form onSubmit={handleFormSubmit} className="space-y-5">
        {/* Category */}
        <div>
          <Label className="block mb-2 font-medium text-gray-700">
            Category
          </Label>
          <Select
            value={formData.category.toString()}
            onValueChange={(val) => setFormData({ ...formData, category: val })}
          >
            <SelectTrigger className="w-full h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categoryList.map((category) => (
                <SelectItem
                  key={category.id.toString()}
                  value={category.id.toString()}
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Title */}
        <div>
          <Label className="block mb-2 font-medium text-gray-700">Title</Label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter expense title"
              className="pl-10 h-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Amount */}
        <div>
          <Label className="block mb-2 font-medium text-gray-700">Amount</Label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="Enter amount"
              className="pl-10 h-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Date */}
        <div>
          <Label className="block mb-2 font-medium text-gray-700">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-12 justify-between border-gray-300 rounded-lg text-gray-600"
              >
                {formData.date
                  ? formData.date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "Pick a date"}
                <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.date || undefined}
                onSelect={(date) =>
                  setFormData((prev) => ({ ...prev, date: date || null }))
                }
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Add Expense
        </Button>
      </form>
    </div>
  );
}
