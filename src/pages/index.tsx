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

  const retryClick = () => {
    window.location.reload();
  };

  const addFilterValue = (value: number) => {
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

  const TotalSum = useMemo(() => {
    return expensesList.reduce((acc, curr) => acc + curr.amount, 0) || 0;
  }, [expensesList]);

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

  return (
    <>
      <Head>
        <title>Expenses Tracker | Home</title>
      </Head>
      <div className="h-[85vh] m-auto flex flex-col gap-4 sm:w-[100%] md:w-[100%] lg:w-[80%]">
        <div className="mt-2 p-2 rounded border">
          <div className="flex gap-2 justify-end">
            <div
              onClick={() => setOpenFilters(!openFilters)}
              className="p-2 border rounded cursor-pointer"
            >
              <FilterIcon />
            </div>
            <AddExpenseModal categoryList={categoryList} />
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
        <div className="p-2 overflow-auto scroll-m-0 border rounded">
          <ExpensesList expensesList={expensesList} />
        </div>
        <div className="mb-2 font-semibold bg-blue-400 p-4 text-white rounded text-2xl flex flex-row justify-between">
          <span>Total Expense: </span>
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
      headers: {
        Authorization: token,
      },
    });
    const data = await response.json();
    categoryList = data.categories;
  } catch (error) {
    console.log(error);
    isError = true;
  }

  try {
    const response = await fetch(apiConstants.getExpenses, {
      headers: {
        Authorization: token,
      },
    });
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
