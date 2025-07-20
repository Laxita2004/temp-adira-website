/*
  Warnings:

  - You are about to drop the `sale` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sale_product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "sale_product" DROP CONSTRAINT "sale_product_productId_fkey";

-- DropForeignKey
ALTER TABLE "sale_product" DROP CONSTRAINT "sale_product_saleId_fkey";

-- DropTable
DROP TABLE "sale";

-- DropTable
DROP TABLE "sale_product";

-- CreateTable
CREATE TABLE "offer" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bannerUrl" TEXT NOT NULL,
    "discountType" "DiscountType" NOT NULL,
    "discountValue" DECIMAL(65,30) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offer_product" (
    "id" SERIAL NOT NULL,
    "offerId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "offer_product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "offer_product_offerId_productId_key" ON "offer_product"("offerId", "productId");

-- AddForeignKey
ALTER TABLE "offer_product" ADD CONSTRAINT "offer_product_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "offer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offer_product" ADD CONSTRAINT "offer_product_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
