"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/constants/content";
import { Mail, Phone, MapPin, ArrowRight, ArrowLeft, MessageSquare, Sparkles, LucideIcon } from "lucide-react";
import Link from "next/link";

interface ContactDetail {
  title: string;
  value: string;
  icon: LucideIcon;
  type: 'whatsapp' | 'call' | 'link' | 'text';
  number?: string;
  link?: string;
  isFemale?: boolean;
  badge?: string;
}

export const Contact = () => {
  const { locale } = useLanguage();
  const t = content[locale].contact;
  const isAr = locale === "ar";

  const contactDetails: ContactDetail[] = [
    {
      title: isAr ? "رقم الشكاوي" : "Complaints Number",
      value: "054 846 6466",
      icon: MessageSquare,
      type: 'whatsapp',
      number: "966548466466",
      isFemale: false, // Changed from true
    },
    {
      title: isAr ? "الجوال (1)" : "Mobile (1)",
      value: "050 591 2477",
      icon: Phone,
      type: 'whatsapp',
      number: "966505912477",
      badge: isAr ? "خدمة العملاء بالعربية" : "Customer Service (AR)",
    },
    {
      title: isAr ? "الجوال (2)" : "Mobile (2)",
      value: "056 629 6262",
      icon: Phone,
      type: 'whatsapp',
      number: "966566296262",
      badge: isAr ? "خدمة العملاء بالإنجليزية" : "Customer Service (EN)",
    },
    {
      title: isAr ? "هاتف المكتب" : "Office Phone",
      value: "013 346 3811",
      icon: Phone,
      type: 'call',
      number: "0133463811",
    },
    {
      title: isAr ? "الموقع" : "Location",
      value: t.address,
      icon: MapPin,
      type: 'text',
    },
    {
      title: isAr ? "البريد الإلكتروني" : "Email",
      value: t.email,
      icon: Mail,
      type: 'link',
      link: `https://mail.google.com/mail/?view=cm&fs=1&to=${t.email}`,
    },
  ];


  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const handleWhatsApp = (detail: ContactDetail) => {
    if (!detail.number) return;
    const greeting = isAr
      ? `السلام عليكم،\nأتواصل معكم عبر الموقع الإلكتروني لشركة BTH.\n\n*الخدمة:* ${detail.title}\n*الرقم:* ${detail.value}\n\n_أرجو التواصل معي في أقرب وقت._`
      : `Hello,\nI am reaching out via the BTH website.\n\n*Channel:* ${detail.title}\n*Number:* ${detail.value}\n\n_Please contact me at your earliest convenience._`;
    const waUrl = `https://wa.me/${detail.number}?text=${encodeURIComponent(greeting)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-(--background)">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-24 text-center flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-white mb-8"
          >
            {isAr ? "تواصل معنا" : "Contact Us"}
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4"
          >
            <div className="w-12 h-px bg-[#F58220]" />
            <span className={`text-[#F58220] text-lg md:text-xl font-bold uppercase ${isAr ? 'tracking-normal' : 'tracking-[0.3em]'}`}>
              {isAr ? "قم بزيارتنا أو تواصل معنا عبر أي من قنواتنا" : "Visit Us or Reach Out via Our Channels"}
            </span>
            <div className="w-12 h-px bg-[#F58220]" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contactDetails.map((detail, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-10 group transition-all text-start flex flex-col h-full relative overflow-hidden ${
                detail.isFemale 
                  ? 'border-[#F58220] bg-[#F58220]/10 ring-1 ring-[#F58220]/20' 
                  : 'hover:border-[#F58220]/50'
              }`}
            >

              {/* Custom Badge */}
              {detail.badge && (
                <div className={`absolute top-0 right-0 bg-white/10 backdrop-blur-md px-4 py-1 text-[10px] md:text-xs font-black text-white uppercase flex items-center gap-2 ${isAr ? 'tracking-normal' : 'tracking-widest'}`}>
                  <Sparkles size={10} className="text-[#F58220]" />
                  {detail.badge}
                </div>
              )}

              <div className={`border flex items-center justify-center mb-8 transition-all ${
                detail.title === (isAr ? "رقم الشكاوي" : "Complaints Number")
                  ? 'w-20 h-20 bg-[#F58220]/20 border-[#F58220] text-[#F58220]'
                  : detail.isFemale 
                    ? 'w-14 h-14 bg-[#F58220] border-[#F58220] text-white' 
                    : 'w-14 h-14 border-white/10 group-hover:bg-[#F58220]/10 group-hover:border-[#F58220]/30 text-[#F58220]'
              }`}>
                <detail.icon className={detail.title === (isAr ? "رقم الشكاوي" : "Complaints Number") ? "w-10 h-10" : "w-6 h-6"} />
              </div>

              <h3 className={`font-black uppercase mb-2 ${
                detail.title === (isAr ? "رقم الشكاوي" : "Complaints Number") ? 'text-lg md:text-xl' : 'text-[10px]'
              } ${
                detail.isFemale ? 'text-[#F58220]' : (detail.title === (isAr ? "رقم الشكاوي" : "Complaints Number") ? 'text-white' : 'text-white/30')
              } ${isAr ? 'tracking-normal' : 'tracking-[0.2em]'}`}>{detail.title}</h3>
              
              <p className={`text-white font-bold mb-8 grow ${detail.title === (isAr ? "رقم الشكاوي" : "Complaints Number") ? "text-3xl md:text-4xl text-[#F58220]" : "text-2xl"}`} dir="ltr">{detail.value}</p>
              
              {detail.type === 'whatsapp' ? (
                <button 
                  onClick={() => handleWhatsApp(detail)}
                  className={`inline-flex items-center gap-3 font-bold text-[10px] uppercase hover:gap-5 transition-all group/link cursor-pointer ${
                    detail.isFemale ? 'text-white' : 'text-[#F58220]'
                  } ${isAr ? 'tracking-normal' : 'tracking-widest'}`}
                >
                  <MessageSquare className="w-4 h-4" />
                  {isAr ? "تواصل الآن (واتساب)" : "Message Now (WhatsApp)"}
                  <Arrow className="w-4 h-4" />
                </button>
              ) : detail.type === 'call' ? (
                <Link 
                  href={`tel:${detail.number}`}
                  className={`inline-flex items-center gap-3 text-[#F58220] font-bold text-[10px] uppercase hover:gap-5 transition-all group/link ${isAr ? 'tracking-normal' : 'tracking-widest'}`}
                >
                  <Phone className="w-4 h-4" />
                  {isAr ? "اتصل الآن" : "Call Now"}
                  <Arrow className="w-4 h-4" />
                </Link>
              ) : detail.type === 'link' ? (
                <Link 
                  href={detail.link || "#"}
                  target={detail.link?.startsWith('http') ? "_blank" : undefined}
                  className={`inline-flex items-center gap-3 text-[#F58220] font-bold text-[10px] uppercase hover:gap-5 transition-all group/link ${isAr ? 'tracking-normal' : 'tracking-widest'}`}
                >
                  {isAr ? "استعراض" : "View Details"}
                  <Arrow className="w-4 h-4" />
                </Link>
              ) : (
                <div className={`flex items-center gap-2 text-white/20 text-[10px] font-black uppercase ${isAr ? 'tracking-normal' : 'tracking-widest'}`}>
                  <MapPin size={12} />
                  {isAr ? "المقر الرئيسي" : "Headquarters"}
                </div>
              )}

              {/* Special Glow Effect */}
              {detail.title === (isAr ? "رقم الشكاوي" : "Complaints Number") && (
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#F58220]/20 blur-[100px] pointer-events-none" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
