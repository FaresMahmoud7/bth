import connectToDatabase from "../lib/db";
import Product from "../models/Product";
import "../models/Category";

async function checkOrphanedProducts() {
    await connectToDatabase();
    
    const products = await Product.find({ category: { $exists: false } });
    console.log("Products with no category:", products.length);
    products.forEach(p => console.log(`- ${p.name}`));
    
    const allProducts = await Product.find().populate('category');
    const orphaned = allProducts.filter(p => p.category === null || p.category === undefined);
    console.log("Products with non-existent category ref:", orphaned.length);
    orphaned.forEach(p => console.log(`- ${p.name}`));

    process.exit(0);
}

checkOrphanedProducts().catch(err => {
    console.error(err);
    process.exit(1);
});
