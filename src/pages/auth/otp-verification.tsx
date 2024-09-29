import OtpVerificationForm from "@/components/OtpVerificationForm";
import Head from "next/head";
import React from "react";

export default function OtpVerificationPage() {
  return (
    <>
      <Head>
        <title>Expenses Tracker | OTP-Verification</title>
      </Head>
      <>
        <OtpVerificationForm />
      </>
    </>
  );
}
