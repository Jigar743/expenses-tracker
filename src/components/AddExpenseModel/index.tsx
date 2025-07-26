import { Categories } from "@/types/epenses.types";
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
import { Plus } from "lucide-react";

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
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-gray-800 text-white hover:bg-gray-700 px-5 py-3 rounded-md">
          <Plus className="w-5 h-5" />
          Add Expense
        </Button>
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl rounded-md p-0 bg-white">
        {/* Header */}
        <DialogHeader className="p-4">
          <DialogTitle className="text-xl font-medium text-gray-800">
            Add Expense
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 mt-1">
            Fill out the details below.
          </DialogDescription>
        </DialogHeader>

        {/* Form */}
        <div className="p-4">
          <AddExpenseForm
            categoryList={categoryList}
            onClose={handleModalChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
