/*
  Warnings:

  - A unique constraint covering the columns `[journalId,tagId]` on the table `JournalTags` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "JournalTags_journalId_tagId_key" ON "JournalTags"("journalId", "tagId");
