import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const ProductSchema = new mongoose.Schema({ name: String, category: mongoose.Schema.Types.ObjectId, options: [String] });
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const CategorySchema = new mongoose.Schema({ nameAr: String, nameEn: String });
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

async function fixOptions() {
  await mongoose.connect(process.env.MONGODB_URI);
  const cat = await Category.findOne({ nameAr: 'التصميم و الطباعة' });
  if (cat) {
    const options = [
      "البرشورات والفلاير (Brochures & Flyers)",
      "قوائم الطعام (Menu)",
      "الكتيبات والمجلات (Booklets & Magazines)",
      "البطاقات الشخصية (Business Cards)",
      "المجلدات والملفات (Folders & Files)",
      "الأظرف والقرطاسية (Envelopes & Stationery)",
      "الفواتير والسندات (Invoices & Vouchers)",
      "الملصقات والبوسترات (Posters & Stickers)",
      "الكتب والتقارير (Books & Reports)",
      "المفكرات والنوتبوك (Notebooks & Planners)",
      "كروت المناسبات (Event Cards)"
    ];
    const res = await Product.updateOne(
      { category: cat._id },
      { $set: { options: options } }
    );
    console.log('Update result:', res);
  } else {
    console.log('Category not found');
  }
  process.exit();
}

fixOptions();
