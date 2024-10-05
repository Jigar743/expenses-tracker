import AddExpenseModal from "@/components/AddExpenseModel";
import ExpensesList from "@/components/ExpensesList";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { apiConstants } from "@/lib/contants";
import { Categories, Expenses } from "@/types/epenses.types";
import { FilterIcon } from "lucide-react";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useState } from "react";

const inter = Inter({ subsets: ["cyrillic"] });

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

  const retryClick = () => {
    window.location.reload();
  };

  const addFilterValue = (value: number) => {
    console.log(value);
    const prevFilters = [...filters];

    if (prevFilters.some((val) => val === value)) {
      const index = prevFilters.findIndex((val) => val === value);
      prevFilters.splice(index, 1);
      setFilters(prevFilters);
    } else {
      prevFilters.push(value);
      setFilters(prevFilters);
    }
  };

  const applyFilters = () => {};

  if (isError) {
    return (
      <div className="flex items-center">
        <p>Something went wrong</p>
        <Button onClick={retryClick} variant="secondary">
          Retry
        </Button>
      </div>
    );
  }

  console.log(filters.length === 0 && !isAllCategorySelected);

  return (
    <>
      <Head>
        <title>Expenses Tracker | Home</title>
      </Head>
      <div className="w-[80%] m-auto flex flex-col gap-4">
        <div className="mt-2 p-2 rounded border">
          <div className="flex gap-2 justify-end">
            <div
              onClick={() => setOpenFilters(!openFilters)}
              className="p-2 border rounded cursor-pointer"
            >
              <FilterIcon />
            </div>
            <AddExpenseModal
              expensesList={expensesList}
              categoryList={categoryList}
            />
          </div>
          {openFilters && (
            <div>
              <div className="py-2 flex gap-2 flex-wrap">
                <span
                  onClick={() => {
                    setIsAllCategorySelected(!isAllCategorySelected);
                    setFilters([]);
                  }}
                  className={`cursor-pointer px-4 py-2 border rounded ${
                    isAllCategorySelected ? "text-white bg-black" : ""
                  }`}
                >
                  All
                </span>
                {categoryList.map((category) => (
                  <span
                    className={`cursor-pointer px-4 py-2 border rounded ${
                      filters.some((val) => val === category.id)
                        ? "text-white bg-black"
                        : ""
                    }`}
                    key={category.id}
                    onClick={() => {
                      setIsAllCategorySelected(false);
                      addFilterValue(category.id);
                    }}
                  >
                    {category.name}
                  </span>
                ))}
              </div>
              <Button
                onClick={applyFilters}
                disabled={filters.length === 0 && !isAllCategorySelected}
              >
                Apply
              </Button>
            </div>
          )}
        </div>
        <div className="p-2  rounded h-[80vh] overflow-auto scroll-m-0">
          <ExpensesList expensesList={expensesList} />
        </div>
        <div className="mb-2 font-semibold bg-blue-400 p-4 text-white rounded text-2xl flex flex-row justify-between">
          <span>Total Expense: </span>
          <span>
            ₹{expensesList.reduce((acc, expense) => acc + expense.amount, 0)}
          </span>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  let categoryList: Categories = [];
  let expensesList: Expenses = [];
  let isError = false;

  try {
    const response = await fetch(apiConstants.getCategories);
    const data = await response.json();
    categoryList = data.categories;
  } catch (error) {
    console.log(error);
    isError = true;
  }

  try {
    const response = await fetch(apiConstants.getExpenses);
    const data = await response.json();
    expensesList = data.expenses;
  } catch (error) {
    console.log(error);
    isError = true;
  }

  const serverProps = JSON.parse(
    JSON.stringify({
      categoryList,
      expensesList,
      isError,
    })
  );

  return {
    props: serverProps,
  };
}
