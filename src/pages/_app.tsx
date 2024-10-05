import type { AppProps } from "next/app";
import "@/styles/globals.css";
import Layout from "@/components/Layout";
import AuthProvider from "@/providers/AuthProvider";
import ProtectedRoutes from "@/providers/ProtectedRoutes";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ProtectedRoutes>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ProtectedRoutes>
    </AuthProvider>
  );
}
