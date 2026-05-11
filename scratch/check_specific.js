import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const CategorySchema = new mongoose.Schema({ nameAr: String, nameEn: String });
const ProductSchema = new mongoose.Schema({ name: String, category: mongoose.Schema.Types.ObjectId, options: [String] });

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

async function checkSpecific() {
  await mongoose.connect(process.env.MONGODB_URI);
  const cat = await Category.findOne({ nameAr: 'التصميم و الطباعة' });
  if (!cat) {
    console.log('Category not found');
  } else {
    console.log('Category found:', cat.nameAr, cat._id);
    const products = await Product.find({ category: cat._id });
    console.log('Products for this category:', products.length);
    products.forEach(p => {
      console.log('Product:', p.name, 'Options count:', p.options.length);
      console.log('Options:', p.options);
    });
  }
  process.exit();
}

checkSpecific();
