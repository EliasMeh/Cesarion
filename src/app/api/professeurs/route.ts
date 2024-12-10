import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const data = await prisma.professeur.findMany();
    return NextResponse.json(data);
}
export async function POST(request: Request) {
    const body = await request.json();
    const data = await prisma.professeur.create({
        data: {
            name: body.name,
            lastname: body.lastname,
            login: body.login,
            password: body.password
        }
    });
    return NextResponse.json(data);
}