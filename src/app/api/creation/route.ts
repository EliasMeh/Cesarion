import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Utilisateur, Classe } from "@prisma/client";

const prisma = new PrismaClient();

interface InputData {
    "Niveau": string;
    "Nom Élève": string;
    "Prénom Élève": string;
    "Date de Naissance": string; // Format: "DD-MM-YYYY"
    "Nom Professeur": string;
}

interface GroupedData {
    professeur: string;
    niveau: string;
    eleves: InputData[];
}

export async function POST(request: NextRequest) {
    const body: InputData[] = await request.json();

    try {
        // Group items by "Nom Professeur"
        const groupedData: Record<string, GroupedData> = body.reduce((acc: Record<string, GroupedData>, item: InputData) => {
            const key = item["Nom Professeur"];
            if (!acc[key]) {
                acc[key] = {
                    professeur: item["Nom Professeur"],
                    niveau: item["Niveau"],
                    eleves: []
                };
            }
            acc[key].eleves.push(item);
            return acc;
        }, {});

        for (const professeurName in groupedData) {
            const group = groupedData[professeurName];
            
            // Split the professeurName into name and lastname
            const [name, lastname] = professeurName.split(' ');

            // Create or update the professeur
            const professeurLogin = professeurName.toLowerCase().replace(' ', '');
            const professeur: Utilisateur = await prisma.utilisateur.upsert({
                where: { login: professeurLogin },
                update: {},
                create: {
                    name: name,
                    lastname: lastname,
                    email: `${professeurLogin}@example.com`,
                    login: professeurLogin,
                    password: "azerty",
                    role: "professeur"
                }
            });

            // Create or update the classe
            const classe: Classe = await prisma.classe.upsert({
                where: { utilisateurid: professeur.id },
                update: {},
                create: {
                    classerang: group.niveau,
                    classenom: group.niveau,
                    anneescolaire: new Date().getFullYear(), // Assuming current year
                    utilisateurid: professeur.id
                }
            });

            for (const eleveData of group.eleves) {
                await prisma.eleve.create({
                    data: {
                        name: eleveData["Prénom Élève"],
                        lastname: eleveData["Nom Élève"],
                        datenaissance: eleveData["Date de Naissance"], // Use the date as a string
                        redoublant: false,
                        classeId: classe.id
                    }
                });
            }
        }

        return NextResponse.json({ message: "Data imported successfully" });
    } catch (error) {
        console.error("Error details:", error);
        if (error instanceof Error) {
            if (error.message.includes("503")) {
                return NextResponse.json({ error: "File too big" }, { status: 503 });
            }
            return NextResponse.json({ error: "Failed to import data", details: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Failed to import data", details: "Unknown error" }, { status: 500 });
    }
}
