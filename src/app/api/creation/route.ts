import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const body = await request.json();

    try {
        for (const item of body) {
            // Find or create the professeur
            const professeur = await prisma.utilisateur.upsert({
                where: { login: item["Nom Professeur"] },
                update: {},
                create: {
                    name: item["Nom Professeur"],
                    lastname: item["Nom Professeur"], // Assuming same as name
                    login: item["Nom Professeur"], // Assuming login is the same as name
                    password: "azerty", // You should replace this with a secure password generation logic
                    role: "professeur"
                }
            });

            // Find or create the classe
            const classe = await prisma.classe.upsert({
                where: { id: item["ClasseId"] }, // Assuming item contains a unique identifier "ClasseId"
                update: {},
                create: {
                    classerang: item["Niveau"],
                    classenom: item["Niveau"],
                    anneescolaire: new Date().getFullYear(), // Assuming current year
                    utilisateurid: professeur.id
                }
            });

            // Create the eleve
            await prisma.eleve.create({
                data: {
                    name: item["Prénom Élève"],
                    lastname: item["Nom Élève"],
                    datenaissance: new Date(item["Date de Naissance"]),
                    redoublant: false, // Assuming redoublant is false for all entries
                    classeId: classe.id
                }
            });
        }

        return NextResponse.json({ message: "Data imported successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to import data" }, { status: 500 });
    }
}