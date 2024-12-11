import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const body = await request.json();

    try {
        await prisma.currentYear.deleteMany();
        const data = await prisma.currentYear.create({ data: body });
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update current year' }, { status: 500 });
    }
}

export async function GET() {
    const data = await prisma.currentYear.findFirst();
    return NextResponse.json(data);
}