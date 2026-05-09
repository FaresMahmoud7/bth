"use server";

import connectToDatabase from "@/lib/db";
import ProductRequest from "@/models/ProductRequest";
import { revalidatePath } from "next/cache";

export async function getProductRequests() {
  await connectToDatabase();
  const requests = await ProductRequest.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(requests));
}

export async function deleteProductRequest(id: string) {
  try {
    await connectToDatabase();
    await ProductRequest.findByIdAndDelete(id);
    revalidatePath("/admin/requests");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete request" };
  }
}
