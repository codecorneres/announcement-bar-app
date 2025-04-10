-- CreateTable
CREATE TABLE "AnnoucementBarSettings" (
    "id" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "settings" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnnoucementBarSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AnnoucementBarSettings_shop_key" ON "AnnoucementBarSettings"("shop");
