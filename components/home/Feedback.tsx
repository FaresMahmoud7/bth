"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/constants/content";
import { useState } from "react";
import { Send, CheckCircle2, Loader2, AlertTriangle, Lightbulb } from "lucide-react";
import { submitFeedback } from "@/actions/feedback";

export const Feedback = () => {
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
      
      // WhatsApp redirect
      const whatsappNumber = content[locale].contact.female_contact; // Using the complaints number
      const text = `*${type === 'complaint' ? t.complaint : t.suggestion}*\n\n` +
                   `*${t.name}:* ${data.name}\n` +
                   `*${t.phone}:* ${data.phone}\n` +
                   `*${t.message}:*\n${data.message}`;
      
      const whatsappUrl = `https://wa.me/966${whatsappNumber.replace(/\s+/g, '').replace(/^0/, '')}?text=${encodeURIComponent(text)}`;
      
      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
        setIsSuccess(false);
        (e.target as HTMLFormElement).reset();
        setIsSubmitting(false);
      }, 2000);
    } else {
      setIsSubmitting(false);
      alert("Error sending feedback. Please try again.");
    }
  };

  return (
    <section id="feedback" className="py-32 bg-[#020617] relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
            >
              {isAr ? "شاركنا رأيك" : "Your Voice Matters"}
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black mb-6 text-white"
            >
              {t.title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-white/40 text-lg"
            >
              {t.subtitle}
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white/5 p-8 md:p-16 rounded-[3rem] shadow-2xl shadow-black/50 border border-white/10 backdrop-blur-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Feedback Type Selector */}
                <div className="md:col-span-2 flex gap-6">
                  <button
                    type="button"
                    onClick={() => setType("suggestion")}
                    className={`flex-1 p-8 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 ${type === "suggestion" ? 'border-primary bg-primary/10 text-primary' : 'border-white/5 bg-white/5 text-white/20 hover:border-white/10'}`}
                  >
                    <Lightbulb className="w-10 h-10" />
                    <span className="font-bold uppercase tracking-widest text-xs">{t.suggestion}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setType("complaint")}
                    className={`flex-1 p-8 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 ${type === "complaint" ? 'border-primary bg-primary/10 text-primary' : 'border-white/5 bg-white/5 text-white/20 hover:border-white/10'}`}
                  >
                    <AlertTriangle className="w-10 h-10" />
                    <span className="font-bold uppercase tracking-widest text-xs">{t.complaint}</span>
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-bold text-white/40 mb-4 uppercase tracking-widest">{t.name}</label>
                  <input 
                    name="name" 
                    required 
                    type="text" 
                    placeholder={isAr ? "أدخل اسمك الكامل" : "Enter your full name"}
                    className="w-full h-16 px-6 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-primary transition-all text-lg text-white placeholder:text-white/10 shadow-sm" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-white/40 mb-4 uppercase tracking-widest">{t.phone}</label>
                  <input 
                    name="phone" 
                    required 
                    type="tel" 
                    placeholder="05xxxxxxx"
                    className="w-full h-16 px-6 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-primary transition-all text-lg text-white placeholder:text-white/10 shadow-sm" 
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-white/40 mb-4 uppercase tracking-widest">{t.message}</label>
                  <textarea 
                    name="message" 
                    required 
                    rows={5}
                    placeholder={isAr ? "اكتب ملاحظاتك هنا..." : "Write your feedback here..."}
                    className="w-full p-6 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-primary transition-all text-lg text-white placeholder:text-white/10 resize-none shadow-sm" 
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting || isSuccess}
                className={`w-full h-20 rounded-full font-black text-xl flex items-center justify-center gap-4 transition-all shadow-xl ${isSuccess ? 'bg-green-600 text-white' : 'bg-primary text-black hover:scale-105 shadow-primary/20'}`}
              >
                {isSubmitting ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 className="w-6 h-6" />
                    {t.success}
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6" />
                    {t.submit}
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
