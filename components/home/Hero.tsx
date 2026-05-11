"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { ArrowRight, ArrowLeft, ChevronDown } from "lucide-react";
import Image from "next/image";


export const Hero = () => {
  const { locale } = useLanguage();
  const isAr = locale === "ar";

  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden bg-(--background)">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Base Background Color */}
        <div className="absolute inset-0 bg-(--background)" />
        
        {/* Background Image - REVERTED to original powerful look */}
        <Image
          src="/image2.jpeg" 
          alt="Hero Background"
          fill
          priority
          className="object-cover opacity-25 scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
        
        {/* Dynamic Gradient Overlays */}
        <div className="absolute inset-0 bg-linear-to-b from-(--background) via-transparent to-(--background) opacity-90" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        
        {/* Animated Radial Highlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,130,32,0.05),transparent_70%)]" />

        {/* Orange accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#F58220]/60 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center flex-1 container mx-auto px-6 pt-40 pb-24">
        <div className="max-w-4xl text-start">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-6 mb-10"
          >
            <span className="text-[#F58220] text-2xl md:text-5xl font-black uppercase tracking-tight wrap-break-word">
              {isAr ? "مؤسسة BTH للدعاية والإعلان" : "BTH Advertising EST"}
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight mb-6"
          >
            <span className="text-white wrap-break-word">
              {isAr ? "نصنع" : "We Craft"}
            </span>
            <br />
            <span className="text-shimmer wrap-break-word">
              {isAr ? "علامات تجارية خالدة" : "Brands That Endure"}
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-white/50 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl"
          >
            {isAr
              ? "من الطباعة عالية الجودة إلى الهوية البصرية المتكاملة — شريكك الموثوق في مدينة الجبيل منذ أكثر من عشر سنوات."
              : "From premium printing to complete visual identity — your trusted advertising partner in Jubail City for over a decade."}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="#expertise"
              className={`group inline-flex items-center justify-center gap-3 px-8 py-4 glow-button-primary font-bold text-sm uppercase ${isAr ? 'tracking-normal' : 'tracking-widest'}`}
            >
              {isAr ? "استعرض خدماتنا" : "View Our Services"}
              {isAr ? <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> : <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </Link>
          </motion.div>
        </div>
      </div>


      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 flex justify-center pb-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/20"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
};
