-- CreateTable
CREATE TABLE "payment" (
    "id" VARCHAR(22) NOT NULL DEFAULT nanoid(),
    "paymentType" VARCHAR(255) NOT NULL,
    "currency" VARCHAR(255) NOT NULL,
    "amountPay" INTEGER NOT NULL,
    "paymentDate" TEXT NOT NULL,
    "applicantId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointment" (
    "id" VARCHAR(22) NOT NULL DEFAULT nanoid(),
    "appointmentDate" TEXT NOT NULL,
    "appointmentTime" TEXT NOT NULL,
    "reasonForAppointment" TEXT NOT NULL,
    "applicantId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "payment_applicantId_idx" ON "payment"("applicantId");

-- CreateIndex
CREATE INDEX "appointment_applicantId_idx" ON "appointment"("applicantId");
