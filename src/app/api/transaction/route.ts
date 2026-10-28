import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { getUserId } from "../../../../lib/auth";
import { parseTransaction } from "../../../../lib/validate";

export async function GET(request: Request) {
  const userId = getUserId(request);
  if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const limit = Number(new URL(request.url).searchParams.get("limit")) || undefined;

  const transactions = await prisma.transaction.findMany({
    where: { userId },
    orderBy: { date: "desc" },
    take: limit,
  });
  return NextResponse.json(transactions);
}

export async function POST(request: Request) {
  const userId = getUserId(request);
  if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const parsed = parseTransaction(await request.json().catch(() => null));
  if ("error" in parsed) return NextResponse.json({ message: parsed.error }, { status: 400 });

  try {
    const transaction = await prisma.transaction.create({ data: { ...parsed.data, userId } });
    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}