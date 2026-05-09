import { config } from "dotenv";
config({ path: "../.env.local" });

import connectToDatabase from "../lib/db";
import Category from "../models/Category";
import Product from "../models/Product";
import Project from "../models/Project";

async function cleanDB() {
  await connectToDatabase();
  
  // 1. Deduplicate Categories
  const cats = await Category.find();
  const seenCats = new Set();
  const catMapping: Record<string, string> = {}; // map duplicate id to original id

  for (const cat of cats) {
    if (seenCats.has(cat.nameEn)) {
      console.log("Deleting duplicate category:", cat.nameEn);
      // Find the original cat id to remap products/projects
      const originalCat = await Category.findOne({ nameEn: cat.nameEn });
      if (originalCat && originalCat._id.toString() !== cat._id.toString()) {
         catMapping[cat._id.toString()] = originalCat._id.toString();
      }
      await Category.findByIdAndDelete(cat._id);
    } else {
      seenCats.add(cat.nameEn);
    }
  }

  // Remap Products and Projects to original category
  if (Object.keys(catMapping).length > 0) {
     for (const [dupId, origId] of Object.entries(catMapping)) {
        await Product.updateMany({ category: dupId }, { category: origId });
        await Project.updateMany({ category: dupId }, { category: origId });
     }
  }

  // 2. Deduplicate Products
  const prods = await Product.find();
  const seenProds = new Set();
  for (const p of prods) {
    const key = p.name + "-" + p.category;
    if (seenProds.has(key)) {
      console.log("Deleting duplicate product:", p.name);
      await Product.findByIdAndDelete(p._id);
    } else {
      seenProds.add(key);
    }
  }

  // 3. Deduplicate Projects
  const projs = await Project.find();
  const seenProjs = new Set();
  for (const p of projs) {
    const key = p.name + "-" + p.category;
    if (seenProjs.has(key)) {
      console.log("Deleting duplicate project:", p.name);
      await Project.findByIdAndDelete(p._id);
    } else {
      seenProjs.add(key);
    }
  }

  console.log("DB Cleaned successfully!");
  process.exit(0);
}

cleanDB().catch(console.error);
