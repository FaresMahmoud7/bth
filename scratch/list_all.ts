import * as dotenv from "dotenv";
import * as path from "path";
import connectToDatabase from "../lib/db";
import Category from "../models/Category";
import Product from "../models/Product";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function listAll() {
    await connectToDatabase();
    const categories = await Category.find();
    console.log("Found Categories:", categories.length);
    
    for (const cat of categories) {
        const products = await Product.find({ category: cat._id });
        console.log(`\n--- Category: ${cat.nameAr} / ${cat.nameEn} ---`);
        products.forEach((p: { name: string; options: string[] }) => {
            console.log(`  Product: ${p.name}`);
            console.log(`  Options: ${JSON.stringify(p.options)}`);
        });
    }
    process.exit(0);
}

listAll().catch(err => {
    console.error(err);
    process.exit(1);
});
