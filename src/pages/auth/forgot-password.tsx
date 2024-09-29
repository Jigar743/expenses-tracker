import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import Head from "next/head";
import React from "react";

export default function ForgotPasswordPage() {
  return (
    <>
      <Head>
        <title>Expenses Tracker | Forgot-password</title>
      </Head>
      <>
        <ForgotPasswordForm />
      </>
    </>
  );
}
