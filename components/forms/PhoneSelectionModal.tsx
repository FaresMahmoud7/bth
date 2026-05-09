"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/constants/content";
import { Phone, X, User } from "lucide-react";

interface PhoneSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhoneSelectionModal = ({ isOpen, onClose }: PhoneSelectionModalProps) => {
  const { locale } = useLanguage();
  const t = content[locale].contact;
  const isAr = locale === "ar";

  const numbers = [
    { label: t.phone_title, number: t.phone, icon: Phone },
    ...t.mobiles.map((m, i) => ({ label: `${t.mobile_title} ${i + 1}`, number: m, icon: Phone })),
    { label: t.female_contact_title, number: t.female_contact, icon: User },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="glass-card w-full max-w-md overflow-hidden relative shadow-2xl"
          >
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-xl font-black text-white text-start">
                {isAr ? "اختر رقم الاتصال" : "Select a Number"}
              </h3>
              <button 
                onClick={onClose} 
                title={isAr ? "إغلاق" : "Close"}
                aria-label={isAr ? "إغلاق النافذة" : "Close modal"}
                className="p-2 text-white/20 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3">
              {numbers.map((item, i) => (
                <a
                  key={i}
                  href={`tel:${item.number.replace(/\s+/g, '')}`}
                  className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 hover:border-[#F58220]/50 hover:bg-[#F58220]/10 transition-all rounded-2xl group text-start"
                >
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-[#F58220] transition-colors">
                    <item.icon className="w-5 h-5 text-[#F58220] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-lg font-bold text-white group-hover:text-[#F58220] transition-colors">{item.number}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
