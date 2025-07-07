/*
  Warnings:

  - Added the required column `ninNumber` to the `applicant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "applicant" ADD COLUMN     "ninNumber" TEXT NOT NULL;
