import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    throw new Error("ADMIN_PASSWORD is not set in environment variables");
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  await prisma.user.upsert({
    where: { email: "reena.choice@gmail.com" },
    update: {
      password: hashedPassword,
      role: Role.ADMIN,
    },
    create: {
      email: "reena.choice@gmail.com",
      name: "Admin",
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  console.log("Admin user seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


