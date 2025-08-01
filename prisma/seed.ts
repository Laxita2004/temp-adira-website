import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('reenaadiradharmnistha', 10);
    await prisma.admin.upsert({
    where: { email: 'reena.choice@gmail.com' },
    update: {},
    create: {
      email: 'reena.choice@gmail.com',
      name: 'Super Admin',
      password: hashedPassword,
    },
  });

  console.log('✅ Admin user seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());