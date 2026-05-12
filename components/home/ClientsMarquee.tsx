"use client";

import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  row?: number;
}

interface MarqueeRowProps {
  items: ClientData[];
  direction: "left" | "right";
}

const MarqueeRow = ({ 
  items, 
  direction, 
}: MarqueeRowProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const x = useMotionValue(0);
  
  // Use useAnimationFrame for perfectly smooth, frame-rate independent movement
  useAnimationFrame((_, delta) => {
    if (isPaused) return;
    
    // Constant slow speed (0.005 pixels per ms approx)
    const moveBy = 0.005 * delta; 
    const currentX = x.get();
    
    if (direction === "left") {
      let newX = currentX - moveBy;
      // Reset at -25% since we have 4 copies of items
      if (newX <= -25) newX = 0;
      x.set(newX);
    } else {
      let newX = currentX + moveBy;
      // Start at -25% and move to 0 for right direction
      if (newX >= 0) newX = -25;
      x.set(newX);
    }
  });

  // Initialize right-moving row at -25% so it has room to move right
  useEffect(() => {
    if (direction === "right") {
      x.set(-25);
    }
  }, [direction, x]);

  return (
    <div 
      className="flex w-max relative select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div 
        style={{ x: x.get() + "%" }} // We use % for responsive layout
        className="flex gap-8 py-2"
      >
        {/* We use % based movement, so we need the container to be wide enough */}
        {/* Quadruple the items ensures we always have a full screen of logos */}
        {[...items, ...items, ...items, ...items].map((client, idx) => (
          <div 
            key={`${direction}-${idx}`} 
            className="flex items-center gap-4 px-8 py-4 glass-card rounded-full border border-[rgba(245,130,32,0.3)] whitespace-nowrap cursor-default transition-all hover:border-[#F58220] hover:shadow-[0_0_20px_rgba(245,130,32,0.4)] hover:scale-105"
          >
            {client.logoUrl ? (
              <div className="w-14 h-14 rounded-full overflow-hidden bg-white flex items-center justify-center border border-(--border) shadow-md shrink-0">
                <Image 
                  src={client.logoUrl} 
                  alt={idx.toString()} // alt text not critical for logos in marquee
                  width={45} 
                  height={45} 
                  className="object-contain" 
                  style={{ transform: `scale(${client.logoScale || 1})` }}
                />
              </div>
            ) : (
              <div className="w-14 h-14 rounded-full bg-linear-to-br from-[#F58220] to-[#e1730a] flex items-center justify-center shadow-md shrink-0">
                <span className="text-white font-bold text-xl">
                  {client.ar.charAt(0)}
                </span>
              </div>
            )}
            <span className="text-white font-bold text-xl font-cairo">
              {client.ar}
            </span>
          </div>
        ))}
      </motion.div>
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

        const half = Math.ceil(allData.length / 2);
        setRow1(allData.slice(0, half));
        setRow2(allData.slice(half));

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
    <section id="clients" className="pt-20 pb-32 bg-(--surface) border-y border-(--border) overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F58220]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#F58220]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Marquees Container - NOW ON TOP */}
      <div className="max-w-[1440px] mx-auto relative z-10 mb-20 px-6">
        <div className="flex flex-col gap-10 relative w-full overflow-hidden rounded-4xl border border-(--border) bg-black/20 py-16">
          {/* Row 1 - Moves Right to Left (Left) */}
          {row1.length > 0 && (
            <MarqueeRow 
              items={row1} 
              direction="left" 
            />
          )}

          {/* Row 2 - Moves Left to Right (Right) */}
          {row2.length > 0 && (
            <MarqueeRow 
              items={row2} 
              direction="right" 
            />
          )}
          
          {/* Left and Right fade edges - Internal to the 1440px frame */}
          <div className="absolute left-0 top-0 z-20 h-full w-[160px] bg-linear-to-r from-[#0d1c2d] via-[#0d1c2d]/80 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 z-20 h-full w-[160px] bg-linear-to-l from-[#0d1c2d] via-[#0d1c2d]/80 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Title Section - Now below Marquee */}
      <div className="container mx-auto px-6 mb-16 relative z-10">
        <div className="text-center flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-white mb-6"
          >
            {isAr ? "شركاؤنا وعملاؤنا" : "Our Trusted Clients"}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4"
          >
            <div className="w-12 h-px bg-[#F58220]" />
            <span className={`text-[#F58220] text-lg md:text-xl font-bold uppercase ${isAr ? 'tracking-normal' : 'tracking-[0.3em]'}`}>
              {isAr ? "نعتز بثقتكم" : "We Value Your Trust"}
            </span>
            <div className="w-12 h-px bg-[#F58220]" />
          </motion.div>
        </div>
      </div>


      <div className="container mx-auto px-6 mt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-card p-10 md:p-16 border border-[#F58220]/20 bg-[#F58220]/5 relative overflow-hidden"
        >
          <div className="relative z-10">
            <p className={`text-white text-xl md:text-3xl leading-relaxed font-bold ${isAr ? 'font-cairo text-center' : 'text-center'}`}>
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
          </div>
        </motion.div>
      </div>
    </section>
  );
};
