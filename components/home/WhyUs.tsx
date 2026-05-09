"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Award, Clock, Shield, Users, Zap } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const reasons = [
  {
    icon: Award,
    en: { title: "Premium Quality", desc: "Every product is crafted with precision using top-grade materials and processes." },
    ar: { title: "جودة لا تُضاهى", desc: "كل منتج يُصنع بدقة باستخدام أفضل المواد والعمليات المتقنة." },
  },
  {
    icon: Clock,
    en: { title: "On-Time Delivery", desc: "We respect your deadlines. Projects are always delivered as promised." },
    ar: { title: "التسليم في الوقت المحدد", desc: "نحترم مواعيدك. مشاريعك تُسلَّم دائمًا في الموعد المتفق عليه." },
  },
  {
    icon: Shield,
    en: { title: "10+ Years Experience", desc: "Over a decade of serving Jubail's top companies with proven results." },
    ar: { title: "أكثر من 10 سنوات خبرة", desc: "عقد من الزمن وأكثر في خدمة كبرى شركات الجبيل بنتائج موثقة." },
  },
  {
    icon: Users,
    en: { title: "500+ Satisfied Clients", desc: "A portfolio of 500+ happy clients across diverse industries in Saudi Arabia." },
    ar: { title: "+500 عميل راضٍ", desc: "محفظة تضم أكثر من 500 عميل سعيد في مختلف القطاعات بالمملكة." },
  },
  {
    icon: Zap,
    en: { title: "Full-Service Agency", desc: "From concept to execution — design, print, install, all under one roof." },
    ar: { title: "وكالة متكاملة الخدمات", desc: "من الفكرة إلى التنفيذ — تصميم، طباعة، تركيب — كل شيء تحت سقف واحد." },
  },
];

export const WhyUs = () => {
  const { locale } = useLanguage();
  const isAr = locale === "ar";

  return (
    <section id="why-us" className="py-32 bg-(--background)">
      <div className="container mx-auto px-6">
        <div className="mb-24 text-center flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-white mb-6"
          >
            {isAr ? "لماذا تختارنا؟" : "Why Choose BTH?"}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4"
          >
            <div className="w-12 h-px bg-[#F58220]" />
            <span className="text-[#F58220] text-lg md:text-xl font-bold uppercase tracking-[0.3em]">
              {isAr ? "التميز هو معيارنا الوحيد" : "Excellence is Our Only Standard"}
            </span>
            <div className="w-12 h-px bg-[#F58220]" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            const text = isAr ? reason.ar : reason.en;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-(--surface) p-10 hover:bg-(--surface-2) transition-colors text-start"
              >
                <div className="w-12 h-12 border border-[#F58220]/30 flex items-center justify-center mb-8 group-hover:bg-[#F58220]/10 transition-colors">
                  <Icon className="w-5 h-5 text-[#F58220]" />
                </div>
                <h3 className="text-white font-bold text-xl mb-3">{text.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{text.desc}</p>
              </motion.div>
            );
          })}

          {/* Empty filler for grid alignment */}
          <div className="hidden lg:flex bg-(--surface) p-10 relative overflow-hidden items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <Logo size={120} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
