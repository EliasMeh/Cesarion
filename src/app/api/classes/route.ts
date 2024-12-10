import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const data = await prisma.classe.findMany({
        include: {
            eleves: true
        }
    });

    return NextResponse.json(data);
}

export async function POST(request: Request) {
    const body = await request.json();
    const data = await prisma.classe.create({ data: body });
    return NextResponse.json(data);
}