"use client";

import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { products } from "@/lib/data";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { ProductRequestForm } from "@/components/forms/ProductRequestForm";
import { useLanguage } from "@/context/LanguageContext";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { locale } = useLanguage();
  const isAr = locale === "ar";
  
  const product = products.find(p => p.id === params.id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 pt-20">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-500 font-medium tracking-widest uppercase text-sm">
            {isAr ? "جاري التحميل..." : "Loading details..."}
          </p>
        </div>
      </div>
    );
  }

  const title = isAr ? product.titleAr : product.title;
  const description = isAr ? product.descriptionAr : product.description;
  const category = isAr ? product.categoryAr : product.category;
  const features = isAr ? product.featuresAr : product.features;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] w-full bg-black flex items-end pb-16 md:pb-24 pt-32">
        <div className="absolute inset-0 z-0">
          <img 
            src={product.image} 
            alt={title} 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <button 
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors group"
          >
            {isAr ? (
              <>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                العودة للخدمات
              </>
            ) : (
              <>
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Services
              </>
            )}
          </button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider mb-4"
          >
            {category}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6 leading-tight max-w-4xl"
          >
            {title}
          </motion.h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-2/3"
          >
            <h2 className="text-3xl font-bold mb-6">{isAr ? "نظرة عامة" : "Overview"}</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              {description}
            </p>
            
            <h3 className="text-2xl font-bold mb-6">{isAr ? "ماذا يشمل" : "What's Included"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-4 p-6 rounded-2xl bg-zinc-50 border border-zinc-100">
                  <CheckCircle2 className="w-6 h-6 text-black shrink-0" />
                  <p className="font-medium text-gray-800">{feature}</p>
                </div>
              ))}
            </div>
            
            <div className="p-8 rounded-3xl bg-blue-600 text-white flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h4 className="text-2xl font-bold mb-2">
                  {isAr ? "هل تحتاج إلى حل مخصص؟" : "Need a custom solution?"}
                </h4>
                <p className="text-blue-100">
                  {isAr 
                    ? "يمكن لفريقنا بناء حزمة مخصصة لتلبية مواصفاتك الدقيقة."
                    : "Our enterprise team can build a tailored package to meet your exact specifications."}
                </p>
              </div>
              <Link href="/contact" className="shrink-0 px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:scale-105 transition-transform">
                {isAr ? "تواصل مع المبيعات" : "Contact Sales"}
              </Link>
            </div>
          </motion.div>

          {/* Sticky Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: isAr ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:w-1/3"
          >
            <div className="sticky top-32 p-8 rounded-3xl border border-gray-200 shadow-xl shadow-gray-100/50 bg-white">
              <h3 className="text-lg font-bold text-gray-400 uppercase tracking-widest mb-2">
                {isAr ? "الاستثمار" : "Investment"}
              </h3>
              <p className="text-5xl font-black mb-6">{product.price}</p>
              <p className="text-gray-500 mb-8 pb-8 border-b border-gray-100">
                {isAr 
                  ? "تسعير شفاف لتسليم عالي الجودة. يختلف الجدول الزمني بناءً على النطاق والمتطلبات."
                  : "Transparent pricing for premium delivery. Timeline varies based on scope and requirements."}
              </p>
              <ProductRequestForm productName={title} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
