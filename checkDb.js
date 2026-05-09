const mongoose = require('mongoose');

async function checkDb() {
  await mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection.db;
  
  const categories = await db.collection('categories').find({}).toArray();
  const products = await db.collection('products').find({}).toArray();
  
  console.log("--- Categories ---");
  categories.forEach(c => console.log(`ID: ${c._id}, NameAr: ${c.nameAr}, NameEn: ${c.nameEn}`));
  
  console.log("--- Products ---");
  products.forEach(p => console.log(`ID: ${p._id}, Name: ${p.name}, CatID: ${p.category}`));
  
  process.exit(0);
}

checkDb();
