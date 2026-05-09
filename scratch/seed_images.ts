import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import fs from "fs";
import path from "path";

async function seed() {
  const { default: connectToDatabase } = await import("../lib/db");
  const { default: Category } = await import("../models/Category");
  const { default: Product } = await import("../models/Product");

  try {
    await connectToDatabase();

    const imagesDir = path.join(process.cwd(), "public/images");
    const files = fs.readdirSync(imagesDir);

    const mapping = {
      "التقاويم واليوميات": "التقاويم و اليوميات",
      "ملصقات السيارات": "ملصقات السيارات",
      "ملصقات الزجاج والحائط": "ملصقات الزجاج و الحائط",
      "مواد إعلانية وتسويقية": "مواد اعلانيه و تسويقيه",
      "العلامات التجارية والهوية": "العلامات التجاريه و الهويه",
      "اللافتات": "اللافتات",
      "لوحات الأسماء": "لوحات الاسماء",
      "أعمال الأكريليك": "اعمال الاكريليك",
      "الدروع والجوائز": "الجوائز",
      "شهادات": "الشهادات",
      "الهدايا الدعائية": "الهدايا الترويجية",
      "مواد السلامة واللوحات الإرشادية": "لوحات و مواد السلامه",
      "التصميم و الطباعة": "التصميم و الطباعة"
    };

    for (const [dbName, fileName] of Object.entries(mapping)) {
      const category = await Category.findOne({ nameAr: dbName });
      if (category) {
        // Find all images for this category
        const catImages = files
          .filter(f => f.startsWith(fileName) && f.endsWith(".jpeg"))
          .map(f => `/images/${f}`);

        const mainImage = catImages.find(img => img === `/images/${fileName}.jpeg`) || catImages[0];

        await Category.findByIdAndUpdate(category._id, { image: mainImage });
        
        // Update products in this category
        await Product.updateMany({ category: category._id }, { images: catImages });
        
        console.log(`Updated category "${dbName}" with ${catImages.length} images.`);
      } else {
        console.log(`Category "${dbName}" not found in database.`);
      }
    }

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();
