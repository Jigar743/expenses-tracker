import type { AppProps } from "next/app";
import "@/styles/globals.css";
import Layout from "@/components/Layout";
import AuthProvider from "@/providers/AuthProvider";
import ProtectedRoutes from "@/providers/ProtectedRoutes";
import { wrapper } from "@/store";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <ProtectedRoutes>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ProtectedRoutes>
      </AuthProvider>
    </>
  );
}

export default wrapper.withRedux(App);
