import { Categories, Expenses } from "@/types/epenses.types";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import AddExpenseForm from "../AddExpenseForm";

export default function AddExpenseModal({
  categoryList,
}: {
  categoryList: Categories;
}) {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleModalChange = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <Dialog open={modalOpen} onOpenChange={handleModalChange}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Add Expense</Button>
      </DialogTrigger>
      <DialogContent className="w-[70%]">
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
          <DialogDescription>Fill out your Expense</DialogDescription>
        </DialogHeader>
        <AddExpenseForm categoryList={categoryList} onClose={handleModalChange} />
      </DialogContent>
    </Dialog>
  );
}
