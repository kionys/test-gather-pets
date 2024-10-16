import { PrismaClient } from "@prisma/client";

// https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding#how-to-seed-your-database-in-prisma
const prisma = new PrismaClient();

const seedData = async () => {
  const newUser = await prisma.user.create({
    data: {
      name: "김기원",
      authType: "self",
      email: "test@test.com",
      password: "rlarldnjs!12",
    },
  });
  console.log(newUser);
};

const main = async () => await seedData();

main()
  .catch(e => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
