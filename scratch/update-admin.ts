import { config } from "dotenv";
config({ path: "../.env.local" });

import connectToDatabase from "../lib/db";
import AdminUser from "../models/AdminUser";
import bcrypt from "bcryptjs";

async function updateAdmin() {
  await connectToDatabase();
  
  await AdminUser.deleteMany({});
  
  const hashedPassword = await bcrypt.hash("BthAdmain2026@", 12);
  
  await AdminUser.create({
    username: "BTHadmin2026",
    password: hashedPassword,
    role: "admin"
  });
  
  console.log("Admin updated successfully!");
}

updateAdmin().catch(console.error);
