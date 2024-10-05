import { NextRequest, NextResponse } from "next/server";
import { apiConstants } from "./lib/contants";

export const publicRoutes = [
  "/auth/login",
  "/auth/signup",
  "/auth/forgot-password",
  "/auth/otp-verification",
];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || "";
  // let user = null,
  //   isAuthenticated = false;

  // try {
  //   if (token) {
  //     const response = await fetch(apiConstants.getCurrentUser, {
  //       headers: {
  //         Authorization: token,
  //       },
  //     });
  //     if (response.ok) {
  //       user = await response.json();
  //       isAuthenticated = !!user;
  //     }
  //   }
  // } catch (error) {
  //   console.error({ error });
  // }

  // console.log({ user, isAuthenticated });

  const { pathname } = req.nextUrl;
  const isPublicRoute = publicRoutes.includes(pathname);

  // if (user && !user?.isVerified && pathname !== "/auth/otp-verification") {
  //   return NextResponse.redirect(new URL("/auth/otp-verification", req.url));
  // }

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: [
    "/auth/login",
    "/auth/signup",
    "/auth/otp-verification",
    "/auth/forgot-password",
    "/",
  ],
};
