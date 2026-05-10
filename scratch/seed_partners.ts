import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const clientsRow1Default = [
  { ar: "الصين لإنشاءات السكك الحديدية (TIEJUN)", en: "China Railway TIEJUN", row: 1 },
  { ar: "سيبكو 3 (SEPCOIII)", en: "SEPCOIII", row: 1 },
  { ar: "ميناء الملك فهد الصناعي بالجبيل", en: "King Fahad Industrial Port in Jubail", row: 1 },
  { ar: "المؤسسة العامة لتحلية المياه المالحة", en: "Saline Water Conversion Corporation (SWCC)", row: 1 },
  { ar: "مستشفى المواساة", en: "Mouwasat Hospital", row: 1 },
  { ar: "تيكفين للإنشاءات", en: "Tekfen Construction", row: 1 },
  { ar: "ألفا لافال", en: "Alfa Laval", row: 1 },
  { ar: "سولزر", en: "Sulzer", row: 1 },
  { ar: "الجزيرة للمركبات", en: "Al Jazirah Vehicles", row: 1 },
  { ar: "شيميدت السعودية", en: "Schmidt Saudi Arabia", row: 1 },
  { ar: "إرادة", en: "Eradah", row: 1 },
  { ar: "مكتبة جرير", en: "Jarir Bookstore", row: 1 },
  { ar: "الجمعية الخيرية لرعاية الأيتام (إنسان)", en: "Ensan Charity", row: 1 },
  { ar: "المملكة العربية السعودية", en: "Kingdom of Saudi Arabia", row: 1 },
  { ar: "برنامج الخدمات الصحية للهيئة الملكية (RCH)", en: "Royal Commission Health Services Program", row: 1 },
  { ar: "مجموعة زيد الحسين وإخوانه", en: "Zaid Al Hussain & Brothers Group", row: 1 },
  { ar: "بلانت-تيك العربية", en: "Plant-Tech Arabia", row: 1 },
  { ar: "شركة داز السعودية المحدودة", en: "Saudi Daz Company Limited", row: 1 }
];

const clientsRow2Default = [
  { ar: "إم آي إس العربية", en: "MIS Arabia", row: 2 },
  { ar: "المراكز العربية", en: "Arabian Centres", row: 2 },
  { ar: "كيكسا (KEKSA)", en: "KEKSA", row: 2 },
  { ar: "لولو هايبر ماركت", en: "LuLu Hypermarket", row: 2 },
  { ar: "سلمان عياد الرمالي للمحاماة", en: "Salman Ayed Al-Remaly Law Firm", row: 2 },
  { ar: "عيادات الرازي", en: "Arrazi Clinics", row: 2 },
  { ar: "شركة دانة الصحراء الطبية", en: "Danat Al Sahraa Medical Co.", row: 2 },
  { ar: "فاسكو", en: "Vasco", row: 2 },
  { ar: "روستا (جي للتجارة)", en: "Rousta (G Trading)", row: 2 },
  { ar: "مختبرات البرج الطبية", en: "Al Borg Medical Laboratories", row: 2 },
  { ar: "بايرن لتأجير المعدات", en: "Byrne Equipment Rental", row: 2 },
  { ar: "العليان / ديسكون", en: "Olayan / Descon", row: 2 },
  { ar: "كوبيريون", en: "Coperion", row: 2 },
  { ar: "أبل بيز", en: "Applebee's", row: 2 },
  { ar: "عفيفي", en: "Afifi", row: 2 },
  { ar: "بابريكا", en: "Paprika", row: 2 },
  { ar: "سار (الشركة السعودية للخطوط الحديدية)", en: "SAR (Saudi Arabia Railways)", row: 2 }
];

const ClientPartnerSchema = new mongoose.Schema({
  nameAr: String,
  nameEn: String,
  row: Number,
  logoUrl: String,
  logoScale: Number
}, { timestamps: true });

const ClientPartner = mongoose.models.ClientPartner || mongoose.model("ClientPartner", ClientPartnerSchema);

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to DB");

    // We don't drop existing ones, just in case user added some.
    // Instead we check if they already exist to prevent duplicates.
    const existing = await ClientPartner.find();
    const existingNames = new Set(existing.map(p => p.nameEn));

    const allDefaults = [...clientsRow1Default, ...clientsRow2Default];
    let added = 0;

    for (const client of allDefaults) {
      if (!existingNames.has(client.en)) {
        await ClientPartner.create({
          nameAr: client.ar,
          nameEn: client.en,
          row: client.row,
          logoScale: 1
        });
        added++;
        console.log(`Added: ${client.en}`);
      }
    }

    console.log(`Seeding complete. Added ${added} new partners.`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
