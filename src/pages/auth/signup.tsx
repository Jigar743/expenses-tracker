import SignupForm from "@/components/SignupForm";
import Head from "next/head";
import React from "react";

export default function SignupPage() {
  return (
    <>
      <Head>
        <title>Expenses Tracker | Signup</title>
      </Head>
      <>
        <SignupForm />
      </>
    </>
  );
}
