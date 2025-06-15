-- CreateTable
CREATE TABLE "user" (
    "id" VARCHAR(22) NOT NULL DEFAULT nanoid(),
    "lastName" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "middleName" VARCHAR(255),
    "displayName" VARCHAR(255) NOT NULL,
    "primaryPhoneNumber" VARCHAR(225) NOT NULL,
    "secondaryPhoneNumber" VARCHAR(225),
    "email" VARCHAR(225) NOT NULL,
    "userName" VARCHAR(255) NOT NULL,
    "role" TEXT NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "confirmPassword" VARCHAR(255) NOT NULL,
    "photo" TEXT DEFAULT '',
    "userRoleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userRole" (
    "id" VARCHAR(22) NOT NULL DEFAULT nanoid(),
    "roleName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "passwordResetToken" (
    "id" VARCHAR(22) NOT NULL DEFAULT nanoid(),
    "token" TEXT NOT NULL,
    "expiresAt" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "passwordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rememberToken" (
    "id" VARCHAR(22) NOT NULL DEFAULT nanoid(),
    "token" TEXT NOT NULL,
    "expiresAt" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rememberToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_userName_key" ON "user"("userName");

-- CreateIndex
CREATE INDEX "user_userRoleId_idx" ON "user"("userRoleId");

-- CreateIndex
CREATE UNIQUE INDEX "passwordResetToken_userId_key" ON "passwordResetToken"("userId");

-- CreateIndex
CREATE INDEX "passwordResetToken_userId_idx" ON "passwordResetToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "rememberToken_userId_key" ON "rememberToken"("userId");

-- CreateIndex
CREATE INDEX "rememberToken_userId_idx" ON "rememberToken"("userId");
