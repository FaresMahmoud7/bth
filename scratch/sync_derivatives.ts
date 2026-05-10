import * as dotenv from "dotenv";
import * as path from "path";
import connectToDatabase from "../lib/db";
import Category from "../models/Category";
import Product from "../models/Product";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const defaultData = [
    {
      nameAr: "التقاويم واليوميات", nameEn: "Calendars & Diaries", 
      options: ["التقاويم المطوية (TENT Calendar)", "التقويم الحلزوني (Spiral Calendar)", "التقويم الحائطي (Wall Calendar)", "دفاتر (Notebook)", "مذكرات (Diaries)"]
    },
    {
      nameAr: "ملصقات السيارات", nameEn: "Vehicle Stickers", 
      options: ["ملصقات السيارات(Car Stickers)", "ملصقات الحافلات والشاحنات(Bus&Truck Stickers)", "ملصقات مقصوصة حسب الطلب (Customized Cutting)", "ملصقات عاكسة (Reflective stickers)"]
    },
    {
      nameAr: "ملصقات الزجاج والحائط", nameEn: "Wall & Glass Stickers", 
      options: ["ملصقات الحائط (Wall Stickers)", "ملصقات مقصوصة للجدران (Cutting Stickers)", "ملصقات ثلجية (Sandblast)", "ملصقات الزجاج (See through for glass)"]
    },
    {
      nameAr: "مواد إعلانية وتسويقية", nameEn: "Promotional Items", 
      options: ["بوب اب (Pop Up)", "رول آب (Roll Up)", "لوحات تسويقية (Danglers)", "طاولات (Counters)"]
    },
    {
      nameAr: "العلامات التجارية والهوية", nameEn: "Branding & Identity", 
      options: ["تصميم الشعارات (Logo)", "الكروت الشخصية (Business Cards)", "الأوراق الرسمية والأختام (Letter Head & stamps)", "الكتيبات (Booklets)", "الفيديو (Videos)"]
    },
    {
      nameAr: "اللافتات", nameEn: "Signages", 
      options: ["يونيبول (Unipole)", "اللوحات واللافتات (Banners & Boards)", "لوحات الأحرف البارزة (3D Sign Boards)"]
    },
    {
      nameAr: "لوحات الأسماء", nameEn: "Name Plates", 
      options: ["معلقة على الحائط (Wall Mounted)", "بطاقات الأسم (Name Badges)", "علامة الجدول/المكتب (Table Sign)"]
    },
    {
      nameAr: "أعمال الأكريليك", nameEn: "Acrylic Works", 
      options: ["لوحات الشعار الجدارية (Acrylic Wall Logos)", "لوحات المهام والمتابعة (Planning & Task Boards)", "لوحات الرؤية والقيم (Vision & Values Boards)", "دروع تذكارية وتكريمية (Acrylic Awards & Trophies)", "مستلزمات الضيافة والتقديم (Hospitality Trays)", "منظمات أكريليك مقسمة (Dispensers & Acrylic Organizers)", "اكسسوارات زينه و مناسبات (Cake & Event Decor)"]
    },
    {
      nameAr: "الدروع والجوائز", nameEn: "Awards & Trophies", 
      options: ["دروع كريستال فاخرة (Crystal Premium)", "دروع خشبية كلاسيكية (Wooden Classic)", "كؤوس وجوائز مجسمة (Sculpted Trophies)"]
    },
    {
      nameAr: "شهادات", nameEn: "Certificates", 
      options: ["شهادات داخل براويز خشبية", "شهادات أكريليك فاخرة", "دروع الشهادات المعدنية"]
    },
    {
      nameAr: "الهدايا الدعائية", nameEn: "Promotional Gifts", 
      options: ["تيشرتات (T-shirts)", "أكواب (Mugs)", "أقلام (Pens)", "حقائب (Bags)"]
    },
    {
      nameAr: "مواد السلامة واللوحات الإرشادية", nameEn: "Safety Materials & Signs", 
      options: ["سترات السلامة (Safety Jackets)", "ملصقات الخوذات (Helmet stickers)", "لوحات السلامة (Safety Signs)", "الطباعة على ملابس العمل (Coverall printing)"]
    },
    {
      nameAr: "التصميم و الطباعة", nameEn: "Design & Printing", 
      options: [
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
      ]
    }
];

async function syncAllDerivatives() {
    await connectToDatabase();
    
    for (const item of defaultData) {
        const category = await Category.findOne({
            $or: [
                { nameEn: item.nameEn },
                { nameAr: item.nameAr }
            ]
        });
        
        if (category) {
            console.log(`Syncing ${category.nameEn}...`);
            const product = await Product.findOne({ category: category._id });
            if (product) {
                // Only update if current options are empty or user requested sync
                product.options = item.options;
                await product.save();
                console.log(`  Updated ${product.name}`);
            } else {
                await Product.create({
                    name: category.nameEn,
                    descriptionEnglish: `High-quality ${category.nameEn} services.`,
                    descriptionArabic: `خدمات ${category.nameAr} عالية الجودة.`,
                    images: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800"],
                    category: category._id,
                    options: item.options
                });
                console.log(`  Created new product for ${category.nameEn}`);
            }
        } else {
            console.log(`Category ${item.nameEn} not found in DB.`);
        }
    }
    
    process.exit(0);
}

syncAllDerivatives().catch(err => {
    console.error(err);
    process.exit(1);
});
