import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const data = await prisma.eleve.findMany();
    return NextResponse.json(data);
}
export async function POST(request: Request) {
    const body = await request.json();
    const data = await prisma.eleve.create({ data: body });
    return NextResponse.json(data);
}