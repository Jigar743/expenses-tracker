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
import AddExpenseForm from "../AddExpenseForm";

export default function AddExpenseModal({
  expensesList,
  categoryList,
}: {
  expensesList: Expenses;
  categoryList: Categories;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Add Expense</Button>
      </DialogTrigger>
      <DialogContent className="w-[70%]">
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
          <DialogDescription>Fill out your Expense</DialogDescription>
        </DialogHeader>
        <AddExpenseForm categoryList={categoryList} />
      </DialogContent>
    </Dialog>
  );
}
