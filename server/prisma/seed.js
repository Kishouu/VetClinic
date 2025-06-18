const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Create a doctor
  const doctor = await prisma.doctor.create({
    data: {
      login: 'drsmith',
      password: 'hashed_password_123',
      services: {
        create: [
          { name: 'General Consultation', price: 50 },
          { name: 'Vaccination', price: 30 }
        ],
      },
    },
  })

  // Create a user with pets
  const user = await prisma.user.create({
    data: {
      login: 'johndoe',
      password: 'user_password_123',
      pets: {
        create: [
          { name: 'Fluffy', species: 'Cat' },
          { name: 'Buddy', species: 'Dog' },
        ],
      },
    },
    include: {
      pets: true,
    },
  })

  // Create appointments for user's pets with the doctor
  await prisma.appointment.createMany({
    data: [
      {
        date: new Date(),
        notes: 'General checkup for Fluffy',
        userId: user.id,
        petId: user.pets[0].id,
        doctorId: doctor.id,
      },
      {
        date: new Date(),
        notes: 'Vaccination for Buddy',
        userId: user.id,
        petId: user.pets[1].id,
        doctorId: doctor.id,
      },
    ],
  })

  // Create receipts
  await prisma.receipt.create({
    data: {
      userId: user.id,
      doctorId: doctor.id,
      amount: 80,
      date: new Date(),
    },
  })

  // Create an admin user
  await prisma.admin.create({
    data: {
      login: 'adminuser',
      password: 'admin_password_123',
    },
  })
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })
