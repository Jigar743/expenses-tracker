import LoginForm from "@/components/LoginForm";
import Head from "next/head";
import React from "react";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Expenses Tracker | Login</title>
      </Head>
      <>
        <LoginForm />
      </>
    </>
  );
}
