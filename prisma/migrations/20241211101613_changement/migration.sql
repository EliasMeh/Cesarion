-- AlterTable
ALTER TABLE "Classe" ALTER COLUMN "classenom" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Utilisateur" ALTER COLUMN "password" SET DEFAULT 'azerty';
