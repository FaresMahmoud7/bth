import connectToDatabase from "./db";
import AdminUser from "../models/AdminUser";
import bcrypt from "bcryptjs";

export async function seedAdmin() {
  await connectToDatabase();

  const adminExists = await AdminUser.findOne({ role: 'admin' });

  if (!adminExists) {
    const hashedPassword = await bcrypt.hash("admin123", 12);
    await AdminUser.create({
      username: "admin",
      password: hashedPassword,
      role: "admin"
    });
    console.log("Initial admin user created: admin / admin123");
  } else {
    console.log("Admin user already exists.");
  }
}
