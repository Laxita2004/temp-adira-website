/*
  Warnings:

  - A unique constraint covering the columns `[emailVerifyToken]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_emailVerifyToken_key" ON "user"("emailVerifyToken");
