"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/constants/content";
import Image from "next/image";
import { Target, Eye, Shield, CheckCircle2 } from "lucide-react";

export const AboutUs = () => {
  const { locale } = useLanguage();
  const t = content[locale].about;
  const isAr = locale === "ar";

  const pillars = [
    {
      icon: Target,
      title: isAr ? "رؤيتنا" : "Our Vision",
      text: isAr
        ? "نسعى لنكون الرائدين in تقديم الحلول الإعلانية المبتكرة التي تتجاوز التوقعات."
        : "To be the leading force in innovative advertising solutions that transcend expectations."
    },
    {
      icon: Eye,
      title: isAr ? "مهمتنا" : "Our Mission",
      text: isAr
        ? "تقديم خدمات ومنتجات عالية الجودة تعزز الهوية التجارية لعملائنا في السوق."
        : "Delivering high-quality services and products that strengthen our clients' brand identity."
    }
  ];

  const features = isAr
    ? ["جودة مضمونة", "تسليم في الوقت المحدد", "حلول إبداعية", "دعم فني متكامل"]
    : ["Guaranteed Quality", "On-time Delivery", "Creative Solutions", "Full Support"];

  return (
    <section id="about" className="py-32 bg-(--background) relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-[#F58220]/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* Left: Visual Story */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="relative aspect-square md:aspect-4/3 lg:aspect-square overflow-hidden rounded-sm group">
              <Image
                src="/image3.jpeg"
                alt="BTH Office"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 w-full h-full"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating Experience Badge */}
              <div className="absolute bottom-8 inset-e-8 bg-[#F58220] p-6 text-white shadow-2xl">
                <div className="text-4xl font-black leading-none">15+</div>
                <div className="text-[10px] font-bold uppercase tracking-widest mt-1">
                  {isAr ? "عاماً من التميز" : "Years of Excellence"}
                </div>
              </div>
            </div>

            {/* Pillar Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pillars.map((pillar, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="glass-card hover:border-[#F58220]/50 transition-all text-start p-8"
                >
                  <pillar.icon className="w-8 h-8 text-[#F58220] mb-6" />
                  <h4 className="text-white font-black text-sm uppercase tracking-widest mb-3">{pillar.title}</h4>
                  <p className="text-white/40 text-xs leading-relaxed">{pillar.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Detailed Content */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-start"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[#F58220] text-3xl md:text-5xl font-black uppercase tracking-tight">
                {isAr ? "قصتنا ومنهجنا" : "Our Story & Approach"}
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-black text-white/50 mb-10 leading-tight">
              {t.title}
            </h2>

            <div className="space-y-8 text-white/60 text-lg leading-relaxed mb-12">
              <p className="font-bold text-white/90">{t.description_1}</p>
              <div className="h-px w-20 bg-[#F58220]/30 my-8" />
              <p className="text-base leading-relaxed">{t.description_2}</p>
            </div>

            {/* Key Features List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-16">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#F58220] shrink-0" />
                  <span className="text-white/80 text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/5">
              {[
                { value: "500+", label: isAr ? "عميل" : "Clients" },
                { value: "1.2k+", label: isAr ? "مشروع" : "Projects" },
                { value: "100%", label: isAr ? "رضا" : "Satisfaction" },
              ].map((s, i) => (
                <div key={i} className="text-start">
                  <div className="text-3xl font-black text-white mb-1">{s.value}</div>
                  <div className="text-[#F58220] text-[10px] font-bold uppercase tracking-[0.2em]">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Trust Statement */}
            <div className="mt-16 p-6 border-s-2 border-[#F58220] bg-[#F58220]/5 flex items-center gap-6 text-start">
              <Shield className="w-10 h-10 text-[#F58220] shrink-0" />
              <p className="text-white/40 text-xs leading-relaxed">
                {isAr
                  ? "تلتزم BTH/بث بأداء أعمالها اليومية حسب الأنظمة الداخلية والخطط المتبعة لضمان جودة المنتجات والخدمات في إطار زمني محدد يحقق رضا العملاء."
                  : "BTH is committed to performing its daily operations according to internal systems and plans to ensure the quality of products and services."}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
