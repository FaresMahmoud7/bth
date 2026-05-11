"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useRef } from "react";

export const ClientsMarquee = () => {
  const { locale } = useLanguage();
  const isAr = locale === "ar";
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="clients" ref={containerRef} className="pt-12 pb-24 bg-(--surface) border-y border-(--border) overflow-hidden">
      
      {/* Marquee display removed */}

      <div className="container mx-auto px-6">
        <div className="mb-12 text-center flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-white mb-6"
          >
            {isAr ? "شركاؤنا وعملاؤنا" : "Trusted Partners & Clients"}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <div className="w-12 h-px bg-[#F58220]" />
            <span className={`text-[#F58220] text-lg md:text-xl font-bold uppercase ${isAr ? 'tracking-normal' : 'tracking-[0.3em]'}`}>
              {isAr ? "نعتز بثقتكم" : "We Value Your Trust"}
            </span>
            <div className="w-12 h-px bg-[#F58220]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto glass-card p-10 md:p-16 border border-[#F58220]/20 bg-[#F58220]/5 relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#F58220]/10 blur-[100px] pointer-events-none" />
            
            <div className="relative z-10">
              <p className={`text-white text-xl md:text-3xl leading-relaxed font-bold ${isAr ? 'font-cairo' : ''}`}>
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
              
              <div className="mt-10 flex items-center justify-center gap-6">
                <div className="h-px w-12 bg-white/10" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
                  {isAr ? "مؤسسة BTH" : "BTH EST"}
                </span>
                <div className="h-px w-12 bg-white/10" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

