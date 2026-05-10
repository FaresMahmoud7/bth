import * as dotenv from "dotenv";
import * as path from "path";
import connectToDatabase from "../lib/db";
import Product from "../models/Product";
import Category from "../models/Category";
import { Types } from "mongoose";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

interface ICategory {
    _id: Types.ObjectId;
    nameAr: string;
    nameEn: string;
}

interface IProduct {
    _id: Types.ObjectId;
    name: string;
    category: Types.ObjectId;
    options: string[];
}

async function checkGifts() {
    await connectToDatabase();
    const categories = await Category.find() as unknown as ICategory[];
    const products = await Product.find() as unknown as IProduct[];
    
    console.log("Categories found:", categories.length);
    console.log("Products found:", products.length);
    
    categories.forEach((cat) => {
        const catProducts = products.filter((p) => p.category && p.category.toString() === cat._id.toString());
        console.log(`\nCategory: ${cat.nameAr} / ${cat.nameEn} (ID: ${cat._id})`);
        console.log(`  Products count: ${catProducts.length}`);
        catProducts.forEach((p) => {
            console.log(`  - Product: ${p.name} | Options: ${p.options.length}`);
            if (p.options.length > 0) {
                console.log(`    Options: ${JSON.stringify(p.options)}`);
            }
        });
    });
    process.exit(0);
}

checkGifts();
