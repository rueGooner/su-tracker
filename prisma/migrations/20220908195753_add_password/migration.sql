/*
  Warnings:

  - Added the required column `password` to the `support_workers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "support_workers" ADD COLUMN     "password" TEXT NOT NULL;
