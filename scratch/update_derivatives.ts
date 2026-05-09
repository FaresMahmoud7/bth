const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const connectToDatabase = require("../lib/db").default;
const Category = require("../models/Category").default;
const Product = require("../models/Product").default;

async function updateDesignAndPrintingDerivatives() {
    try {
        await connectToDatabase();
        
        const category = await Category.findOne({ 
            $or: [
                { nameEn: "Design & Printing" },
                { nameAr: "التصميم والطباعة" },
                { nameAr: "التصميم و الطباعة" }
            ]
        });
        
        if (!category) {
            console.log("Category 'Design & Printing' not found.");
            process.exit(1);
        }
        
        const newOptions = [
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
        
        const product = await Product.findOne({ category: category._id });
        if (product) {
            product.options = newOptions;
            await product.save();
            console.log("Updated existing product options.");
        } else {
            await Product.create({
                name: category.nameEn,
                descriptionEnglish: "Full-service graphic design and high-quality printing for all business needs.",
                descriptionArabic: "خدمة كاملة للتصميم الجرافيكي والطباعة عالية الجودة لجميع احتياجات عملك.",
                images: ["https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&w=800"],
                category: category._id,
                options: newOptions
            });
            console.log("Created new product with options.");
        }
        
        console.log("Derivatives updated successfully.");
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

updateDesignAndPrintingDerivatives();
