/*
  Warnings:

  - Made the column `applicantPhoto` on table `applicant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "applicant" ALTER COLUMN "applicantPhoto" SET NOT NULL,
ALTER COLUMN "applicantPhoto" DROP DEFAULT;
