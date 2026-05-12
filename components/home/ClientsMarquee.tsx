"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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
  rowIndex: number;
  currentIndex: number;
  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;
  prevSlide: () => void;
  nextSlide: () => void;
  isAr: boolean;
}

const MarqueeRow = ({ 
  items, 
  direction, 
  rowIndex, 
  currentIndex, 
  isPaused, 
  setIsPaused, 
  prevSlide, 
  nextSlide, 
  isAr 
}: MarqueeRowProps) => {
  const autoX = useMotionValue(0);
  const manualX = useMotionValue(currentIndex * -20); // Initial position
  const springManualX = useSpring(manualX, { stiffness: 40, damping: 20 });
  
  // Combine auto and manual
  const combinedX = useTransform(
    [autoX, springManualX],
    ([a, b]) => {
      const valA = a as number;
      const valB = b as number;
      return direction === "left" ? `${valA + valB}%` : `${valA - valB}%`;
    }
  );

  // Auto-scroll logic - SLOWER SPEED
  useEffect(() => {
    if (isPaused) return;
    const speed = rowIndex === 0 ? 0.01 : -0.012; // Much slower
    const interval = setInterval(() => {
      autoX.set(autoX.get() - speed);
      // Reset autoX when it reaches -100% to keep numbers small
      if (autoX.get() < -100) autoX.set(0);
      if (autoX.get() > 100) autoX.set(0);
    }, 16);
    return () => clearInterval(interval);
  }, [isPaused, rowIndex, autoX]);

  // Update manualX when currentIndex changes
  useEffect(() => {
    manualX.set(currentIndex * -20);
  }, [currentIndex, manualX]);

  return (
    <div 
      className="flex w-max relative select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div 
        style={{ x: combinedX }}
        className="flex gap-8 py-2"
        drag="x"
        dragConstraints={{ left: -100, right: 100 }}
        onDragEnd={(_, info) => {
          const threshold = 100;
          if (info.offset.x > threshold) prevSlide();
          else if (info.offset.x < -threshold) nextSlide();
        }}
      >
        {/* Quadruple the items for perfect infinite feel */}
        {[...items, ...items, ...items, ...items].map((client, idx) => (
          <div 
            key={`${direction}-${idx}`} 
            className="flex items-center gap-4 px-8 py-4 glass-card rounded-full border border-[rgba(245,130,32,0.3)] whitespace-nowrap cursor-default transition-all hover:border-[#F58220] hover:shadow-[0_0_20px_rgba(245,130,32,0.4)] hover:scale-105"
          >
            {client.logoUrl ? (
              <div className="w-14 h-14 rounded-full overflow-hidden bg-white flex items-center justify-center border border-(--border) shadow-md shrink-0">
                <Image 
                  src={client.logoUrl} 
                  alt={isAr ? client.ar : client.en} 
                  width={45} 
                  height={45} 
                  className="object-contain" 
                  style={{ transform: `scale(${client.logoScale || 1})` }}
                />
              </div>
            ) : (
              <div className="w-14 h-14 rounded-full bg-linear-to-br from-[#F58220] to-[#e1730a] flex items-center justify-center shadow-md shrink-0">
                <span className="text-white font-bold text-xl">
                  {(isAr ? client.ar : client.en).charAt(0)}
                </span>
              </div>
            )}
            <span className={`text-white font-bold text-xl ${isAr ? 'font-cairo' : 'font-manrope'}`}>
              {isAr ? client.ar : client.en}
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
  
  // Carousel State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalPages = 5; // We'll divide the logos into 5 virtual pages
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

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

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  useEffect(() => {
    if (!isPaused) {
      autoplayRef.current = setInterval(nextSlide, 5000);
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isPaused, nextSlide]);


  return (
    <section id="clients" className="pt-20 pb-32 bg-(--surface) border-y border-(--border) overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F58220]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#F58220]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Marquees Container - NOW ON TOP */}
      <div className="max-w-[1440px] mx-auto relative z-10 mb-20 px-6 group/carousel">
        <div className="flex flex-col gap-10 relative w-full overflow-hidden rounded-4xl border border-(--border) bg-black/20 py-16">
          {/* Row 1 - Moves Right to Left (Left) */}
          {row1.length > 0 && (
            <MarqueeRow 
              items={row1} 
              direction="left" 
              rowIndex={0} 
              currentIndex={currentIndex}
              isPaused={isPaused}
              setIsPaused={setIsPaused}
              prevSlide={prevSlide}
              nextSlide={nextSlide}
              isAr={isAr}
            />
          )}

          {/* Row 2 - Moves Left to Right (Right) */}
          {row2.length > 0 && (
            <MarqueeRow 
              items={row2} 
              direction="right" 
              rowIndex={1} 
              currentIndex={currentIndex}
              isPaused={isPaused}
              setIsPaused={setIsPaused}
              prevSlide={prevSlide}
              nextSlide={nextSlide}
              isAr={isAr}
            />
          )}
          
          {/* Left and Right fade edges - Internal to the 1440px frame */}
          <div className="absolute left-0 top-0 z-20 h-full w-[160px] bg-linear-to-r from-[#0d1c2d] via-[#0d1c2d]/80 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 z-20 h-full w-[160px] bg-linear-to-l from-[#0d1c2d] via-[#0d1c2d]/80 to-transparent pointer-events-none" />

          {/* Navigation Arrows */}
          <div className="absolute inset-0 flex items-center justify-between px-8 z-30 pointer-events-none opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-500">
            <button 
              onClick={isAr ? nextSlide : prevSlide}
              className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white flex items-center justify-center hover:bg-[#F58220] hover:border-[#F58220] transition-all pointer-events-auto shadow-2xl active:scale-95"
              title={isAr ? "السابق" : "Previous"}
            >
              <ChevronLeft size={28} className={isAr ? "rotate-180" : ""} />
            </button>
            <button 
              onClick={isAr ? prevSlide : nextSlide}
              className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white flex items-center justify-center hover:bg-[#F58220] hover:border-[#F58220] transition-all pointer-events-auto shadow-2xl active:scale-95"
              title={isAr ? "التالي" : "Next"}
            >
              <ChevronRight size={28} className={isAr ? "rotate-180" : ""} />
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-30">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`transition-all duration-500 rounded-full ${
                  currentIndex === i 
                    ? "w-10 h-2 bg-[#F58220] shadow-[0_0_15px_rgba(245,130,32,0.6)]" 
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
                title={`Go to page ${i + 1}`}
              />
            ))}
          </div>
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
