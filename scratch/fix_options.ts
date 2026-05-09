import connectToDatabase from "../lib/db";
import Category from "../models/Category";
import Product from "../models/Product";

async function fixDesignAndPrinting() {
    await connectToDatabase();
    
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
        return;
    }
    
    console.log("Found Category:", category.nameAr);
    
    // Find the product in this category
    const product = await Product.findOne({ category: category._id });
    
    if (product) {
        console.log("Updating product options for:", product.name);
        const options = ["البرشورات (Flyers)", "قوائم الطعام (Menu)", "الكتيبات (Booklets)", "البطاقات (Cards)", "المجلدات (Folders)"];
        await Product.findByIdAndUpdate(product._id, { options });
        console.log("Options updated successfully.");
    } else {
        console.log("No product found for this category to update.");
    }
    
    process.exit(0);
}

fixDesignAndPrinting().catch(console.error);
