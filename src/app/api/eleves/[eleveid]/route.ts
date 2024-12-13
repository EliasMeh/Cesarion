import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: Promise<{ eleveid: string }> }) {
    const eleveid = parseInt((await params).eleveid, 10);

    const data = await prisma.eleve.findFirst({
        where: { id: eleveid }
    });

    return NextResponse.json(data);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ eleveid: string }> }) {
    const eleveid = parseInt((await params).eleveid, 10);
    const body = await request.json();

    try {
        const data = await prisma.eleve.update({
            where: { id: eleveid },
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
        return NextResponse.json({ error: 'Failed to update eleve' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ eleveid: string }> }) {
    const eleveid = parseInt((await params).eleveid, 10);

    try {
        await prisma.eleve.delete({
            where: { id: eleveid }
        });

        return NextResponse.json({ message: 'Eleve deleted successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to delete eleve' }, { status: 500 });
    }
}