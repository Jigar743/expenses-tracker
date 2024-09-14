import AddExpenseModal from "@/components/AddExpenseModel/AddExpense-Modal";
import { Categories, Expenses } from "@/types/epenses.types";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["cyrillic"] });

export default function Home({
  expensesList,
  isError,
  categories,
}: {
  expensesList: Expenses;
  isError: boolean;
  categories: Categories;
}) {
  console.log({ categories, expensesList, isError });
  return (
    <>
      <Head>
        <title>Expenses Tracker | Home</title>
      </Head>
      <div>
        <AddExpenseModal expensesList={expensesList} categories={categories} />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const expensesURL = "http://localhost:3000/api/expenses";
  const categoryURL = "http://localhost:3000/api/categories";
  try {
    const response = await fetch(expensesURL);
    const response2 = await fetch(categoryURL);
    const data = await response.json();
    const data2 = await response2.json();
    return {
      props: {
        isError: false,
        expensesList: data.expenses,
        categories: data2.categories,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { isError: true, expensesList: [], categories: [] },
    };
  } finally {
    console.log("This will always run");
  }
}
