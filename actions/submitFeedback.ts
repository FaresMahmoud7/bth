"use server";

import nodemailer from "nodemailer";

export async function submitFeedback(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const type = formData.get("type") as string; // 'complaint' or 'suggestion'
    const message = formData.get("message") as string;

    if (!name || !phone || !type || !message) {
      return { success: false, error: "All fields are required." };
    }

    if (type !== "complaint" && type !== "suggestion") {
      return { success: false, error: "Invalid feedback type." };
    }

    // Send Email using Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.example.com",
      port: Number(process.env.EMAIL_PORT) || 587,
      auth: {
        user: process.env.EMAIL_USER || "test@example.com",
        pass: process.env.EMAIL_PASS || "password",
      },
    });

    const typeCapitalized = type.charAt(0).toUpperCase() + type.slice(1);

    const mailOptions = {
      from: process.env.EMAIL_USER || "noreply@bth.com",
      to: process.env.EMAIL_USER || "admin@bth.com", 
      subject: `New ${typeCapitalized} Received`,
      text: `You have received a new ${type}.\n\nName: ${name}\nPhone: ${phone}\nType: ${typeCapitalized}\n\nMessage:\n${message}`,
    };

    // We use try-catch so that if SMTP isn't fully configured, the redirect still works
    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.warn("Email send failed (SMTP likely not configured):", emailError);
    }

    // Generate WhatsApp Link
    // Dedicated complaints/suggestions number: 0548466466 → Saudi format 966548466466
    const rawNumber = "0548466466";
    const whatsappNumber = "966" + rawNumber.replace(/^0/, "");
    const typeLabel = type === "complaint" ? ("شكوى / Complaint") : ("مقترح / Suggestion");
    const waText = `مرحباً BTH، لديّ ${typeLabel}.\n\nالاسم / Name: ${name}\nالجوال / Phone: ${phone}\n\nالرسالة / Message:\n${message}`;
    const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waText)}`;

    return { success: true, waLink };
  } catch (error) {
    console.error("Submit Feedback Error:", error);
    return { success: false, error: "An unexpected error occurred while submitting." };
  }
}
