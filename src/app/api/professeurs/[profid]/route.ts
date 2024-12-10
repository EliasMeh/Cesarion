import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: Promise<{ profid: string }> }) {
    const { profid } = await params;
    const profIdInt = parseInt(profid, 10);

    const data = await prisma.professeur.findFirst({
        where: { id: profIdInt }
    });

    return NextResponse.json(data);
}