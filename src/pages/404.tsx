// pages/404.js
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="mt-4 text-xl text-gray-600">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <div className="mt-6">
          <Button onClick={() => router.push({ pathname: "/" })}>
            Go Back Home
          </Button>
        </div>
      </div>
    </div>
  );
}
