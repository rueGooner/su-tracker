/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `support_workers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `support_workers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "support_workers" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "skills" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "support_workers_email_key" ON "support_workers"("email");
