-- CreateTable
CREATE TABLE "UpdatedNote" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "noteId" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UpdatedNote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UpdatedNote" ADD CONSTRAINT "UpdatedNote_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
