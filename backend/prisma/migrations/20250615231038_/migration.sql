/*
  Warnings:

  - You are about to drop the column `contactNumber` on the `applicant` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `applicant` table. All the data in the column will be lost.
  - You are about to drop the column `county` on the `applicant` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `applicant` table. All the data in the column will be lost.
  - You are about to drop the column `facility` on the `applicant` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `applicant` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `applicant` table. All the data in the column will be lost.
  - You are about to drop the column `middleName` on the `applicant` table. All the data in the column will be lost.
  - You are about to drop the column `sex` on the `applicant` table. All the data in the column will be lost.
  - You are about to drop the column `signature` on the `applicant` table. All the data in the column will be lost.
  - You are about to drop the column `townOrCity` on the `applicant` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `applicantFather` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `applicantFather` table. All the data in the column will be lost.
  - You are about to drop the column `county` on the `applicantFather` table. All the data in the column will be lost.
  - You are about to drop the column `countyOfOrigin` on the `applicantFather` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfNaturalization` on the `applicantFather` table. All the data in the column will be lost.
  - You are about to drop the column `fatherLiving` on the `applicantFather` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `applicantFather` table. All the data in the column will be lost.
  - You are about to drop the column `nationality` on the `applicantFather` table. All the data in the column will be lost.
  - You are about to drop the column `occupation` on the `applicantFather` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `applicantFather` table. All the data in the column will be lost.
  - You are about to drop the column `presentAddress` on the `applicantFather` table. All the data in the column will be lost.
  - You are about to drop the column `telephoneNumber` on the `applicantFather` table. All the data in the column will be lost.
  - You are about to drop the column `townOrCity` on the `applicantFather` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `applicantMother` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `applicantMother` table. All the data in the column will be lost.
  - You are about to drop the column `county` on the `applicantMother` table. All the data in the column will be lost.
  - You are about to drop the column `countyOfOrigin` on the `applicantMother` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfNaturalization` on the `applicantMother` table. All the data in the column will be lost.
  - You are about to drop the column `fatherLiving` on the `applicantMother` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `applicantMother` table. All the data in the column will be lost.
  - You are about to drop the column `nationality` on the `applicantMother` table. All the data in the column will be lost.
  - You are about to drop the column `occupation` on the `applicantMother` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `applicantMother` table. All the data in the column will be lost.
  - You are about to drop the column `presentAddress` on the `applicantMother` table. All the data in the column will be lost.
  - You are about to drop the column `telephoneNumber` on the `applicantMother` table. All the data in the column will be lost.
  - You are about to drop the column `townOrCity` on the `applicantMother` table. All the data in the column will be lost.
  - You are about to drop the `photo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `applicantContactNumber` to the `applicant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicantCountry` to the `applicant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicantCounty` to the `applicant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicantDateOfBirth` to the `applicant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicantFacility` to the `applicant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicantFirstName` to the `applicant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicantLastName` to the `applicant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicantSex` to the `applicant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicantSignature` to the `applicant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicantTownOrCity` to the `applicant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fatherAge` to the `applicantFather` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fatherCountry` to the `applicantFather` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fatherCounty` to the `applicantFather` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fatherCountyOfOrigin` to the `applicantFather` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fatherDateOfNaturalization` to the `applicantFather` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fatherName` to the `applicantFather` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fatherNationality` to the `applicantFather` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fatherOccupation` to the `applicantFather` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fatherTownOrCity` to the `applicantFather` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isFatherLiving` to the `applicantFather` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isMotherLiving` to the `applicantMother` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motherAge` to the `applicantMother` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motherCountry` to the `applicantMother` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motherCounty` to the `applicantMother` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motherCountyOfOrigin` to the `applicantMother` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motherDateOfNaturalization` to the `applicantMother` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motherName` to the `applicantMother` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motherNationality` to the `applicantMother` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motherOccupation` to the `applicantMother` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motherTownOrCity` to the `applicantMother` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "applicant" DROP COLUMN "contactNumber",
DROP COLUMN "country",
DROP COLUMN "county",
DROP COLUMN "dateOfBirth",
DROP COLUMN "facility",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "middleName",
DROP COLUMN "sex",
DROP COLUMN "signature",
DROP COLUMN "townOrCity",
ADD COLUMN     "applicantContactNumber" VARCHAR(14) NOT NULL,
ADD COLUMN     "applicantCountry" VARCHAR(255) NOT NULL,
ADD COLUMN     "applicantCounty" VARCHAR(255) NOT NULL,
ADD COLUMN     "applicantDateOfBirth" TEXT NOT NULL,
ADD COLUMN     "applicantFacility" VARCHAR(255) NOT NULL,
ADD COLUMN     "applicantFirstName" VARCHAR(255) NOT NULL,
ADD COLUMN     "applicantLastName" VARCHAR(255) NOT NULL,
ADD COLUMN     "applicantMiddleName" VARCHAR(255),
ADD COLUMN     "applicantSex" TEXT NOT NULL,
ADD COLUMN     "applicantSignature" TEXT NOT NULL,
ADD COLUMN     "applicantTownOrCity" VARCHAR(255) NOT NULL,
ADD COLUMN     "formNumber" TEXT DEFAULT '',
ADD COLUMN     "parentOrGuardianPhoto" TEXT[];

-- AlterTable
ALTER TABLE "applicantFather" DROP COLUMN "age",
DROP COLUMN "country",
DROP COLUMN "county",
DROP COLUMN "countyOfOrigin",
DROP COLUMN "dateOfNaturalization",
DROP COLUMN "fatherLiving",
DROP COLUMN "fullName",
DROP COLUMN "nationality",
DROP COLUMN "occupation",
DROP COLUMN "photo",
DROP COLUMN "presentAddress",
DROP COLUMN "telephoneNumber",
DROP COLUMN "townOrCity",
ADD COLUMN     "fatherAge" INTEGER NOT NULL,
ADD COLUMN     "fatherCountry" VARCHAR(255) NOT NULL,
ADD COLUMN     "fatherCounty" VARCHAR(255) NOT NULL,
ADD COLUMN     "fatherCountyOfOrigin" VARCHAR(255) NOT NULL,
ADD COLUMN     "fatherDateOfNaturalization" TEXT NOT NULL,
ADD COLUMN     "fatherName" VARCHAR(255) NOT NULL,
ADD COLUMN     "fatherNationality" VARCHAR(255) NOT NULL,
ADD COLUMN     "fatherOccupation" VARCHAR(255) NOT NULL,
ADD COLUMN     "fatherPresentAddress" VARCHAR(255),
ADD COLUMN     "fatherTelephoneNumber" VARCHAR(12),
ADD COLUMN     "fatherTownOrCity" VARCHAR(255) NOT NULL,
ADD COLUMN     "isFatherLiving" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "applicantMother" DROP COLUMN "age",
DROP COLUMN "country",
DROP COLUMN "county",
DROP COLUMN "countyOfOrigin",
DROP COLUMN "dateOfNaturalization",
DROP COLUMN "fatherLiving",
DROP COLUMN "fullName",
DROP COLUMN "nationality",
DROP COLUMN "occupation",
DROP COLUMN "photo",
DROP COLUMN "presentAddress",
DROP COLUMN "telephoneNumber",
DROP COLUMN "townOrCity",
ADD COLUMN     "isMotherLiving" TEXT NOT NULL,
ADD COLUMN     "motherAge" INTEGER NOT NULL,
ADD COLUMN     "motherCountry" VARCHAR(255) NOT NULL,
ADD COLUMN     "motherCounty" VARCHAR(255) NOT NULL,
ADD COLUMN     "motherCountyOfOrigin" VARCHAR(255) NOT NULL,
ADD COLUMN     "motherDateOfNaturalization" TEXT NOT NULL,
ADD COLUMN     "motherName" VARCHAR(255) NOT NULL,
ADD COLUMN     "motherNationality" VARCHAR(255) NOT NULL,
ADD COLUMN     "motherOccupation" VARCHAR(255) NOT NULL,
ADD COLUMN     "motherPresentAddress" VARCHAR(255),
ADD COLUMN     "motherTelephoneNumber" VARCHAR(12),
ADD COLUMN     "motherTownOrCity" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "attestation" ALTER COLUMN "contactNumber" SET DATA TYPE VARCHAR(14);

-- DropTable
DROP TABLE "photo";
