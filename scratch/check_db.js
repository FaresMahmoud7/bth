const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Define models briefly
const CategorySchema = new mongoose.Schema({ nameAr: String, nameEn: String });
const ProductSchema = new mongoose.Schema({ name: String, category: mongoose.Schema.Types.ObjectId });

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

async function checkDB() {
  await mongoose.connect(process.env.MONGODB_URI);
  const categories = await Category.find();
  console.log('Categories:', categories.map(c => ({ nameAr: c.nameAr, id: c._id })));
  
  const products = await Product.find();
  console.log('Products count:', products.length);
  
  process.exit();
}

checkDB();
