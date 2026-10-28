import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { getUserId } from "../../../../lib/auth";

export async function GET(request: Request) {
  const userId = getUserId(request);
  if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const month = new URL(request.url).searchParams.get("month"); // "YYYY-MM"
  const now = new Date();
  let year = now.getUTCFullYear();
  let m = now.getUTCMonth();

  if (month) {
    const match = /^(\d{4})-(\d{2})$/.exec(month);
    if (!match || +match[2] < 1 || +match[2] > 12) {
      return NextResponse.json({ message: "month must be YYYY-MM" }, { status: 400 });
    }
    year = +match[1];
    m = +match[2] - 1;
  }

  const from = new Date(Date.UTC(year, m, 1));
  const to = new Date(Date.UTC(year, m + 1, 1));

  try {
    const grouped = await prisma.transaction.groupBy({
      by: ["type", "category"],
      where: { userId, date: { gte: from, lt: to } },
      _sum: { amount: true },
    });

    let income = 0;
    let expenses = 0;
    const byCategory: Record<string, number> = {};

    for (const g of grouped) {
      const sum = g._sum.amount ?? 0;
      if (g.type === "INCOME") {
        income += sum;
      } else {
        expenses += sum;
        byCategory[g.category] = (byCategory[g.category] ?? 0) + sum;
      }
    }

    return NextResponse.json({
      month: `${year}-${String(m + 1).padStart(2, "0")}`,
      income,
      expenses,
      balance: income - expenses,
      byCategory,
    });
  } catch (error) {
    console.error("Summary error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}