import type { AppProps } from "next/app";
import "@/styles/globals.css";
import Layout from "@/components/Layout";
import AuthProvider from "@/providers/AuthProvider";
import ProtectedRoutes from "@/providers/ProtectedRoutes";
import { wrapper } from "@/store";
import { Toaster } from "@/components/ui/toaster";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <ProtectedRoutes>
          <Layout>
            <Component {...pageProps} />
            <Toaster />
          </Layout>
        </ProtectedRoutes>
      </AuthProvider>
    </>
  );
}

export default wrapper.withRedux(App);
