"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

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
  logoUrl?: string;
  logoScale?: number;
}

export const ClientsMarquee = () => {
  const { locale } = useLanguage();
  const isAr = locale === "ar";
  const containerRef = useRef<HTMLDivElement>(null);



  const [row1, setRow1] = useState<ClientData[]>(clientsRow1Default);
  const [row2, setRow2] = useState<ClientData[]>(clientsRow2Default);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await fetch("/api/partners");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            const r1 = data.filter((p: { row: number; nameAr: string; nameEn: string; logoUrl?: string; logoScale?: number }) => p.row === 1).map((p: { nameAr: string; nameEn: string; logoUrl?: string; logoScale?: number }) => ({ ar: p.nameAr, en: p.nameEn, logoUrl: p.logoUrl, logoScale: p.logoScale }));
            const r2 = data.filter((p: { row: number; nameAr: string; nameEn: string; logoUrl?: string; logoScale?: number }) => p.row === 2).map((p: { nameAr: string; nameEn: string; logoUrl?: string; logoScale?: number }) => ({ ar: p.nameAr, en: p.nameEn, logoUrl: p.logoUrl, logoScale: p.logoScale }));
            
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
    <section id="clients" ref={containerRef} className="pt-12 pb-24 bg-(--surface) border-y border-(--border) overflow-hidden">
      {/* Marquee display removed */}

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

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto glass-card p-10 md:p-16 border border-[#F58220]/20 bg-[#F58220]/5 relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#F58220]/10 blur-[100px] pointer-events-none" />
            
            <div className="relative z-10">
              <p className={`text-white text-xl md:text-3xl leading-relaxed font-bold ${isAr ? 'font-cairo' : ''}`}>
                {isAr ? (
                  <>
                    &quot;نحن في بث الخليجية نفخر بشراكتنا مع هذه النخبة من الشركات التي وضعت ثقتها فينا. إن نزاهة التعامل وأصالة الشراكة هي ما يجمعنا بكم، ونعتز بكوننا جزءاً من نجاحاتكم المستمرة. <span className="text-[#F58220]">شراكة تفخر بها الأجيال، وعلاقات بنيت على الصدق والاحترافية.</span> الله يحييكم ويبقيكم شركاء نجاح دايمين.&quot;
                  </>
                ) : (
                  <>
                    &quot;At BTH, we take immense pride in our partnership with these distinguished companies that have placed their trust in us. Integrity and authentic partnership are the foundation of our relationships, and we are honored to be part of your ongoing success. <span className="text-[#F58220]">These are partnerships built on honesty, professionalism, and mutual growth.</span>&quot;
                  </>
                )}
              </p>
              
              <div className="mt-10 flex items-center justify-center gap-6">
                <div className="h-px w-12 bg-white/10" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
                  {isAr ? "مؤسسة BTH" : "BTH EST"}
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
