import jwt from "jsonwebtoken";

export function getUserId(request: Request): string | null {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) return null;
  try {
    const payload = jwt.verify(header.slice(7), process.env.JWT_SECRET!) as { userId?: string };
    return payload.userId ?? null;
  } catch {
    return null;
  }
}