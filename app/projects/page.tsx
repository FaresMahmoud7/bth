"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ProjectsPage() {
  const { locale } = useLanguage();
  const isAr = locale === "ar";

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-white/10 pb-12">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 leading-none"
            >
              {isAr ? (
                <>أعمالنا <span className="text-white/30 italic font-serif">المختارة</span></>
              ) : (
                <>Selected <span className="text-white/30 italic font-serif">Works</span></>
              )}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-400"
            >
              {isAr 
                ? "معرض لأكثر حملاتنا تأثيراً وتحولات العلامات التجارية. نحن لا نبتكر إعلانات فحسب؛ نحن نبني إرثاً."
                : "A showcase of our most impactful campaigns and brand transformations. We don't just create ads; we build legacies."
              }
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`hidden md:block text-gray-400 ${isAr ? "text-left" : "text-right"}`}
          >
            <p className="text-4xl font-light text-white mb-1">24+</p>
            <p className="text-sm uppercase tracking-widest">{isAr ? "جوائز محققة" : "Awards Won"}</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24">
          {projects.map((project, index) => {
            const title = isAr ? project.titleAr : project.title;
            const description = isAr ? project.descriptionAr : project.description;
            const category = isAr ? project.categoryAr : project.category;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index % 2 === 0 ? 0 : 0.2 }}
                className={`group flex flex-col ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
              >
                <div className="relative overflow-hidden mb-6 aspect-[4/5] md:aspect-auto md:h-[600px] w-full bg-zinc-900">
                  <img 
                    src={project.image} 
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  <div className={`absolute top-6 ${isAr ? 'right-6' : 'left-6'} flex gap-2`}>
                    <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium uppercase tracking-widest text-white border border-white/20">
                      {category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-xs font-medium text-white border border-white/10">
                      {project.year}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-3xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{title}</h3>
                    <p className="text-gray-400 text-lg">{project.client}</p>
                  </div>
                  <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowUpRight className={`w-5 h-5 transition-transform ${isAr ? 'group-hover:-rotate-45' : 'group-hover:rotate-45'}`} />
                  </button>
                </div>
                <p className="mt-6 text-gray-500 line-clamp-2 max-w-md">
                  {description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
