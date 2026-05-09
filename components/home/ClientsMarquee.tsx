"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const clientsRow1 = [
  { ar: "الصين لإنشاءات السكك الحديدية (TIEJUN)", en: "China Railway TIEJUN" },
  { ar: "سيبكو 3 (SEPCOIII)", en: "SEPCOIII" },
  { ar: "ميناء الملك فهد الصناعي بالجبيل", en: "King Fahad Industrial Port in Jubail" },
  { ar: "المؤسسة العامة لتحلية المياه المالحة", en: "Saline Water Conversion Corporation (SWCC)" },
  { ar: "مستشفى المواساة", en: "Mouwasat Hospital" },
  { ar: "تيكفين للإنشاءات", en: "Tekfen Construction" },
  { ar: "ألفا لافال", en: "Alfa Laval" },
  { ar: "سولزر", en: "Sulzer" },
  { ar: "الجزيرة للمركبات", en: "Al Jazirah Vehicles" },
  { ar: "شيميدت السعودية", en: "Schmidt Saudi Arabia" },
  { ar: "إرادة", en: "Eradah" },
  { ar: "مكتبة جرير", en: "Jarir Bookstore" },
  { ar: "الجمعية الخيرية لرعاية الأيتام (إنسان)", en: "Ensan Charity" },
  { ar: "المملكة العربية السعودية", en: "Kingdom of Saudi Arabia" },
  { ar: "برنامج الخدمات الصحية للهيئة الملكية (RCH)", en: "Royal Commission Health Services Program" },
  { ar: "مجموعة زيد الحسين وإخوانه", en: "Zaid Al Hussain & Brothers Group" },
  { ar: "بلانت-تيك العربية", en: "Plant-Tech Arabia" },
  { ar: "شركة داز السعودية المحدودة", en: "Saudi Daz Company Limited" }
];

const clientsRow2 = [
  { ar: "إم آي إس العربية", en: "MIS Arabia" },
  { ar: "المراكز العربية", en: "Arabian Centres" },
  { ar: "كيكسا (KEKSA)", en: "KEKSA" },
  { ar: "لولو هايبر ماركت", en: "LuLu Hypermarket" },
  { ar: "سلمان عياد الرمالي للمحاماة", en: "Salman Ayed Al-Remaly Law Firm" },
  { ar: "عيادات الرازي", en: "Arrazi Clinics" },
  { ar: "شركة دانة الصحراء الطبية", en: "Danat Al Sahraa Medical Co." },
  { ar: "فاسكو", en: "Vasco" },
  { ar: "روستا (جي للتجارة)", en: "Rousta (G Trading)" },
  { ar: "مختبرات البرج الطبية", en: "Al Borg Medical Laboratories" },
  { ar: "بايرن لتأجير المعدات", en: "Byrne Equipment Rental" },
  { ar: "العليان / ديسكون", en: "Olayan / Descon" },
  { ar: "كوبيريون", en: "Coperion" },
  { ar: "أبل بيز", en: "Applebee's" },
  { ar: "عفيفي", en: "Afifi" },
  { ar: "بابريكا", en: "Paprika" },
  { ar: "سار (الشركة السعودية للخطوط الحديدية)", en: "SAR (Saudi Arabia Railways)" }
];



export const ClientsMarquee = () => {
  const { locale } = useLanguage();
  const isAr = locale === "ar";

  return (
    <section id="clients" className="pt-24 pb-12 bg-(--surface) border-y border-(--border)">
      <div className="container mx-auto px-6 mb-12">
        <div className="mb-12 text-center flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-white mb-6"
          >
            {isAr ? "شركاؤنا وعملاؤنا" : "Trusted Partners & Clients"}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4"
          >
            <div className="w-12 h-px bg-[#F58220]" />
            <span className="text-[#F58220] text-lg md:text-xl font-bold uppercase tracking-[0.3em]">
              {isAr ? "يثق بنا كبار الشركات" : "Trusted by Industry Leaders"}
            </span>
            <div className="w-12 h-px bg-[#F58220]" />
          </motion.div>
        </div>

        {/* User's Manual Image Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 max-w-5xl mx-auto rounded-4xl relative p-3 md:p-5 bg-white/2 border border-white/5 backdrop-blur-sm shadow-2xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/image_1.jpeg" 
            alt="Our Clients" 
            className="w-full max-h-[600px] object-contain rounded-2xl"
          />
        </motion.div>
      </div>

      {/* Marquee Track */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-linear-to-r from-(--surface) to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-linear-to-l from-(--surface) to-transparent pointer-events-none" />

        <div className="flex flex-col gap-6">
          {/* Row 1: Moves Left */}
          <div className="flex animate-marquee gap-0">
            {[...clientsRow1, ...clientsRow1].map((client, i) => (
              <div
                key={`row1-${i}`}
                className="shrink-0 flex items-center px-10 border-r border-white/5 group cursor-default"
              >
                <span className="text-white text-sm font-black uppercase tracking-[0.2em] whitespace-nowrap group-hover:text-[#F58220] transition-colors duration-300">
                  {isAr ? client.ar : client.en}
                </span>
              </div>
            ))}
          </div>

          {/* Row 2: Moves Right */}
          <div className="flex animate-marquee-reverse gap-0">
            {[...clientsRow2, ...clientsRow2].map((client, i) => (
              <div
                key={`row2-${i}`}
                className="shrink-0 flex items-center px-10 border-r border-white/5 group cursor-default"
              >
                <span className="text-white text-sm font-black uppercase tracking-[0.2em] whitespace-nowrap group-hover:text-[#F58220] transition-colors duration-300">
                  {isAr ? client.ar : client.en}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
