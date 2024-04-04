
import { prisma } from "../src/lib/prisma"

async function seed() {
 await prisma.event.create({
   data: {
     id: "fac18671-cf20-4f37-809c-14961dcd70f8",
     title: "Conferência de Tecnologia",
     details: "Uma conferência sobre as últimas tendências em tecnologia.",
     maximumAttendees: 200,
     slug: "conferencia-tecnologia",
   },
 });

}

seed().then(() => {
 console.log("Database ssedrs")
 prisma.$disconnect()
})