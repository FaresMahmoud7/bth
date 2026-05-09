"use server";

import connectToDatabase from "@/lib/db";
import ProductRequest from "@/models/ProductRequest";
import nodemailer from "nodemailer";

export async function submitProductRequest(formData: FormData) {
  try {
    await connectToDatabase();

    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;
    const productName = formData.get("productName") as string;

    if (!name || !phone || !message || !productName) {
      return { success: false, error: "All fields are required." };
    }

    // 1. Save to DB
    const request = new ProductRequest({ name, phone, message, productName });
    await request.save();

    // 2. Send Email using Nodemailer
    // Provide fallback defaults for local dev testing
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.example.com",
      port: Number(process.env.EMAIL_PORT) || 587,
      auth: {
        user: process.env.EMAIL_USER || "test@example.com",
        pass: process.env.EMAIL_PASS || "password",
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || "noreply@bth.com",
      to: process.env.EMAIL_USER || "admin@bth.com", 
      subject: `New Product Request: ${productName}`,
      text: `You have a new product request.\n\nName: ${name}\nPhone: ${phone}\nProduct: ${productName}\n\nMessage:\n${message}`,
    };

    // We use a try-catch for the email so that if SMTP isn't fully configured, the DB save and redirect still work
    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.warn("Email send failed (SMTP likely not configured):", emailError);
    }

    // 3. Generate WhatsApp Link
    // In production, this phone number should be your actual business number.
    const companyPhone = "1234567890"; 
    const waText = `Hello BTH team, I'm interested in the "${productName}" service.\n\nMy name is ${name}.\nMessage: ${message}`;
    const waLink = `https://wa.me/${companyPhone}?text=${encodeURIComponent(waText)}`;

    return { success: true, waLink };
  } catch (error) {
    console.error("Submit Product Request Error:", error);
    return { success: false, error: "An unexpected error occurred while submitting." };
  }
}
