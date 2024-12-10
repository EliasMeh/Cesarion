import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { profid: string } }) {
    const profid = parseInt(params.profid, 10);

    const data = await prisma.professeur.findFirst({
        where: { id: profid }
    });

    return NextResponse.json(data);
}