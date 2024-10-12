import { NextRequest, NextResponse } from "next/server";
import { apiConstants } from "./lib/contants";

export const publicRoutes = [
  "/auth/login",
  "/auth/signup",
  "/auth/forgot-password",
  "/auth/otp-verification",
];

export const privateRoutes = ["/", "/my-profile", "/change-password"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || "";
  const { pathname } = req.nextUrl;
  const isPublicRoute = publicRoutes.includes(pathname);
  const isPrivateRoute = privateRoutes.includes(pathname);

  if (!token && (isPrivateRoute || pathname === "/auth/otp-verification")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  let user = null,
    isAuthenticated = false,
    isVerified = false;

  try {
    if (token) {
      const response = await fetch(apiConstants.getCurrentUser, {
        headers: {
          Authorization: token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        user = data?.user;
        isVerified = data?.user?.isVerified;
        isAuthenticated = !!user;
      }
    }
  } catch (error) {
    console.error({ error });
    localStorage.removeItem("token");
    req.cookies.clear();
  }

  if (user) {
    if (!isVerified) {
      if (isPrivateRoute) {
        return NextResponse.redirect(
          new URL("/auth/otp-verification", req.url)
        );
      }

      if (
        pathname !== "/otp-verification" &&
        (pathname === "/auth/login" ||
          pathname === "/auth/signup" ||
          pathname === "/auth/forgot-password")
      ) {
        return NextResponse.redirect(
          new URL("/auth/otp-verification", req.url)
        );
      }
    }

    if (isPublicRoute && isVerified) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (!user && isPrivateRoute) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: [
    "/auth/login",
    "/auth/signup",
    "/auth/otp-verification",
    "/auth/forgot-password",
    "/",
    "/my-profile",
    "/change-password",
  ],
};
