import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { eleveid: string } }) {
    const eleveid = parseInt(params.eleveid, 10);

    const data = await prisma.eleve.findFirst({
        where: { id: eleveid }
    });

    return NextResponse.json(data);
}