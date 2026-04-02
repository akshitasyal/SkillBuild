import { PrismaClient } from "@prisma/client";
import { genSalt, hash } from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

const generatePassword = async (password) => {
  const salt = await genSalt();
  return await hash(password, salt);
};

async function main() {
  console.log("\n🔍 Checking existing users...\n");

  const users = await prisma.user.findMany({
    select: { id: true, email: true, username: true, role: true, status: true },
  });

  if (users.length === 0) {
    console.log("No users found in database.");
  } else {
    console.log("Existing users:");
    users.forEach((u) => {
      console.log(`  ID: ${u.id} | Email: ${u.email} | Username: ${u.username || "N/A"} | Role: ${u.role} | Status: ${u.status}`);
    });
  }

  // --- Upsert Admin User ---
  const adminEmail = "admin@fiverr.com";
  const adminPassword = "Admin@123";
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (!existingAdmin) {
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        password: await generatePassword(adminPassword),
        username: "admin",
        fullName: "Admin User",
        description: "Platform Administrator",
        isProfileInfoSet: true,
        role: "admin",
        status: "active",
      },
    });
    console.log(`\n✅ Admin user CREATED → ID: ${admin.id}`);
  } else {
    // Ensure the role is admin
    await prisma.user.update({
      where: { email: adminEmail },
      data: { role: "admin" },
    });
    console.log(`\n✅ Admin user EXISTS (ID: ${existingAdmin.id}) — role set to 'admin'`);
  }

  // --- Upsert Normal User ---
  const userEmail = "user@fiverr.com";
  const userPassword = "User@123";
  const existingUser = await prisma.user.findUnique({ where: { email: userEmail } });

  if (!existingUser) {
    const normalUser = await prisma.user.create({
      data: {
        email: userEmail,
        password: await generatePassword(userPassword),
        username: "testuser",
        fullName: "Test User",
        description: "A regular buyer/seller",
        isProfileInfoSet: true,
        role: "user",
        status: "active",
      },
    });
    console.log(`✅ Normal user CREATED → ID: ${normalUser.id}`);
  } else {
    console.log(`✅ Normal user EXISTS (ID: ${existingUser.id})`);
  }

  console.log("\n🎉 Done! Use these credentials to login:\n");
  console.log("  👑 ADMIN LOGIN:");
  console.log(`     Email:    ${adminEmail}`);
  console.log(`     Password: ${adminPassword}`);
  console.log(`     URL:      http://localhost:3000/login\n`);
  console.log("  👤 NORMAL USER LOGIN:");
  console.log(`     Email:    ${userEmail}`);
  console.log(`     Password: ${userPassword}`);
  console.log(`     URL:      http://localhost:3000/login\n`);
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
