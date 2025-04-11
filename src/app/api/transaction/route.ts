import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const body = await request.json();

    const { title, amount, type, category, userId} = body;

    if(!title || !amount || !type || !category || !userId) {
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }
    try {
        const transaction = await prisma.transaction.create({
            data: {
                title,
                amount,
                type,
                category,
                userId
            }
        });
        return NextResponse.json({ message: "Transaction created successfully", transaction }, { status: 201 });
    }
    catch (error) {
        console.error("Error creating transaction:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    
    if (!userId) {
        return NextResponse.json({ message: "Missing userId" }, { status: 400 });
    }

    try {
        const transactions = await prisma.transaction.findMany({
            where: {
                userId: userId
            }
        });
        return NextResponse.json(transactions, { status: 200 });
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
