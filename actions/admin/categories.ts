"use server";

import connectToDatabase from "@/lib/db";
import Category from "@/models/Category";
import { revalidatePath } from "next/cache";
import Product from "@/models/Product";
import Project from "@/models/Project";

export async function getCategories(type?: 'product' | 'project') {
  try {
    await connectToDatabase();
    const query = type ? { type } : {};
    // Fetch all categories and return them directly
    const categories = await Category.find(query).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function createCategory(formData: FormData) {
  try {
    await connectToDatabase();
    const nameAr = formData.get("nameAr") as string;
    const nameEn = formData.get("nameEn") as string;
    const type = formData.get("type") as 'product' | 'project';
    const categoryImage = formData.get("categoryImage") as string;
    
    const descriptionAr = formData.get("descriptionAr") as string;
    const descriptionEn = formData.get("descriptionEn") as string;
    const optionsString = formData.get("options") as string;
    const imagesString = formData.get("images") as string;
    
    const options = optionsString ? optionsString.split(",").map(o => o.trim()).filter(o => o) : [];
    const images = imagesString ? imagesString.split(",") : ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800"];

    if (!nameAr || !nameEn || !type) {
      return { error: "Name and type are required" };
    }

    // Check for existing category with same English name to avoid duplicates
    const existing = await Category.findOne({ nameEn });
    if (existing) {
      return { error: "A category with this name already exists." };
    }

    const category = await Category.create({ 
      nameAr, 
      nameEn, 
      type, 
      image: categoryImage 
    });
    
    // Create a default item (Service) for this category
    if (type === 'product') {
      await Product.create({
        name: nameEn,
        descriptionEnglish: descriptionEn || `High-quality ${nameEn} services.`,
        descriptionArabic: descriptionAr || `خدمات ${nameAr} عالية الجودة.`,
        images: images,
        category: category._id,
        options
      });
    }

    revalidatePath("/admin/categories");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error creating category:", error);
    return { error: "Failed to create category and service" };
  }
}

export async function updateCategory(id: string, formData: FormData) {
  try {
    await connectToDatabase();
    const nameAr = formData.get("nameAr") as string;
    const nameEn = formData.get("nameEn") as string;
    const type = formData.get("type") as 'product' | 'project';
    const image = formData.get("categoryImage") as string;

    const updated = await Category.findByIdAndUpdate(
      id,
      { nameAr, nameEn, type, image },
      { new: true }
    );

    if (!updated) return { error: "Category not found" };

    revalidatePath("/admin/categories");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating category:", error);
    return { error: "Failed to update category" };
  }
}

export async function deleteCategory(id: string) {
  try {
    await connectToDatabase();
    await Category.findByIdAndDelete(id);
    
    // Cascade delete associated items
    await Product.deleteMany({ category: id });
    await Project.deleteMany({ category: id });

    revalidatePath("/admin/categories");
    revalidatePath("/admin/products");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { error: "Failed to delete category" };
  }
}
