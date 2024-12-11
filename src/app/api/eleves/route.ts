import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const data = await prisma.eleve.findMany();
    return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Check if the body is an array
        if (!Array.isArray(body)) {
            return NextResponse.json({ error: 'Expected an array of students' }, { status: 400 });
        }

        const createdEleves = [];

        for (const eleve of body) {
            const data = await prisma.eleve.create({
                data: {
                    name: eleve.name,
                    lastname: eleve.lastname,
                    datenaissance: eleve.datenaissance,
                    redoublant: eleve.redoublant,
                    classeId: eleve.classeId
                }
            });
            createdEleves.push(data);
        }

        return NextResponse.json(createdEleves);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while creating the students' }, { status: 500 });
    }
}