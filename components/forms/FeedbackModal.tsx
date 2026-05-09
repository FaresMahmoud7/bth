"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/constants/content";
import { useState } from "react";
import { Send, CheckCircle2, Loader2, AlertTriangle, Lightbulb, X } from "lucide-react";
import { submitFeedback } from "@/actions/feedback";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FeedbackModal = ({ isOpen, onClose }: FeedbackModalProps) => {
  const { locale } = useLanguage();
  const t = content[locale].feedback;
  const isAr = locale === "ar";
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [type, setType] = useState<"complaint" | "suggestion">("suggestion");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
      type: type,
    };

    const result = await submitFeedback(data);
    
    if (result.success) {
      setIsSuccess(true);
      
      const whatsappNumber = content[locale].contact.phone;
      const text = `*${type === 'complaint' ? t.complaint : t.suggestion}*\n\n` +
                   `*${t.name}:* ${data.name}\n` +
                   `*${t.phone}:* ${data.phone}\n` +
                   `*${t.message}:*\n${data.message}`;
      
      const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\s+/g, '')}?text=${encodeURIComponent(text)}`;
      
      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
        setIsSuccess(false);
        onClose();
        setIsSubmitting(false);
      }, 2000);
    } else {
      setIsSubmitting(false);
      alert("Error sending feedback. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-(--surface) border border-(--border) w-full max-w-2xl rounded-3xl overflow-hidden relative shadow-2xl"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <div className="text-start">
                <h3 className="text-2xl font-black text-white">{t.title}</h3>
                <p className="text-white/40 text-sm mt-1">{t.subtitle}</p>
              </div>
              <button 
                onClick={onClose}
                title={isAr ? "إغلاق" : "Close"}
                aria-label={isAr ? "إغلاق النافذة" : "Close modal"}
                className="p-2 text-white/20 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-8 max-h-[70vh] overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Feedback Type Selector */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setType("suggestion")}
                    className={`flex-1 p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${type === "suggestion" ? 'border-[#F58220] bg-[#F58220]/10 text-[#F58220]' : 'border-white/5 bg-white/5 text-white/20 hover:border-white/10'}`}
                  >
                    <Lightbulb className="w-8 h-8" />
                    <span className="font-bold uppercase tracking-widest text-[10px]">{t.suggestion}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setType("complaint")}
                    className={`flex-1 p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${type === "complaint" ? 'border-[#F58220] bg-[#F58220]/10 text-[#F58220]' : 'border-white/5 bg-white/5 text-white/20 hover:border-white/10'}`}
                  >
                    <AlertTriangle className="w-8 h-8" />
                    <span className="font-bold uppercase tracking-widest text-[10px]">{t.complaint}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-white/40 mb-3 uppercase tracking-widest">{t.name}</label>
                    <input 
                      name="name" 
                      required 
                      type="text" 
                      minLength={3}
                      maxLength={50}
                      placeholder={isAr ? "الاسم بالكامل" : "Full Name"}
                      className="w-full h-14 px-5 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-[#F58220] transition-all text-white placeholder:text-white/10" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-white/40 mb-3 uppercase tracking-widest">{t.phone}</label>
                    <input 
                      name="phone" 
                      required 
                      type="tel" 
                      pattern="05[0-9]{8}"
                      title={isAr ? "يرجى إدخال رقم جوال سعودي صحيح يبدأ بـ 05 ويتكون من 10 أرقام" : "Please enter a valid Saudi mobile number starting with 05 (10 digits)"}
                      placeholder="05xxxxxxx"
                      className="w-full h-14 px-5 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-[#F58220] transition-all text-white placeholder:text-white/10" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold text-white/40 mb-3 uppercase tracking-widest">{t.message}</label>
                    <textarea 
                      name="message" 
                      required 
                      minLength={10}
                      maxLength={1000}
                      rows={4}
                      placeholder={isAr ? "اكتب ملاحظاتك هنا..." : "Your message..."}
                      className="w-full p-5 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-[#F58220] transition-all text-white placeholder:text-white/10 resize-none" 
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className={`w-full h-16 rounded-full font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${isSuccess ? 'bg-green-600 text-white' : 'glow-button-primary'}`}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : isSuccess ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      {t.success}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t.submit}
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
