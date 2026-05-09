"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";

import { useState } from "react";
import { PhoneSelectionModal } from "@/components/forms/PhoneSelectionModal";

export const CtaBanner = () => {
  const { locale } = useLanguage();
  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);

  return (
    <section className="relative py-32 overflow-hidden bg-(--background)">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1920&q=80"
          alt="Start your project"
          fill
          className="object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-(--background)/60" />
        <div className="absolute inset-0 bg-linear-to-r from-(--background) via-transparent to-(--background)" />
      </div>

      {/* Orange accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#F58220]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#F58220]/40 to-transparent" />

      <div className={`relative z-10 container mx-auto px-6 text-center`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-[#F58220] text-xs font-bold uppercase tracking-[0.4em] mb-6">
            {isAr ? "ابدأ مشروعك اليوم" : "Start Your Project Today"}
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            {isAr
              ? "هل أنت مستعد لرفع مستوى علامتك التجارية؟"
              : "Ready to Elevate Your Brand?"}
          </h2>
          <p className="text-white/40 text-lg mb-12 max-w-xl mx-auto">
            {isAr
              ? "تواصل معنا الآن واحصل على استشارة مجانية لمشروعك القادم مع فريق BTH المتخصص."
              : "Get in touch for a free consultation on your next project with BTH's specialized team."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#contact"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 glow-button-primary font-bold text-sm uppercase tracking-widest"
            >
              {isAr ? "تواصل معنا الآن" : "Contact Us Now"}
              <Arrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={() => setIsPhoneOpen(true)}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 border border-white/20 text-white font-bold text-sm uppercase tracking-widest hover:border-[#F58220]/60 hover:text-[#F58220] transition-colors cursor-pointer"
            >
              {isAr ? "اتصل بنا مباشرة" : "Call Us Directly"}
            </button>
          </div>
        </motion.div>
      </div>

      <PhoneSelectionModal isOpen={isPhoneOpen} onClose={() => setIsPhoneOpen(false)} />
    </section>
  );
};
