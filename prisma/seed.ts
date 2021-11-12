import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  await prisma.location.upsert({
    where: { name: "Victoria" },
    update: {},
    create: {
      name: "Victoria",
      entries: {
        create: [
          {
            type: "Seeds",
            amount: 10,
            numberOfDucks: 15,
          },
          {
            type: "Bread",
            amount: 12,
            numberOfDucks: 30,
          },
        ],
      },
    },
  })

  await prisma.location.upsert({
    where: { name: "Vancouver" },
    update: {},
    create: {
      name: "Vancouver",
      entries: {
        create: [
          {
            type: "Cornmeal",
            amount: 30,
            numberOfDucks: 20,
          },
          {
            type: "Feed",
            amount: 30,
            numberOfDucks: 50,
          },
        ],
      },
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
