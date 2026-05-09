"use server";

import connectToDatabase from "@/lib/db";
import Project from "@/models/Project";
import { revalidatePath } from "next/cache";

export async function getProjects() {
  await connectToDatabase();
  const projects = await Project.find().sort({ createdAt: -1 }).lean();
  
  const uniqueProjects = [];
  const seen = new Set();
  for (const proj of projects) {
    const key = proj.name + "-" + proj.category;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueProjects.push(proj);
    }
  }

  return JSON.parse(JSON.stringify(uniqueProjects));
}

export async function createProject(formData: FormData) {
  try {
    await connectToDatabase();
    
    const name = formData.get("name") as string;
    const descriptionEnglish = formData.get("descriptionEnglish") as string;
    const descriptionArabic = formData.get("descriptionArabic") as string;
    const imagesString = formData.get("images") as string;
    const category = formData.get("category") as string;
    const optionsString = formData.get("options") as string;
    
    const images = imagesString ? imagesString.split(",").map(i => i.trim()).filter(i => i) : [];
    const options = optionsString ? optionsString.split(",").map(o => o.trim()).filter(o => o) : [];

    const project = new Project({
      name,
      descriptionEnglish,
      descriptionArabic,
      images,
      category: category || undefined,
      options
    });

    await project.save();
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error) {
    console.error("Error creating project:", error);
    return { success: false, error: "Failed to create project" };
  }
}

export async function deleteProject(id: string) {
  try {
    await connectToDatabase();
    await Project.findByIdAndDelete(id);
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, error: "Failed to delete project" };
  }
}

export async function updateProject(id: string, formData: FormData) {
  try {
    await connectToDatabase();
    
    const name = formData.get("name") as string;
    const descriptionEnglish = formData.get("descriptionEnglish") as string;
    const descriptionArabic = formData.get("descriptionArabic") as string;
    const imagesString = formData.get("images") as string;
    const category = formData.get("category") as string;
    const optionsString = formData.get("options") as string;
    
    const images = imagesString ? imagesString.split(",").map(i => i.trim()).filter(i => i) : [];
    const options = optionsString ? optionsString.split(",").map(o => o.trim()).filter(o => o) : [];

    await Project.findByIdAndUpdate(id, {
      name,
      descriptionEnglish,
      descriptionArabic,
      images,
      category: category || undefined,
      options
    });

    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error) {
    console.error("Error updating project:", error);
    return { success: false, error: "Failed to update project" };
  }
}
