import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const data = await prisma.eleve.findMany();
    return NextResponse.json(data);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const datenaissance = body.datenaissance ? new Date(body.datenaissance) : null;
        if (datenaissance) {
            datenaissance.setUTCHours(0, 0, 0, 0); // Set time to midnight
        }
        const data = await prisma.eleve.create({
            data: {
                name: body.name,
                lastname: body.lastname,
                datenaissance: body.datenaissance,
                redoublant: body.redoublant,
                classeId: body.classeId
            }
        });
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while creating the student' }, { status: 500 });
    }
}