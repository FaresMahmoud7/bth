import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function check() {
  const { default: connectToDatabase } = await import("../lib/db");
  const { default: Category } = await import("../models/Category");
  const { default: Product } = await import("../models/Product");
  const { default: Project } = await import("../models/Project");
  try {
    await connectToDatabase();
    const categories = await Category.find();
    console.log("Categories found:", categories.length);
    categories.forEach(c => {
      console.log(`- ${c.nameAr} (${c.nameEn}) [${c.type}] ID: ${c._id}`);
    });

    const products = await Product.find();
    console.log("\nProducts found:", products.length);

    const projects = await Project.find();
    console.log("\nProjects found:", projects.length);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

check();
