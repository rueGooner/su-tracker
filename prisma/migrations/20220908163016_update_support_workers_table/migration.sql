/*
  Warnings:

  - You are about to drop the `SupportWorker` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "notes" DROP CONSTRAINT "notes_supportWorkerId_fkey";

-- DropTable
DROP TABLE "SupportWorker";

-- CreateTable
CREATE TABLE "support_workers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startDate" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "support_workers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_supportWorkerId_fkey" FOREIGN KEY ("supportWorkerId") REFERENCES "support_workers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
