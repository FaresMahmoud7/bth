"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { GlobalMarquee } from "../layout/GlobalMarquee";

export const ClientsMarquee = () => {
  const { locale } = useLanguage();
  const isAr = locale === "ar";

  return (
    <section id="clients" className="pt-32 pb-40 bg-[#051424] border-y border-white/5 overflow-hidden relative">
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#F58220]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#F58220]/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Marquee Banners */}
      <div className="mb-20 w-full">
        <GlobalMarquee />
      </div>

      {/* Title Section */}
      <div className="container mx-auto px-6 mb-16 relative z-10">
        <div className="text-center flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter"
          >
            {isAr ? "شركاؤنا وعملاؤنا" : "Our Trusted Clients"}
          </motion.h2>
          <div className="flex items-center justify-center gap-3 md:gap-6 w-full px-4 overflow-hidden">
            <div className="w-8 md:w-16 h-px bg-[#F58220]/50 shrink-0" />
            <span className="text-[#F58220] text-lg md:text-2xl font-bold uppercase tracking-wider md:tracking-[0.3em] font-montserrat whitespace-nowrap">
              {isAr ? "نعتز بثقتكم" : "We Value Your Trust"}
            </span>
            <div className="w-8 md:w-16 h-px bg-[#F58220]/50 shrink-0" />
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto glass-card p-12 md:p-20 border border-white/10 bg-white/3 relative overflow-hidden rounded-[3rem]"
        >
          <div className="relative z-10 text-center">
            <p className="text-white text-2xl md:text-4xl leading-relaxed font-bold font-cairo">
              {isAr ? (
                <>
                  &quot;نحن في بث الخليجية نفخر بشراكتنا مع هذه النخبة من الشركات التي وضعت ثقتها فينا. إن نزاهة التعامل وأصالة الشراكة هي ما يجمعنا بكم، ونعتز بكوننا جزءاً من نجاحاتكم المستمرة. <span className="text-[#F58220]">شراكة تفخر بها الأجيال، وعلاقات بنيت على الصدق والاحترافية.</span>&quot;
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
