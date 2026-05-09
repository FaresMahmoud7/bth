"use server";

import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import { revalidatePath } from "next/cache";

export async function getProducts() {
  await connectToDatabase();
  const products = await Product.find().sort({ createdAt: -1 }).lean();

  const uniqueProducts = [];
  const seen = new Set();
  for (const prod of products) {
    const key = prod.name + "-" + prod.category;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueProducts.push(prod);
    }
  }

  return JSON.parse(JSON.stringify(uniqueProducts));
}

export async function createProduct(formData: FormData) {
  try {
    await connectToDatabase();
    
    const name = formData.get("name") as string;
    const descriptionEnglish = formData.get("descriptionEnglish") as string;
    const descriptionArabic = formData.get("descriptionArabic") as string;
    const imagesString = formData.get("images") as string;
    const category = formData.get("category") as string;
    const optionsString = formData.get("options") as string;
    
    const images = imagesString ? imagesString.split("|||").map(i => i.trim()).filter(i => i) : [];
    const options = optionsString ? optionsString.split(",").map(o => o.trim()).filter(o => o) : [];

    const product = new Product({
      name,
      descriptionEnglish,
      descriptionArabic,
      images,
      category: category || undefined,
      options
    });

    await product.save();
    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, error: "Failed to create product" };
  }
}

export async function deleteProduct(id: string) {
  try {
    await connectToDatabase();
    await Product.findByIdAndDelete(id);
    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: "Failed to delete product" };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  try {
    await connectToDatabase();
    
    const name = formData.get("name") as string;
    const descriptionEnglish = formData.get("descriptionEnglish") as string;
    const descriptionArabic = formData.get("descriptionArabic") as string;
    const imagesString = formData.get("images") as string;
    const category = formData.get("category") as string;
    const optionsString = formData.get("options") as string;
    
    const images = imagesString ? imagesString.split("|||").map(i => i.trim()).filter(i => i) : [];
    const options = optionsString ? optionsString.split(",").map(o => o.trim()).filter(o => o) : [];

    await Product.findByIdAndUpdate(id, {
      name,
      descriptionEnglish,
      descriptionArabic,
      images,
      category: category || undefined,
      options
    });

    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error: "Failed to update product" };
  }
}
