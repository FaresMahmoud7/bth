import connectToDatabase from "../lib/db";
import Category from "../models/Category";
import Product from "../models/Product";
import mongoose from "mongoose";

async function fixDesignAndPrinting() {
    console.log("Connecting to DB...");
    await connectToDatabase();
    console.log("Connected.");
    
    // Find the category
    const category = await Category.findOne({ 
        $or: [
            { nameEn: "Design & Printing" },
            { nameAr: "التصميم و الطباعة" },
            { nameAr: "التصميم والطباعة" }
        ]
    });
    
    if (!category) {
        console.log("Category not found.");
        await mongoose.disconnect();
        process.exit(1);
    }
    
    console.log("Found Category:", category.nameAr, "ID:", category._id);
    
    // Find the product in this category
    const product = await Product.findOne({ category: category._id });
    
    if (product) {
        console.log("Updating product options for:", product.name);
        const options = ["البرشورات (Flyers)", "قوائم الطعام (Menu)", "الكتيبات (Booklets)", "البطاقات (Cards)", "المجلدات (Folders)"];
        await Product.findByIdAndUpdate(product._id, { options });
        console.log("Options updated successfully.");
    } else {
        console.log("No product found for this category to update.");
        console.log("Creating default product for this category...");
        await Product.create({
            name: category.nameEn,
            descriptionEnglish: "Design, printing, and implementation of all types of publications.",
            descriptionArabic: "تصميم و طباعه و تنفيذ جميع انواع المطبوعات",
            images: ["/images/التصميم و الطباعة.jpeg"],
            category: category._id,
            options: ["البرشورات (Flyers)", "قوائم الطعام (Menu)", "الكتيبات (Booklets)", "البطاقات (Cards)", "المجلدات (Folders)"]
        });
        console.log("Default product created.");
    }
    
    await mongoose.disconnect();
    console.log("Disconnected.");
    process.exit(0);
}

fixDesignAndPrinting().catch(err => {
    console.error(err);
    process.exit(1);
});
