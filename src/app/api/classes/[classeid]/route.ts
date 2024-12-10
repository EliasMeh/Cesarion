import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const url = new URL(request.url);
    const classeid = Number(url.pathname.split("/").pop());

    const data = await prisma.classe.findFirst({
        where: { id: classeid },
        include: {
            eleves: true
        }
    });

    return NextResponse.json(data);
}