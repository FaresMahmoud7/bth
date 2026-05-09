"use server";

import { cookies } from "next/headers";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/db";
import AdminUser from "@/models/AdminUser";

const JWT_SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "default_secret_for_dev_only");

export async function loginAdmin(formData: FormData) {
  try {
    await connectToDatabase();

    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (!username || !password) {
      return { success: false, error: "Username and password are required." };
    }

    const admin = await AdminUser.findOne({ username });
    if (!admin) {
      return { success: false, error: "Invalid credentials." };
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return { success: false, error: "Invalid credentials." };
    }

    // Generate JWT token (expires in 1 day)
    const token = await new SignJWT({ id: admin._id, username: admin.username, role: admin.role })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1d")
      .sign(JWT_SECRET);

    // Set HttpOnly cookie
    (await cookies()).set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return { success: true };
  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}

export async function logoutAdmin() {
  (await cookies()).delete("admin_token");
  return { success: true };
}
export async function updateAdminName(id: string, newName: string) {
  try {
    await connectToDatabase();
    const admin = await AdminUser.findByIdAndUpdate(id, { displayName: newName }, { new: true });
    if (!admin) return { success: false, error: "Admin not found." };
    return { success: true, name: admin.displayName };
  } catch (error) {
    console.error("Update Name Error:", error);
    return { success: false, error: "Failed to update name." };
  }
}
