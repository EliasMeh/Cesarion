import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // Create some Professeurs
    const professeur1 = await prisma.professeur.create({
        data: {
            name: "John",
            lastname: "Doe",
            login: "johndoe",
            password: "password123"
        }
    });

    const professeur2 = await prisma.professeur.create({
        data: {
            name: "Jane",
            lastname: "Smith",
            login: "janesmith",
            password: "password123"
        }
    });

    // Create some Classes
    const classe1 = await prisma.classe.create({
        data: {
            classerang: "CP",
            classenom: "A",
            professeur: {
                connect: { id: professeur1.id }
            }
        }
    });

    const classe2 = await prisma.classe.create({
        data: {
            classerang: "CE1",
            classenom: "A",
            professeur: {
                connect: { id: professeur2.id }
            }
        }
    });

    // Create some Eleves
    await prisma.eleve.createMany({
        data: [
            { name: "Alice", lastname: "Johnson", redoublant: false, classeId: classe1.id },
            { name: "Bob", lastname: "Brown", redoublant: false, classeId: classe1.id },
            { name: "Charlie", lastname: "Davis", redoublant: false, classeId: classe2.id },
            { name: "Diana", lastname: "Evans", redoublant: true, classeId: classe2.id }
        ]
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });