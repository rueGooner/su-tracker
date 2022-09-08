/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `service_users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uid` to the `service_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "service_users" ADD COLUMN     "uid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "service_users_uid_key" ON "service_users"("uid");
