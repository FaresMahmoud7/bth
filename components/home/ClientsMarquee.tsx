"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

import { useState, useEffect } from "react";

const clientsRow1Default = [
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

const clientsRow2Default = [
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

interface ClientData {
  ar: string;
  en: string;
}




export const ClientsMarquee = () => {
  const { locale } = useLanguage();
  const isAr = locale === "ar";

  const [row1, setRow1] = useState<ClientData[]>(clientsRow1Default);
  const [row2, setRow2] = useState<ClientData[]>(clientsRow2Default);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await fetch("/api/partners");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            const r1 = data.filter((p: any) => p.row === 1).map((p: any) => ({ ar: p.nameAr, en: p.nameEn }));
            const r2 = data.filter((p: any) => p.row === 2).map((p: any) => ({ ar: p.nameAr, en: p.nameEn }));
            
            if (r1.length > 0) setRow1(r1);
            if (r2.length > 0) setRow2(r2);
          }
        }
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };
    fetchPartners();
  }, []);

  return (
    <section id="clients" className="pt-12 pb-24 bg-(--surface) border-y border-(--border) overflow-hidden">
      {/* Marquee Track - Moved to Top */}
      <div className="relative overflow-hidden mb-24">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-linear-to-r from-(--surface) to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-linear-to-l from-(--surface) to-transparent pointer-events-none" />

        <div className="flex flex-col gap-6">
          {/* Row 1: Moves Left */}
          <div className="flex animate-marquee gap-0">
            {[...row1, ...row1, ...row1].map((client, i) => (
              <div
                key={`row1-${i}`}
                className="shrink-0 flex items-center px-10 border-r border-white/5 group cursor-default"
              >
                <span className={`text-white text-sm font-black uppercase whitespace-nowrap group-hover:text-[#F58220] transition-colors duration-300 ${isAr ? 'tracking-normal' : 'tracking-[0.2em]'}`}>
                  {isAr ? client.ar : client.en}
                </span>
              </div>
            ))}
          </div>

          {/* Row 2: Moves Right */}
          <div className="flex animate-marquee-reverse gap-0">
            {[...row2, ...row2, ...row2].map((client, i) => (
              <div
                key={`row2-${i}`}
                className="shrink-0 flex items-center px-10 border-r border-white/5 group cursor-default"
              >
                <span className={`text-white text-sm font-black uppercase whitespace-nowrap group-hover:text-[#F58220] transition-colors duration-300 ${isAr ? 'tracking-normal' : 'tracking-[0.2em]'}`}>
                  {isAr ? client.ar : client.en}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
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
            className="flex items-center justify-center gap-4 mb-12"
          >
            <div className="w-12 h-px bg-[#F58220]" />
            <span className={`text-[#F58220] text-lg md:text-xl font-bold uppercase ${isAr ? 'tracking-normal' : 'tracking-[0.3em]'}`}>
              {isAr ? "نعتز بثقتكم" : "We Value Your Trust"}
            </span>
            <div className="w-12 h-px bg-[#F58220]" />
          </motion.div>

          {/* Praise Text Section - Replaces Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto glass-card p-10 md:p-16 border border-[#F58220]/20 bg-[#F58220]/5 relative overflow-hidden"
          >
            {/* Decorative background element */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#F58220]/10 blur-[100px] pointer-events-none" />
            
            <div className="relative z-10">
              <p className={`text-white text-xl md:text-3xl leading-relaxed font-bold ${isAr ? 'font-cairo' : ''}`}>
                {isAr ? (
                  <>
                    "نحن في بث الخليجية نفخر بشراكتنا مع هذه النخبة من الشركات التي وضعت ثقتها فينا. إن نزاهة التعامل وأصالة الشراكة هي ما يجمعنا بكم، ونعتز بكوننا جزءاً من نجاحاتكم المستمرة. <span className="text-[#F58220]">شراكة تفخر بها الأجيال، وعلاقات بنيت على الصدق والاحترافية.</span> الله يحييكم ويبقيكم شركاء نجاح دايمين."
                  </>
                ) : (
                  <>
                    "At BTH, we take immense pride in our partnership with these distinguished companies that have placed their trust in us. Integrity and authentic partnership are the foundation of our relationships, and we are honored to be part of your ongoing success. <span className="text-[#F58220]">These are partnerships built on honesty, professionalism, and mutual growth.</span>"
                  </>
                )}
              </p>
              
              <div className="mt-10 flex items-center justify-center gap-6">
                <div className="h-px w-12 bg-white/10" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
                  {isAr ? "بث الخليجية للدعاية والإعلان" : "BTH Advertising Agency"}
                </span>
                <div className="h-px w-12 bg-white/10" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
