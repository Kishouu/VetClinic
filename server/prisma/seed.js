const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Hash passwords
  const hashedDoctorPassword = await bcrypt.hash('doctor_pass_123', 10);
  const hashedUserPassword = await bcrypt.hash('user_pass_123', 10);
  const hashedAdminPassword = await bcrypt.hash('admin_pass_123', 10);

await prisma.receipt.deleteMany();
await prisma.appointment.deleteMany();
await prisma.service.deleteMany();    
await prisma.pet.deleteMany();
await prisma.user.deleteMany();
await prisma.doctor.deleteMany();      
await prisma.admin.deleteMany();


  // Create a doctor
  const doctor = await prisma.doctor.create({
    data: {
      login: 'drsmith',
      password: hashedDoctorPassword,
      services: {
        create: [
          { name: 'General Consultation', price: 50 },
          { name: 'Vaccination', price: 30 },
        ],
      },
    },
  });

  // Create a user with pets
  const user = await prisma.user.create({
    data: {
      login: 'johndoe',
      password: hashedUserPassword,
      pets: {
        create: [
          { name: 'Fluffy', species: 'Cat' },
          { name: 'Buddy', species: 'Dog' },
        ],
      },
    },
    include: { pets: true },
  });

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
  });

  // Create a receipt
  await prisma.receipt.create({
    data: {
      userId: user.id,
      doctorId: doctor.id,
      amount: 80,
      date: new Date(),
    },
  });

  // Create an admin user
  await prisma.admin.create({
    data: {
      login: 'adminuser',
      password: hashedAdminPassword,
    },
  });

  console.log('Seed data created successfully.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
