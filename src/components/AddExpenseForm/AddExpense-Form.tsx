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
import { Value } from "@radix-ui/react-select";
import { Input } from "../ui/input";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

interface FormData {
  category: number | string;
  amount: number;
  title: string;
  date: Date | null;
}

export default function AddExpenseForm({
  categoryList,
}: {
  categoryList: Categories;
}) {
  const [formData, setFormData] = useState<FormData>({
    category: "",
    amount: 0,
    title: "",
    date: null,
  });

  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setFormData({
      category: "",
      amount: 0,
      title: "",
      date: null,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    // e.currentTarget.reset();
    resetForm();
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label>Category</Label>
        <Select
          value={formData.category.toString()}
          onValueChange={(val) => {
            setFormData({ ...formData, category: val });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {categoryList.map((category) => (
              <SelectItem
                key={category.id.toString()}
                value={category.id.toString()}
              >
                {category.name} - {category.description}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter a title"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          placeholder="Enter an amount"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant="outline"
              className={`w-full justify-start text-left font-normal ${
                !formData.date && "text-muted-foreground"
              }`}
            >
              {formData.date ? (
                formData.date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
      <div className="space-y-2">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
