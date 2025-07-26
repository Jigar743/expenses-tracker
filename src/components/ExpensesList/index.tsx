import { Expenses } from "@/types/epenses.types";
import React from "react";
import {
  Beef,
  Cable,
  Cake,
  CalendarIcon,
  CarFront,
  Clapperboard,
  CupSoda,
  Fish,
  Grape,
  Martini,
  Milk,
  Pizza,
  ShoppingCart,
  Edit2,
  Trash2,
} from "lucide-react";

const CategoryIcon = {
  Food: <ShoppingCart className="w-4 h-4" />,
  Transport: <CarFront className="w-4 h-4" />,
  Entertainment: <Clapperboard className="w-4 h-4" />,
  Utilities: <Cable className="w-4 h-4" />,
  Beverages: <CupSoda className="w-4 h-4" />,
  Condiments: <Martini className="w-4 h-4" />,
  Confections: <Cake className="w-4 h-4" />,
  Produce: <Grape className="w-4 h-4" />,
  Seafood: <Fish className="w-4 h-4" />,
  "Dairy Products": <Milk className="w-4 h-4" />,
  "Grains/Cereals": <Pizza className="w-4 h-4" />,
  "Meat/Poultry": <Beef className="w-4 h-4" />,
};

const categoryColors: Record<string, string> = {
  Food: "bg-green-100 text-green-700",
  Transport: "bg-yellow-100 text-yellow-700",
  Entertainment: "bg-purple-100 text-purple-700",
  Utilities: "bg-orange-100 text-orange-700",
  Beverages: "bg-blue-100 text-blue-700",
  Default: "bg-gray-100 text-gray-600",
};

export default function ExpensesList({
  expensesList,
}: {
  expensesList: Expenses;
}) {
  const getCategoryIcon = (name: keyof typeof CategoryIcon) =>
    CategoryIcon[name] || <ShoppingCart className="w-4 h-4" />;

  const getCategoryColor = (name: string) =>
    categoryColors[name] || categoryColors.Default;

  const DisplayDate = ({ date }: { date: Date }) => {
    const d = new Date(date);
    return (
      <div className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-gray-50 text-gray-500">
        <CalendarIcon className="w-3 h-3" />
        {d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {expensesList?.length > 0 ? (
        expensesList.map((expense) => (
          <div
            key={expense.id}
            className="relative group bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col gap-4"
          >
            {/* Edit/Delete Buttons - Hidden until hover */}
            <div className="absolute -top-3 -right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => console.log(`Edit expense ${expense.id}`)}
                className="bg-gray-100 p-2 rounded-full hover:bg-gray-100 transition"
                title="Edit"
              >
                <Edit2 className="w-4 h-4 text-gray-600 hover:text-blue-600" />
              </button>
              <button
                onClick={() => console.log(`Delete expense ${expense.id}`)}
                className="bg-gray-100 p-2 rounded-full hover:bg-gray-100 transition"
                title="Delete"
              >
                <Trash2 className="w-4 h-4 text-gray-600 hover:text-red-600" />
              </button>
            </div>

            {/* Header: Title + Amount */}
            <div className="flex justify-between items-start gap-2">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  {getCategoryIcon(
                    expense.category.name as keyof typeof CategoryIcon
                  )}
                </div>
                <div className="flex-1">
                  <h3
                    className="text-base font-semibold text-gray-800 truncate max-w-[150px] sm:max-w-[180px]"
                    title={expense.title}
                  >
                    {expense.title}
                  </h3>
                  <div className="mt-1">
                    <DisplayDate date={expense.date} />
                  </div>
                </div>
              </div>
              <p className="text-lg font-semibold text-blue-600 whitespace-nowrap">
                ₹{expense.amount.toFixed(2)}
              </p>
            </div>

            {/* Category Badge */}
            <div>
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full font-medium ${getCategoryColor(
                  expense.category.name
                )}`}
              >
                {getCategoryIcon(
                  expense.category.name as keyof typeof CategoryIcon
                )}
                <span
                  className="truncate max-w-[100px]"
                  title={expense.category.name}
                >
                  {expense.category.name}
                </span>
              </span>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-400 py-8 col-span-full">
          No expenses found.
        </p>
      )}
    </div>
  );
}
