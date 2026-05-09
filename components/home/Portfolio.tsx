"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/constants/content";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface PortfolioItem {
  title: string;
  category: string;
}

export const Portfolio = () => {
  const { locale } = useLanguage();
  const t = content[locale].portfolio;
  const isAr = locale === "ar";

  // Group items by category
  const categories = Array.from(new Set((t.items as PortfolioItem[]).map((item) => item.category)));

  return (
    <section id="portfolio" className="py-32 mesh-bg relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-40">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-black tracking-[0.5em] uppercase text-[10px] mb-6 block"
          >
            {isAr ? "معرض أعمالنا" : "Case Studies"}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-[8rem] font-black mb-10 text-white tracking-tighter leading-none"
          >
            {isAr ? "أعمالنا" : "WORKS"}<br />
            <span className="opacity-20">{isAr ? "المتميزة" : "SUPREME"}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-white/40 text-xl md:text-2xl max-w-3xl mx-auto font-light"
          >
            {t.subtitle}
          </motion.p>
        </div>

        <div className="space-y-40">
          {categories.map((category, catIndex) => (
            <div key={catIndex} className="space-y-16">
              <div className="flex items-center gap-8">
                 <div className="w-12 h-px bg-primary glow-gold" />
                <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
                  {category as string}
                </h3>
                <div className="h-px grow bg-white/5" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                {(t.items as PortfolioItem[])
                  .filter((item) => item.category === category)
                  .map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative glass-card rounded-[3rem] overflow-hidden cursor-pointer hover:glow-gold transition-all duration-700"
                    >
                      <div className="relative h-120 overflow-hidden">
                        <Image 
                          src={`https://images.unsplash.com/photo-${1550000000000 + (catIndex * 5 + index) * 10000}?auto=format&fit=crop&w=1200`}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-1000 opacity-40 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
                        
                        {/* Hover Overlay Detail */}
                        <div className="absolute inset-0 flex flex-col justify-end p-12 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                           <div className="mb-4 text-xs font-black text-primary uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                             {project.category}
                           </div>
                           <h3 className="text-4xl font-black text-white mb-6 tracking-tighter">{project.title}</h3>
                           
                           <div className="flex items-center gap-4 text-sm font-black text-white/40 group-hover:text-primary transition-colors">
                             <span className="uppercase tracking-widest">{isAr ? "عرض التفاصيل" : "Explore Case"}</span>
                             <ArrowRight className={`w-5 h-5 transition-transform ${isAr ? "rotate-180 group-hover:-translate-x-3" : "group-hover:translate-x-3"}`} />
                           </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
