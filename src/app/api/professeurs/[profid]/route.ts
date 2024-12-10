import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request, context: { params: { profid: string } }) {
    const { params } = context;
    const profid = params.profid;

    const data = await prisma.professeur.findFirst({
        where: { id: profid }
    });

    return NextResponse.json(data);
}