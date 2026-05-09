"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

interface ClientsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClientsModal = ({ isOpen, onClose }: ClientsModalProps) => {
  const { locale } = useLanguage();
  const isAr = locale === "ar";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-100"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-10 z-101 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-(--surface) w-full max-w-4xl h-full max-h-[80vh] border border-(--border) shadow-2xl relative overflow-hidden pointer-events-auto flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-(--border) flex items-center justify-between bg-(--surface)/50 backdrop-blur-md sticky top-0 z-10">
                <div className={`flex items-center gap-3 ${isAr ? "flex-row-reverse" : ""}`}>
                  <div className="w-1.5 h-6 bg-[#C9A84C]" />
                  <h3 className="text-xl font-black text-white">
                    {isAr ? "قائمة عملاؤنا" : "Our Clients List"}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  aria-label={isAr ? "إغلاق" : "Close"}
                  className="p-2 hover:bg-white/5 text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-white flex items-center justify-center">
                <div className="relative w-full aspect-3/4 md:aspect-4/3 max-w-2xl">
                  {/* Assuming the image is named clients-list.jpg in public/images */}
                  <Image
                    src="/images/clients-list.webp"
                    alt="BTH Clients"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-(--border) bg-(--surface)/50 text-center">
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
                  {isAr ? "فخورون بخدمة نخبة من الشركات الرائدة" : "Proud to serve leading industry names"}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
