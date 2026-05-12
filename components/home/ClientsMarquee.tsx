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

interface ApiPartner {
  nameAr: string;
  nameEn: string;
  logoUrl?: string;
  logoScale?: number;
}

const MarqueeRow = ({ items, direction }: { items: ClientData[]; direction: "left" | "right" }) => {
  // Ensure enough items for an infinite loop on any screen size
  const displayItems = useMemo(() => {
    if (!items || items.length === 0) return [];
    
    let list = [...items];
    // Keep repeating until we have enough items to fill at least 3x the container width
    while (list.length < 30) {
      list = [...list, ...items];
    }
    
    // Double the final list for a perfectly seamless 0% to -50% loop
    return [...list, ...list];
  }, [items]);

  // Speed calculation: (Items in one set * constant seconds per item)
  const duration = (displayItems.length / 2) * 3.5;

  if (displayItems.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden select-none group py-2">
      <div 
        className={`flex min-w-max gap-8 px-4 ${direction === "left" ? "animate-marquee" : "animate-marquee-reverse"} group-hover:[animation-play-state:paused]`}
        style={{ 
          "--duration": `${duration}s`,
          animationDuration: `${duration}s`,
          willChange: "transform"
        } as React.CSSProperties}
      >
        {displayItems.map((client, idx) => (
          <div 
            key={`${direction}-${idx}`} 
            className="flex items-center gap-6 px-10 py-5 glass-card rounded-full border border-white/10 whitespace-nowrap cursor-default transition-all duration-500 hover:border-[#F58220]/50 hover:shadow-[0_0_40px_rgba(245,130,32,0.3)] hover:scale-105 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-xl"
          >
            {client.logoUrl ? (
              <div className="w-14 h-14 rounded-full overflow-hidden bg-white/10 flex items-center justify-center border border-white/10 shadow-inner p-2 shrink-0">
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
  const [row1, setRow1] = useState<ClientData[]>([]);
  const [row2, setRow2] = useState<ClientData[]>([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await fetch("/api/partners");
        let allData = [...allClientsDefault];
        
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            allData = data.map((p: ApiPartner) => ({ 
              ar: p.nameAr, 
              en: p.nameEn, 
              logoUrl: p.logoUrl, 
              logoScale: p.logoScale 
            }));
          }
        }

        // If few items, use all in both rows to avoid gaps
        if (allData.length < 8) {
          setRow1(allData);
          setRow2(allData);
        } else {
          const half = Math.ceil(allData.length / 2);
          setRow1(allData.slice(0, half));
          setRow2(allData.slice(half));
        }

      } catch (error) {
        console.error("Error fetching partners:", error);
        const half = Math.ceil(allClientsDefault.length / 2);
        setRow1(allClientsDefault.slice(0, half));
        setRow2(allClientsDefault.slice(half));
      }
    };
    fetchPartners();
  }, []);

  return (
    <section id="clients" className="pt-32 pb-40 bg-[#051424] border-y border-white/5 overflow-hidden relative">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#F58220]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#F58220]/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Marquees Container */}
      <div className="max-w-[1440px] mx-auto relative z-10 px-6">
        <div className="flex flex-col gap-12 relative w-full overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.02] py-24 backdrop-blur-3xl">
          {/* Row 1 - Moves Right to Left (Left) */}
          {row1.length > 0 && <MarqueeRow items={row1} direction="left" />}

          {/* Row 2 - Moves Left to Right (Right) */}
          {row2.length > 0 && <MarqueeRow items={row2} direction="right" />}
          
          {/* Edge Fade Masks */}
          <div className="absolute left-0 top-0 z-20 h-full w-[250px] bg-linear-to-r from-[#051424] via-[#051424]/90 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 z-20 h-full w-[250px] bg-linear-to-l from-[#051424] via-[#051424]/90 to-transparent pointer-events-none" />
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
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-6"
          >
            <div className="w-20 h-px bg-[#F58220]/50" />
            <span className="text-[#F58220] text-xl md:text-3xl font-bold uppercase tracking-[0.2em] font-montserrat">
              {isAr ? "نعتز بثقتكم" : "We Value Your Trust"}
            </span>
            <div className="w-20 h-px bg-[#F58220]/50" />
          </motion.div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="container mx-auto px-6 mt-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto glass-card p-16 md:p-24 border border-white/10 bg-white/[0.03] relative overflow-hidden rounded-[4rem]"
        >
          <div className="relative z-10 text-center">
            <p className="text-white text-3xl md:text-5xl leading-tight font-black font-cairo">
              {isAr ? (
                <>
                  &quot;نحن في بث الخليجية نفخر بشراكتنا مع هذه النخبة من الشركات التي وضعت ثقتها فينا. إن نزاهة التعامل وأصالة الشراكة هي ما يجمعنا بكم، ونعتز بكوننا جزءاً من نجاحاتكم المستمرة. <span className="text-[#F58220]">شراكة تفخر بها الأجيال، وعلاقات بنيت على الصدق والاحترافية.</span>&quot;
                </>
              ) : (
                <>
                  &quot;At BTH, we take immense pride in our partnership with these distinguished companies that have placed their trust in us. Integrity and authentic partnership are the foundation of our relationships, and we are honored to be part of your ongoing success. <span className="text-[#F58220]">These are partnerships built on honesty, professionalism, and mutual growth.</span>&quot;
                </>
              )}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
