import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;

  if (!email || !name || !password) {
    return new Response("Email, name, and password are required", { status: 400 });
  }

  if (password.length < 6) {
    return new Response("Password must be at least 6 characters long", { status: 400 });
  }

  try {
    console.log("Incoming register request:", { email, name, password });
  
    const existingUser = await prisma.user.findUnique({ where: { email } });
  
    if (existingUser) {
      console.log("User already exists");
      return new Response("User already exists", { status: 409 });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed");
  
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
  
    console.log("User created:", user);
  
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    }, { status: 201 });
  
  } catch (error) {
    console.error("❌ Registration error:", error); // THIS will show the real reason
    return new Response("Internal Server Error", { status: 500 });
  }
  
  
}
