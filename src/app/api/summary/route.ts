import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request){
    const { searchParams} = new URL(request.url);

    const userId = searchParams.get("userId");
    const month = searchParams.get("month");
    
    if(!userId || !month){
        return new Response("Missing userId or month", {status: 400});
    }

    try{
        const transactions = await prisma.transaction.findMany({
            where:{
                userId: userId,
                date: {
                    gte: new Date(month),
                    lt: new Date(new Date(month).setMonth(new Date(month).getMonth() + 1))
                }
            }
        })

        const incomeTransactions = transactions.filter(tx => tx.type === "INCOME");
        const expenseTransactions = transactions.filter(tx => tx.type === "EXPENSE");

        const income = incomeTransactions.reduce((sum, tx) => sum + tx.amount, 0);
        const expenses = expenseTransactions.reduce((sum, tx) => sum + tx.amount, 0);

        const balance = income - expenses;
        
    }
    catch(error){
        console.error("Error fetching transactions:", error);
        return new Response("Internal server error", {status: 500});
    }
}