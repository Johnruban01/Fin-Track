import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const body = await request.json();
      const { id } = params;
  
      const { amount, type, date, category, title } = body;
  
      // Optional: Validate required fields
      if (!amount || !type || !date || !category || !title) {
        return new Response("Missing required fields", { status: 400 });
      }
  
      const transaction = await prisma.transaction.update({
        where: { id },
        data: {
          amount,
          type,
          date: new Date(date), // ensure proper Date object
          category,
          title,
        },
      });
  
      return new Response(JSON.stringify(transaction), { status: 200 });
    } catch (error) {
      console.error("Update error:", error);
      return new Response("Error updating transaction", { status: 500 });
    }
  }
  

  export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    const { id } = params;
  
    try {
      const transaction = await prisma.transaction.delete({
        where: { id },
      });
  
      return new Response(JSON.stringify(transaction), { status: 200 });
    } catch (error) {
      console.error("Error deleting transaction:", error);
      return new Response("Error deleting transaction", { status: 500 });
    }
  }
  