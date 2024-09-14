import { Categories, Expenses } from "@/types/epenses.types";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Select, SelectContent } from "../ui/select";
import { SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import AddExpenseForm from "../AddExpenseForm/AddExpense-Form";



export default function AddExpenseModal({
  expensesList,
  categories,
}: {
  expensesList: Expenses;
  categories: Categories;
}) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Add Expense</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
          <DialogDescription>Fill ou your Expenses</DialogDescription>
        </DialogHeader>
        {/* <div className="flex flex-col justify-between gap-2">
          <Select
            name="category"
            onValueChange={(val) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                category: val,
              }))
            }
            // defaultValue={String(formaData.category)}
            value={formaData.category}
          >
            <SelectTrigger className="border-2 rounded p-2 w-[80%] m-auto">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent className="h-[300px] w-[80%]">
              {categories?.map(
                (category: {
                  id: string;
                  name: string;
                  description: string;
                }) => (
                  <SelectItem
                    className="border p-2 cursor-pointer"
                    key={category.id}
                    value={String(category.id)}
                  >
                    {category.name} - ({category.description})
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div> */}
        <AddExpenseForm categoryList={categories} />
      </DialogContent>
    </Dialog>
  );
}
