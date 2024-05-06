import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

// async function main() {
//     try {
//         // Delete all entries for each model

//         await prisma.prescription.deleteMany();
//         await prisma.review.deleteMany();
//         await prisma.payment.deleteMany();
//         await prisma.appointment.deleteMany();
//         await prisma.doctorSchedule.deleteMany();
//         await prisma.schedule.deleteMany();
//         console.log('All data deleted successfully.');
//     } catch (error) {
//         console.error('Error deleting data:', error);
//     } finally {
//         await prisma.$disconnect();
//     }
// }

// main().catch(error => {
//     console.error('Error in main:', error);
//     process.exit(1);
// });

const seedSuperAdmin = async () => {
  try {
    const isExistSuperAdmin = await prisma.user.findFirst({
      where: {
        role: UserRole.SUPER_ADMIN,
      },
    });

    console.log(isExistSuperAdmin)

    if (isExistSuperAdmin) {
      console.log('super admin already exist');
      return;
    }

    const superAdminData = await prisma.user.create({
      data: {
        email: 'sobujapm87@gmail.com',
        password: '111111',
        role: UserRole.SUPER_ADMIN,
        admin: {
          create: {
            name: 'Md.Anisur Rahaman',
            contactNumber: '01874767969',
            address:"Birampur bus stand,Birampur,Dinajpur"
          },
        },
      },
    });
    console.log('super admin created successfully', superAdminData);
  } catch (err: any) {
    console.log(err);
  }
  finally{
    await prisma.$disconnect()
  }
};

seedSuperAdmin()
