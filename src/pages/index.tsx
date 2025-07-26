import AddExpenseModal from "@/components/AddExpenseModel";
import ExpensesList from "@/components/ExpensesList";
import { Button } from "@/components/ui/button";
import { apiConstants } from "@/lib/contants";
import { Categories, Expenses } from "@/types/epenses.types";
import { FilterIcon } from "lucide-react";
import Head from "next/head";
import { NextRequest } from "next/server";
import { useMemo, useState } from "react";

export default function Home({
  expensesList,
  isError,
  categoryList,
}: {
  expensesList: Expenses;
  isError: boolean;
  categoryList: Categories;
}) {
  const [openFilters, setOpenFilters] = useState(false);
  const [isAllCategorySelected, setIsAllCategorySelected] = useState(false);
  const [filters, setFilters] = useState<Array<number>>([]);

  const retryClick = () => window.location.reload();

  const addFilterValue = (value: number) => {
    setFilters((prev) =>
      prev.includes(value)
        ? prev.filter((val) => val !== value)
        : [...prev, value]
    );
  };

  const applyFilters = () => {};

  const TotalSum = useMemo(() => {
    return expensesList.reduce((acc, curr) => acc + curr.amount, 0) || 0;
  }, [expensesList]);

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-lg font-semibold text-red-600">
          Something went wrong
        </p>
        <Button onClick={retryClick} variant="default">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Expenses Tracker | Home</title>
      </Head>
      <div className="max-w-5xl mx-auto p-4 flex flex-col gap-6 min-h-[85vh]">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white border rounded-lg p-3 sm:p-4 shadow-md gap-3">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center sm:text-left">
            Expense Tracker
          </h1>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 w-full sm:w-auto"
              onClick={() => setOpenFilters(!openFilters)}
            >
              <FilterIcon className="w-4 h-4" /> Filters
            </Button>
            <AddExpenseModal categoryList={categoryList} />
          </div>
        </div>

        {openFilters && (
          <div className="bg-white border rounded-lg p-3 sm:p-4 shadow-sm">
            <h2 className="text-base sm:text-lg font-semibold mb-3">
              Filter by Category
            </h2>
            <div className="flex gap-2 flex-wrap mb-4">
              <span
                onClick={() => {
                  setIsAllCategorySelected(!isAllCategorySelected);
                  setFilters([]);
                }}
                className={`cursor-pointer px-3 py-2 border rounded-md text-sm ${
                  isAllCategorySelected
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                All
              </span>
              {categoryList.map((category) => (
                <span
                  key={category.id}
                  onClick={() => {
                    setIsAllCategorySelected(false);
                    addFilterValue(category.id);
                  }}
                  className={`cursor-pointer px-3 py-2 border rounded-md text-sm ${
                    filters.includes(category.id)
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {category.name}
                </span>
              ))}
            </div>
            <Button
              onClick={applyFilters}
              disabled={filters.length === 0 && !isAllCategorySelected}
              className="w-full sm:w-auto"
            >
              Apply Filters
            </Button>
          </div>
        )}

        <div className="bg-white border rounded-lg p-3 sm:p-4 shadow-sm sm:w-full">
          <ExpensesList expensesList={expensesList} />
        </div>

        <div className="bg-blue-600 text-white rounded-lg p-3 sm:p-4 text-lg sm:text-xl font-semibold flex justify-between items-center shadow-md">
          <span>Total:</span>
          <span>₹{TotalSum}</span>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req }: { req: NextRequest }) {
  const token = req.cookies?.token;

  let categoryList: Categories = [];
  let expensesList: Expenses = [];
  let isError = false;

  try {
    const response = await fetch(apiConstants.getCategories, {
      headers: { Authorization: token },
    });
    const data = await response.json();
    categoryList = data.categories;
  } catch (error) {
    console.log(error);
    isError = true;
  }

  try {
    const response = await fetch(apiConstants.getExpenses, {
      headers: { Authorization: token },
    });
    const data = await response.json();
    expensesList = data.expenses;
  } catch (error) {
    console.log(error);
    isError = true;
  }

  return {
    props: JSON.parse(
      JSON.stringify({
        categoryList,
        expensesList,
        isError,
      })
    ),
  };
}
