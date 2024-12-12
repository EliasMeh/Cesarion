import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function GET() {
    const data = await prisma.utilisateur.findMany();
    return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
    const body = await request.json();

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const data = await prisma.utilisateur.create({
        data: {
            name: body.name,
            lastname: body.lastname,
            email: body.email,
            login: body.login,
            password: hashedPassword,
            role: body.role
        }
    });

    return NextResponse.json(data);
}