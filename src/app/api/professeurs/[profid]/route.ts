import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: Promise<{ userid: string }> }) {
    const { userid } = await params;
    const userIdInt = parseInt(userid, 10);

    const data = await prisma.utilisateur.findFirst({
        where: { id: userIdInt }
    });

    return NextResponse.json(data);
}