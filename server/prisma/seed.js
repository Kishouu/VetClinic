const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Hash passwords
  const hashedDoctorPassword = await bcrypt.hash('doctor_pass_123', 10);
  const hashedUserPassword = await bcrypt.hash('user_pass_123', 10);
  const hashedAdminPassword = await bcrypt.hash('admin_pass_123', 10);

  // Clear all tables
  await prisma.receipt.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.service.deleteMany();
  await prisma.pet.deleteMany();
  await prisma.user.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.admin.deleteMany();

  // Create a doctor and services
  const doctor = await prisma.doctor.create({
    data: {
      login: 'drsmith',
      password: hashedDoctorPassword,
    },
  });

  const [service1, service2] = await Promise.all([
    prisma.service.create({
      data: { name: 'General Consultation', price: 50, doctorId: doctor.id },
    }),
    prisma.service.create({
      data: { name: 'Vaccination', price: 30, doctorId: doctor.id },
    }),
  ]);

  // Create user and pets
  const user = await prisma.user.create({
    data: {
      login: 'johndoe',
      password: hashedUserPassword,
    },
  });

  const [fluffy, buddy] = await Promise.all([
    prisma.pet.create({
      data: { name: 'Fluffy', species: 'Cat', breed: 'Persian', userId: user.id },
    }),
    prisma.pet.create({
      data: { name: 'Buddy', species: 'Dog', breed: 'Labrador', userId: user.id },
    }),
  ]);

  // Create appointments (each with a serviceId)
  await prisma.appointment.create({
    data: {
      date: new Date(),
      notes: 'General checkup for Fluffy',
      userId: user.id,
      petId: fluffy.id,
      doctorId: doctor.id,
      serviceId: service1.id,
    },
  });

  await prisma.appointment.create({
    data: {
      date: new Date(),
      notes: 'Vaccination for Buddy',
      userId: user.id,
      petId: buddy.id,
      doctorId: doctor.id,
      serviceId: service2.id,
    },
  });

  // Create receipt
  await prisma.receipt.create({
    data: {
      userId: user.id,
      doctorId: doctor.id,
      amount: 80,
      date: new Date(),
    },
  });

  // Create admin
  await prisma.admin.create({
    data: {
      login: 'adminuser',
      password: hashedAdminPassword,
    },
  });

  console.log('✅ Seed data created successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
