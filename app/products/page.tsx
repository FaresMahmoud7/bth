"use client";

import { motion } from "framer-motion";
import { products } from "@/lib/data";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ProductsPage() {
  const { locale } = useLanguage();
  const isAr = locale === "ar";

  return (
    <div className="min-h-screen bg-zinc-50 pt-28 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <Sparkles className="w-4 h-4" />
            {isAr ? "خدماتنا" : "Our Services"}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
          >
            {isAr ? (
              <>القدرات <span className="text-gray-400">والعروض</span></>
            ) : (
              <>Capabilities & <span className="text-gray-400">Offerings</span></>
            )}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            {isAr 
              ? "اكتشف مجموعتنا الشاملة من حلول العلامات التجارية وإعلانات الشركات المصممة لتسريع نموك."
              : "Discover our comprehensive suite of corporate advertising and branding solutions designed to accelerate your growth."
            }
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {products.map((product, index) => {
            const title = isAr ? product.titleAr : product.title;
            const description = isAr ? product.descriptionAr : product.description;
            const category = isAr ? product.categoryAr : product.category;
            const features = isAr ? product.featuresAr : product.features;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="group flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="md:w-2/5 relative overflow-hidden min-h-[250px] md:min-h-full">
                  <img 
                    src={product.image} 
                    alt={title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className={`absolute top-4 ${isAr ? 'right-4' : 'left-4'} bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-black`}>
                    {category}
                  </div>
                </div>
                <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mb-4">{title}</h2>
                    <p className="text-gray-500 mb-6 leading-relaxed">{description}</p>
                    <ul className="space-y-2 mb-8">
                      {features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                        {isAr ? "يبدأ من" : "Starting at"}
                      </span>
                      <span className="font-bold text-xl">{product.price}</span>
                    </div>
                    <Link 
                      href={`/products/${product.id}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition-colors group-hover:px-8"
                    >
                      {isAr ? "التفاصيل" : "Details"}
                      <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
