"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login"); // Redirect if no token
    }
  }, [token]);

  if (!token) {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
}
