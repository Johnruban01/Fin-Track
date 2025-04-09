import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const body = await request.json();
    const {email, name , password} = body;

    if(!email || !password || email === "" || password === "" || name === "" || name === "") {
        return new Response("Email, name and password are required", { status: 400 });
    }

    if (password.length < 6) {
        return new Response("Password must be at least 6 characters long", { status: 400 });
    }

    try{

        const existingUser = await prisma.user.findUnique({
            where: { email }
        })
        if (existingUser) {
            return new Response("User already exists", { status: 409 });
        }

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password
            }
        })

        return new Response(JSON.stringify({ success: true, user }), { status: 201 });
    }
    catch(e){
        console.error("Error registering user:", e);
        return new Response("Internal Server Error", { status: 500 });
    }
}