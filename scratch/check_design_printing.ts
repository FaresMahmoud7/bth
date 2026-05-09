import connectToDatabase from "../lib/db";
import Category from "../models/Category";
import Product from "../models/Product";

async function checkDesignAndPrinting() {
    await connectToDatabase();
    
    const category = await Category.findOne({ 
        $or: [
            { nameEn: "Design & Printing" },
            { nameAr: "التصميم والطباعة" }
        ]
    });
    
    if (!category) {
        console.log("Category 'Design & Printing' not found.");
        return;
    }
    
    console.log("Category Found:", JSON.stringify(category, null, 2));
    
    const products = await Product.find({ category: category._id });
    console.log("Products (Derivatives) Found:", JSON.stringify(products, null, 2));
    
    process.exit(0);
}

checkDesignAndPrinting().catch(err => {
    console.error(err);
    process.exit(1);
});
