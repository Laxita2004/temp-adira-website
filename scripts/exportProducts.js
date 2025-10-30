const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      category: true,
      price: true,
      tags: true,
      materialId: true,
      patternId: true,
      themeId: true,
      images: true,
    },
  });

  fs.writeFileSync('recommendation/products.json', JSON.stringify(products, null, 2));
  console.log('products.json updated with latest data!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
