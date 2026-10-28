import { TransactionType, TransactionCategory } from "@prisma/client";

export function parseTransaction(input: unknown):
  | { error: string }
  | { data: { title: string; amount: number; type: TransactionType; category: TransactionCategory; date: Date } } {
  const body = (input ?? {}) as Record<string, unknown>;

  const title = typeof body.title === "string" ? body.title.trim() : "";
  const amount = Number(body.amount);
  const type = body.type as TransactionType;
  const category = body.category as TransactionCategory;

  if (!title) return { error: "Title is required" };
  if (!Number.isFinite(amount) || amount <= 0) return { error: "Amount must be greater than 0" };
  if (!Object.values(TransactionType).includes(type)) return { error: "Invalid type" };
  if (!Object.values(TransactionCategory).includes(category)) return { error: "Invalid category" };

  const date = body.date ? new Date(body.date as string) : new Date();
  if (isNaN(date.getTime())) return { error: "Invalid date" };

  return { data: { title, amount, type, category, date } };
}