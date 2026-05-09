"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { products } from "@/lib/data";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export const FeaturedProducts = () => {
  const { locale } = useLanguage();
  const isAr = locale === "ar";
  const featured = products.slice(0, 3);

  return (
    <section className="py-24 bg-zinc-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold tracking-tighter mb-4"
            >
              {isAr ? "حلول متميزة." : "Premium Solutions."}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 text-lg"
            >
              {isAr 
                ? "خدمات مخصصة مصممة للارتقاء بحضور شركتك وتحقيق نتائج قابلة للقياس."
                : "Tailored services designed to elevate your corporate presence and drive measurable outcomes."
              }
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: isAr ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/products" className="group inline-flex items-center gap-2 text-black font-semibold hover:text-blue-600 transition-colors">
              {isAr ? "عرض جميع الخدمات" : "View All Services"}
              {isAr ? (
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              ) : (
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              )}
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((product, index) => {
            const title = isAr ? product.titleAr : product.title;
            const description = isAr ? product.descriptionAr : product.description;
            const category = isAr ? product.categoryAr : product.category;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                  <div className={`absolute top-4 ${isAr ? 'right-4' : 'left-4'} bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-black`}>
                    {category}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold mb-3">{title}</h3>
                  <p className="text-gray-500 mb-6 flex-1 line-clamp-3">{description}</p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <span className="font-medium text-lg">{product.price}</span>
                    <Link 
                      href={`/products/${product.id}`}
                      className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors"
                    >
                      {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
