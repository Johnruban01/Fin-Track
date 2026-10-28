import { jwtDecode } from "jwt-decode";

export const getUserId = (): string | null => {
  if (typeof window === "undefined") return null;
  try {
    const token = localStorage.getItem("token");
    return token ? jwtDecode<{ userId: string }>(token).userId : null;
  } catch {
    return null;
  }
}