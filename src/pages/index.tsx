import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Expenses Tracker</title>
      </Head>
      <div>Marketing page</div>
    </>
  );
}
