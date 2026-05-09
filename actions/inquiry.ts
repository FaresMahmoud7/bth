"use server";

import connectToDatabase from "@/lib/db";
import ProductRequest from "@/models/ProductRequest";
import { revalidatePath } from "next/cache";

export async function saveInquiry(data: {
  name: string;
  phone: string;
  email?: string;
  productName: string;
}) {
  try {
    await connectToDatabase();
    
    const newInquiry = new ProductRequest({
      name: data.name,
      phone: data.phone,
      email: data.email,
      productName: data.productName,
      message: `Inquiry about price for: ${data.productName}`, // Default message
    });

    await newInquiry.save();
    revalidatePath("/admin/requests");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to save inquiry:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}
