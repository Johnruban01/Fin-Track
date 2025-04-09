import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password || email === "" || password === "") {
    return new Response("Email and password are required", { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    if (!user.password) {
      return new Response("Invalid password", { status: 402 });
    }
    
    const passWordMatch: boolean = await (user.password === password);
    if(!passWordMatch) {
      return new Response("Invalid password", { status: 403 });
    }
    // ✅ Login successful – return safe user data only
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token: "dummy-token", // or real JWT later
    });

  } catch (error) {
    console.error("Error Logging in:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
