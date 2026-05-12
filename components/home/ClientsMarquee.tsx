"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";

// Default client list
const allClientsDefault = [
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
  { ar: "شركة داز السعودية المحدودة", en: "Saudi Daz Company Limited" },
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

const MarqueeRow = ({ items, direction }: { items: ClientData[]; direction: "left" | "right" }) => {
  // Ensure enough items for a truly infinite loop without gaps
  const displayItems = useMemo(() => {
    if (!items || items.length === 0) return [];
    
    // We repeat the base items multiple times to ensure the container is much wider than any screen
    let baseList = [...items];
    while (baseList.length < 40) {
      baseList = [...baseList, ...items];
    }
    
    // Duplicate the final long list for the seamless 0% to -50% loop
    return [...baseList, ...baseList];
  }, [items]);

  // Constant speed logic (approx 4 seconds per item)
  const duration = (displayItems.length / 2) * 4;

  if (displayItems.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden select-none py-6">
      <div 
        className={`flex w-max flex-nowrap gap-8 px-4 ${direction === "left" ? "animate-marquee" : "animate-marquee-reverse"} hover:[animation-play-state:paused]`}
        style={{ 
          animationDuration: `${duration}s`,
          willChange: "transform"
        }}
      >
        {displayItems.map((client, idx) => (
          <div 
            key={`${direction}-${idx}`} 
            className="flex items-center gap-6 px-10 py-5 glass-card rounded-full border border-white/10 whitespace-nowrap cursor-default transition-all duration-500 hover:border-[#F58220]/50 hover:shadow-[0_0_40px_rgba(245,130,32,0.3)] hover:scale-105 bg-white/[0.03] backdrop-blur-xl"
          >
            {client.logoUrl ? (
              <div className="w-14 h-14 rounded-full overflow-hidden bg-white flex items-center justify-center border border-white/10 shadow-inner p-2 shrink-0">
                <Image 
                  src={client.logoUrl} 
                  alt={client.ar} 
                  width={40} 
                  height={40} 
                  className="object-contain" 
                  style={{ transform: `scale(${client.logoScale || 1})` }}
                />
              </div>
            ) : (
              <div className="w-14 h-14 rounded-full bg-linear-to-br from-[#F58220] to-[#e1730a] flex items-center justify-center shadow-lg shrink-0">
                <span className="text-white font-bold text-2xl uppercase">
                  {client.ar.charAt(0)}
                </span>
              </div>
            )}
            <span className="text-white font-bold text-xl font-cairo tracking-wide">
              {client.ar}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ClientsMarquee = () => {
  const { locale } = useLanguage();
  const isAr = locale === "ar";
  const [row1, setRow1] = useState<ClientData[]>(allClientsDefault.slice(0, 18));
  const [row2, setRow2] = useState<ClientData[]>(allClientsDefault.slice(18));

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await fetch("/api/partners");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            const mapped = data.map((p: any) => ({
              ar: p.nameAr,
              en: p.nameEn,
              logoUrl: p.logoUrl,
              logoScale: p.logoScale
            }));
            
            const half = Math.ceil(mapped.length / 2);
            const r1 = mapped.slice(0, half);
            const r2 = mapped.slice(half);
            
            // Sync lengths to ensure rows move at same speed
            while (r2.length < r1.length) r2.push(r1[r2.length % r1.length]);
            
            setRow1(r1);
            setRow2(r2);
          }
        }
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };
    fetchPartners();
  }, []);

  return (
    <section id="clients" className="pt-32 pb-40 bg-[#051424] border-y border-white/5 overflow-hidden relative">
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#F58220]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#F58220]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10 px-6">
        <div className="flex flex-col gap-12 relative w-full overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.02] py-24 backdrop-blur-3xl">
          <MarqueeRow items={row1} direction="left" />
          <MarqueeRow items={row2} direction="right" />
          
          {/* Edge Fades */}
          <div className="absolute left-0 top-0 z-20 h-full w-[20%] bg-linear-to-r from-[#051424] via-[#051424]/90 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 z-20 h-full w-[20%] bg-linear-to-l from-[#051424] via-[#051424]/90 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Title Section */}
      <div className="container mx-auto px-6 mt-32">
        <div className="text-center flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter"
          >
            {isAr ? "شركاؤنا وعملاؤنا" : "Our Trusted Clients"}
          </motion.h2>
          <div className="flex items-center justify-center gap-6">
            <div className="w-16 h-px bg-[#F58220]/50" />
            <span className="text-[#F58220] text-xl md:text-2xl font-bold uppercase tracking-[0.3em]">
              {isAr ? "نعتز بثقتكم" : "We Value Your Trust"}
            </span>
            <div className="w-16 h-px bg-[#F58220]/50" />
          </div>
        </div>
      </div>
    </section>
  );
};
