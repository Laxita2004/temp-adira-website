/*
  Warnings:

  - Added the required column `bannerUrl` to the `sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sale" ADD COLUMN     "bannerUrl" TEXT NOT NULL;
