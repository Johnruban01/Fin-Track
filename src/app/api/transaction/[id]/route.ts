import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { getUserId } from "../../../../../lib/auth";
import { parseTransaction } from "../../../../../lib/validate";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Ctx) {
  const userId = getUserId(request);
  if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const parsed = parseTransaction(await request.json().catch(() => null));
  if ("error" in parsed) return NextResponse.json({ message: parsed.error }, { status: 400 });

  try {
    // userId in the filter means you can only update your own rows
    const result = await prisma.transaction.updateMany({ where: { id, userId }, data: parsed.data });
    if (result.count === 0) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ message: "Error updating transaction" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Ctx) {
  const userId = getUserId(request);
  if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  try {
    const result = await prisma.transaction.deleteMany({ where: { id, userId } });
    if (result.count === 0) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ message: "Error deleting transaction" }, { status: 500 });
  }
}