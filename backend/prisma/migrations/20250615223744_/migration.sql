-- CreateTable
CREATE TABLE "applicant" (
    "id" VARCHAR(22) NOT NULL DEFAULT nanoid(),
    "firstName" VARCHAR(255) NOT NULL,
    "middleName" VARCHAR(255),
    "lastName" VARCHAR(255) NOT NULL,
    "sex" TEXT NOT NULL,
    "facility" VARCHAR(255) NOT NULL,
    "townOrCity" VARCHAR(255) NOT NULL,
    "county" VARCHAR(255) NOT NULL,
    "country" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "contactNumber" VARCHAR(12) NOT NULL,
    "applicantPhoto" TEXT DEFAULT '',
    "dateOfApplication" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "applicant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applicantFather" (
    "id" VARCHAR(22) NOT NULL DEFAULT nanoid(),
    "fullName" VARCHAR(255) NOT NULL,
    "nationality" VARCHAR(255) NOT NULL,
    "age" INTEGER NOT NULL,
    "townOrCity" VARCHAR(255) NOT NULL,
    "county" VARCHAR(255) NOT NULL,
    "country" TEXT NOT NULL,
    "countyOfOrigin" VARCHAR(255) NOT NULL,
    "occupation" VARCHAR(255) NOT NULL,
    "dateOfNaturalization" TEXT NOT NULL,
    "fatherLiving" TEXT NOT NULL,
    "presentAddress" VARCHAR(255),
    "telephoneNumber" VARCHAR(12),
    "photo" TEXT DEFAULT '',
    "applicantId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "applicantFather_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applicantMother" (
    "id" VARCHAR(22) NOT NULL DEFAULT nanoid(),
    "fullName" VARCHAR(255) NOT NULL,
    "nationality" VARCHAR(255) NOT NULL,
    "age" INTEGER NOT NULL,
    "townOrCity" VARCHAR(255) NOT NULL,
    "county" VARCHAR(255) NOT NULL,
    "country" TEXT NOT NULL,
    "countyOfOrigin" VARCHAR(255) NOT NULL,
    "occupation" VARCHAR(255) NOT NULL,
    "dateOfNaturalization" TEXT NOT NULL,
    "fatherLiving" TEXT NOT NULL,
    "presentAddress" VARCHAR(255),
    "telephoneNumber" VARCHAR(12),
    "photo" TEXT DEFAULT '',
    "applicantId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "applicantMother_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attestation" (
    "id" VARCHAR(22) NOT NULL DEFAULT nanoid(),
    "fullName" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "county" VARCHAR(255) NOT NULL,
    "motherFullName" VARCHAR(255) NOT NULL,
    "fatherFullName" VARCHAR(255) NOT NULL,
    "date" TEXT NOT NULL,
    "cityOrTown" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "relationship" VARCHAR(255) NOT NULL,
    "contactNumber" VARCHAR(12),
    "applicantId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "attestation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photo" (
    "id" VARCHAR(22) NOT NULL DEFAULT nanoid(),
    "parentOrGuardianPhoto" TEXT NOT NULL,
    "applicantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "photo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "applicantFather_applicantId_key" ON "applicantFather"("applicantId");

-- CreateIndex
CREATE INDEX "applicantFather_applicantId_idx" ON "applicantFather"("applicantId");

-- CreateIndex
CREATE UNIQUE INDEX "applicantMother_applicantId_key" ON "applicantMother"("applicantId");

-- CreateIndex
CREATE INDEX "applicantMother_applicantId_idx" ON "applicantMother"("applicantId");

-- CreateIndex
CREATE UNIQUE INDEX "attestation_applicantId_key" ON "attestation"("applicantId");

-- CreateIndex
CREATE INDEX "attestation_applicantId_idx" ON "attestation"("applicantId");

-- CreateIndex
CREATE INDEX "photo_applicantId_idx" ON "photo"("applicantId");
