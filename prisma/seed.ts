import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail) {
    throw new Error("ADMIN_EMAIL is not set in environment variables");
  }

  if (!adminPassword) {
    throw new Error("ADMIN_PASSWORD is not set in environment variables");
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: {
      email: adminEmail,
    },

    update: {
      password: hashedPassword,
      role: Role.ADMIN,

      isEmailVerified: true,
      emailVerifyToken: null,
      emailVerifyExpiry: null,
    },

    create: {
      email: adminEmail,
      name: "Admin",
      password: hashedPassword,
      role: Role.ADMIN,

      isEmailVerified: true,
      emailVerifyToken: null,
      emailVerifyExpiry: null,
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