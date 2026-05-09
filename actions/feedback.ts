"use server";

import connectToDatabase from "@/lib/db";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

// Define a simple Feedback schema if it doesn't exist
const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ["complaint", "suggestion"], required: true },
  createdAt: { type: Date, default: Date.now },
});

const FeedbackModel = mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);

export async function submitFeedback(formData: { name: string; phone: string; message: string; type: string }) {
  try {
    await connectToDatabase();
    
    const feedback = new FeedbackModel(formData);
    await feedback.save();
    
    revalidatePath("/admin/feedback");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to submit feedback:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}
