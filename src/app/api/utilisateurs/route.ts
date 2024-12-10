import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const data = await prisma.utilisateur.findMany();
    return NextResponse.json(data);
}
export async function POST(request: Request) {
    const body = await request.json();
    const data = await prisma.utilisateur.create({
        data: {
            name: body.name,
            lastname: body.lastname,
            login: body.login,
            password: body.password,
            role: body.role
        }
    });
    return NextResponse.json(data);
}