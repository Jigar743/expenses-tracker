import { apiConstants } from "@/lib/contants";
import { AuthContextType, User } from "@/types/auth.types";
import { useRouter } from "next/router";
import React, { createContext, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setLoading] = React.useState(false);
  const router = useRouter();

  const fetchCurrentUser = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      if (token) {
        const response = await fetch(apiConstants.getCurrentUser, {
          method: "GET",
          headers: {
            Authorization: token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      }
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, [router]);

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch(apiConstants.userSignup, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        Cookies.set("token", data.token);
        router.push("/");
      }
    } catch (error) {
      console.error({ error });
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(apiConstants.userLogin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        Cookies.set("token", data.token);
        setUser(data.user);
        router.push("/");
      }
    } catch (error) {
      console.error({ error });
    }
  };

  const resetPassword = async (email: string) => {};

  const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("token");
    setUser(null);
    router.push("/auth/login");
  };

  const value = {
    isLoading,
    user,
    isAuthenticated: !!user,
    signup,
    login,
    logout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
