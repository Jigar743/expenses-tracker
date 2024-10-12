import { Expenses } from "@/types/epenses.types";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
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
} from "lucide-react";
// import exp from "constants";

export const CategoryIcon = {
  Food: <ShoppingCart />,
  Transport: <CarFront />,
  Entertainment: <Clapperboard />,
  Utilities: <Cable />,
  Beverages: <CupSoda />,
  Condiments: <Martini />,
  Confections: <Cake />,
  Produce: <Grape />,
  Seafood: <Fish />,
  "Dairy Products": <Milk />,
  "Grains/Cereals": <Pizza />,
  "Meat/Poultry": <Beef />,
};

export default function ExpensesList({
  expensesList,
}: {
  expensesList: Expenses;
}) {
  //   const getCategoryColor = (categoryName) => {};

  //   const getCategoryIcon = (categoryName) => {};

  const getCategoryIcon = (
    categoryName: keyof typeof CategoryIcon
  ): React.ReactElement | null => {
    return CategoryIcon[categoryName];
  };

  const DisplayDate = ({ date }: { date: Date }) => {
    const dateObj = new Date(date);

    return (
      <div className="flex items-center bg-primary/10 rounded-full px-4 py-2">
        <CalendarIcon className="w-5 h-5 mr-2 text-primary" />
        <div>
          <div className="text-sm font-semibold">
            {dateObj.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </div>
          <div className="text-xs text-muted-foreground">
            {dateObj.getFullYear()}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2 ">
      {expensesList?.length > 0 &&
        expensesList?.map((expense) => (
          <Card
            key={expense.id}
            className="overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1"
          >
            <CardContent className="p-0">
              <div className="flex items-stretch">
                <div className="flex-grow p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {expense.title}
                    </h3>
                    <DisplayDate date={expense.date} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-sm px-3 py-1">
                        {getCategoryIcon(
                          expense.category.name as keyof typeof CategoryIcon
                        )}
                        <span className="ml-2">{expense.category?.name}</span>
                      </Badge>
                    </div>
                    <p className="text-3xl font-extrabold text-primary">
                      ₹{expense.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
