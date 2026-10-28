import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function POST(request: Request) {
  const { email, name, password } = await request.json().catch(() => ({}));

  if (!email || !name || !password) {
    return NextResponse.json({ message: "Name, email and password are required" }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 });
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ message: "An account with this email already exists" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, name, password: hashed } });

    return NextResponse.json(
      { success: true, user: { id: user.id, name: user.name, email: user.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}