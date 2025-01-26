import ChangePasswordForm from "@/components/ChangePasswordForm";
import Head from "next/head";
import React from "react";

function ChangePasswordPage() {
  return (
    <>
      <Head>
        <title>Expenses Tracker | Change Password</title>
      </Head>
      <>
        <ChangePasswordForm />
      </>
    </>
  );
}

export default ChangePasswordPage;
