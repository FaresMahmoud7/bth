import connectToDatabase from "@/lib/db";
import Category from "@/models/Category";
import Product, { IProduct } from "@/models/Product";
import Project, { IProject } from "@/models/Project";

interface FormattedItem {
  _id: string;
  name: string;
  descriptionArabic: string;
  descriptionEnglish: string;
  images: string[];
  options: string[];
  category?: string;
}

interface FormattedCategory {
  _id: string;
  nameAr: string;
  nameEn: string;
  type: 'product' | 'project';
  image?: string;
  items: FormattedItem[];
}

interface LeanCategory {
  _id: { toString(): string };
  nameAr: string;
  nameEn: string;
  type: 'product' | 'project';
  image?: string;
}

export async function getShowcaseData(): Promise<FormattedCategory[]> {
  await connectToDatabase();
  
  // Fetch all categories from DB without force-seeding (unless empty)
  let categories = await Category.find().sort({ createdAt: 1 }).lean() as unknown as LeanCategory[];
  
  // ONLY seed if absolutely EMPTY
  if (categories.length === 0) {
    const defaultData = [
      {
        nameAr: "التقاويم واليوميات", nameEn: "Calendars & Diaries", type: 'product' as const,
        descriptionAr: "تصميم وتنفيذ اليوميات والمذكرات والعلامة التجارية للمنشآت.",
        descriptionEn: "Design and implementation of diaries, notebooks, and corporate branding.",
        options: ["التقاويم المطوية (TENT Calendar)", "التقويم الحلزوني (Spiral Calendar)", "التقويم الحائطي (Wall Calendar)", "دفاتر (Notebook)", "مذكرات (Diaries)"]
      },
      {
        nameAr: "ملصقات السيارات", nameEn: "Vehicle Stickers", type: 'product' as const,
        descriptionAr: "تصميم وطباعة وتنفيذ أنواع مختلفة من ملصقات السيارات والشاحنات والحافلات بجودة عالية.",
        descriptionEn: "High-quality design, printing, and implementation of various vehicle stickers for cars, trucks, and buses.",
        options: ["ملصقات السيارات(Car Stickers)", "ملصقات الحافلات والشاحنات(Bus&Truck Stickers)", "ملصقات مقصوصة حسب الطلب (Customized Cutting)", "ملصقات عاكسة (Reflective stickers)"]
      },
      {
        nameAr: "ملصقات الزجاج والحائط", nameEn: "Wall & Glass Stickers", type: 'product' as const,
        descriptionAr: "تصميم وطباعة وتنفيذ أنواع مختلفة من ملصقات الحوائط والزجاج.",
        descriptionEn: "Design, printing, and implementation of various wall and glass stickers.",
        options: ["ملصقات الحائط (Wall Stickers)", "ملصقات مقصوصة للجدران (Cutting Stickers)", "ملصقات ثلجية (Sandblast)", "ملصقات الزجاج (See through for glass)"]
      },
      {
        nameAr: "مواد إعلانية وتسويقية", nameEn: "Promotional Items", type: 'product' as const,
        descriptionAr: "تصميم وطباعة وتنفيذ أنواع مختلفة من المواد التسويقية والإعلانية الحديثة.",
        descriptionEn: "Design, printing, and implementation of modern marketing and promotional materials.",
        options: ["بوب اب (Pop Up)", "رول آب (Roll Up)", "لوحات تسويقية (Danglers)", "طاولات (Counters)"]
      },
      {
        nameAr: "العلامات التجارية والهوية", nameEn: "Branding & Identity", type: 'product' as const,
        descriptionAr: "تصميم وطباعة وتنفيذ الهويات والشعارات والمواد الإعلانية للمنشآت والمراكز الطبية.",
        descriptionEn: "Design and implementation of identities, logos, and advertising materials for facilities and medical centers.",
        options: ["تصميم الشعارات (Logo)", "الكروت الشخصية (Business Cards)", "الأوراق الرسمية والأختام (Letter Head & stamps)", "الكتيبات (Booklets)", "الفيديو (Videos)"]
      },
      {
        nameAr: "اللافتات", nameEn: "Signages", type: 'product' as const,
        descriptionAr: "تصميم وطباعة وتنفيذ أنواع مختلفة من لوحات الأسماء واللافتات الداخلية والخارجية.",
        descriptionEn: "Design, printing, and implementation of various nameplates and indoor/outdoor signage.",
        options: ["يونيبول (Unipole)", "اللوحات واللافتات (Banners & Boards)", "لوحات الأحرف البارزة (3D Sign Boards)"]
      },
      {
        nameAr: "لوحات الأسماء", nameEn: "Name Plates", type: 'product' as const,
        descriptionAr: "تصميم وطباعة وتنفيذ أنواع مختلفة من لوحات الأسماء المكتبية والجدارية.",
        descriptionEn: "Design, printing, and implementation of various office and wall nameplates.",
        options: ["معلقة على الحائط (Wall Mounted)", "بطاقات الأسم (Name Badges)", "علامة الجدول/المكتب (Table Sign)"]
      },
      {
        nameAr: "أعمال الأكريليك", nameEn: "Acrylic Works", type: 'product' as const,
        descriptionAr: "تصميم وطباعة وتنفيذ أنواع مختلفة من لوحات الأكريليك ومنظمات العرض.",
        descriptionEn: "Design, printing, and implementation of various acrylic boards and display organizers.",
        options: ["لوحات الشعار الجدارية (Acrylic Wall Logos)", "لوحات المهام والمتابعة (Planning & Task Boards)", "لوحات الرؤية والقيم (Vision & Values Boards)", "دروع تذكارية وتكريمية (Acrylic Awards & Trophies)", "مستلزمات الضيافة والتقديم (Hospitality Trays)", "منظمات أكريليك مقسمة (Dispensers & Acrylic Organizers)", "اكسسوارات زينه و مناسبات (Cake & Event Decor)"]
      },
      {
        nameAr: "الدروع والجوائز", nameEn: "Awards & Trophies", type: 'product' as const,
        descriptionAr: "تصميم وإنتاج دروع وجوائز فاخرة.",
        descriptionEn: "Design and production of premium awards and trophies.",
        options: ["دروع كريستال فاخرة (Crystal Premium)", "دروع خشبية كلاسيكية (Wooden Classic)", "كؤوس وجوائز مجسمة (Sculpted Trophies)"]
      },
      {
        nameAr: "شهادات", nameEn: "Certificates", type: 'product' as const,
        descriptionAr: "تصميم وإنتاج شهادات تقدير مخصصة بجودة عالية.",
        descriptionEn: "High-quality design and production of custom certificates of appreciation.",
        options: ["شهادات داخل براويز خشبية", "شهادات أكريليك فاخرة", "دروع الشهادات المعدنية"]
      },
      {
        nameAr: "الهدايا الدعائية", nameEn: "Promotional Gifts", type: 'product' as const,
        descriptionAr: "توفير وإنتاج أفضل أنواع الهدايا الدعائية.",
        descriptionEn: "Provision and production of the best types of promotional gifts.",
        options: ["تيشرتات (T-shirts)", "أكواب (Mugs)", "أقلام (Pens)", "حقائب (Bags)"]
      },
      {
        nameAr: "مواد السلامة واللوحات الإرشادية", nameEn: "Safety Materials & Signs", type: 'product' as const,
        descriptionAr: "تصميم وطباعة وتنفيذ مواد ولوحات السلامة.",
        descriptionEn: "Design, printing, and implementation of safety materials and signs.",
        options: ["سترات السلامة (Safety Jackets)", "ملصقات الخوذات (Helmet stickers)", "لوحات السلامة (Safety Signs)", "الطباعة على ملابس العمل (Coverall printing)"]
      },
      {
        nameAr: "التصميم و الطباعة", nameEn: "Design & Printing", type: 'product' as const,
        descriptionAr: "تصميم و طباعه و تنفيذ جميع انواع المطبوعات",
        descriptionEn: "Design, printing, and implementation of all types of publications.",
        options: ["البرشورات (Flyers)", "قوائم الطعام (Menu)", "الكتيبات (Booklets)", "البطاقات (Cards)", "المجلدات (Folders)"]
      }
    ];
    
    for (const item of defaultData) {
      const cat = await Category.create({ 
        nameAr: item.nameAr, 
        nameEn: item.nameEn, 
        type: item.type 
      });
      
      await Product.create({
        name: item.nameEn,
        descriptionEnglish: item.descriptionEn,
        descriptionArabic: item.descriptionAr,
        images: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800"],
        category: cat._id,
        options: item.options
      });
    }
    categories = await Category.find().sort({ createdAt: 1 }).lean() as unknown as LeanCategory[];
  }

  const products = await Product.find().lean() as unknown as IProduct[];
  const projects = await Project.find().lean() as unknown as IProject[];

  // No deduplication here - allow the user to see everything they added
  const formattedCategories = categories.map((cat) => {
    const items = cat.type === 'product' 
      ? products.filter((p) => p.category?.toString() === cat._id.toString())
      : projects.filter((p) => p.category?.toString() === cat._id.toString());
      
    return {
      ...cat,
      _id: cat._id.toString(),
      items: items.map((item) => ({
        ...item,
        _id: item._id.toString(),
        category: item.category?.toString()
      }))
    } as FormattedCategory;
  });

  return JSON.parse(JSON.stringify(formattedCategories));
}
