"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/constants/content";
import { Mail, Phone, MapPin, ArrowRight, ArrowLeft, MessageSquare, UserCircle2, Sparkles, LucideIcon } from "lucide-react";
import Link from "next/link";

interface ContactDetail {
  title: string;
  value: string;
  icon: LucideIcon;
  type: 'whatsapp' | 'call' | 'link' | 'text';
  number?: string;
  link?: string;
  isFemale?: boolean;
}

export const Contact = () => {
  const { locale } = useLanguage();
  const t = content[locale].contact;
  const isAr = locale === "ar";

  const contactDetails: ContactDetail[] = [
    {
      title: isAr ? "قسم السيدات" : "Ladies Section",
      value: "050 064 4733",
      icon: UserCircle2,
      type: 'whatsapp',
      number: "966500644733",
      isFemale: true,
    },
    {
      title: isAr ? "الجوال (1)" : "Mobile (1)",
      value: "053 522 5592",
      icon: Phone,
      type: 'whatsapp',
      number: "966535225592",
    },
    {
      title: isAr ? "الجوال (2)" : "Mobile (2)",
      value: "053 358 4880",
      icon: Phone,
      type: 'whatsapp',
      number: "966533584880",
    },
    {
      title: isAr ? "هاتف المكتب" : "Office Phone",
      value: "013 361 7027",
      icon: Phone,
      type: 'call',
      number: "0133617027",
    },
    {
      title: isAr ? "الموقع" : "Location",
      value: isAr ? "الجبيل، المملكة العربية السعودية" : "Jubail, Saudi Arabia",
      icon: MapPin,
      type: 'text',
    },
    {
      title: isAr ? "البريد الإلكتروني" : "Email",
      value: t.email,
      icon: Mail,
      type: 'link',
      link: `mailto:${t.email}`,
    },
  ];


  const Arrow = isAr ? ArrowLeft : ArrowRight;

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
              {/* Ladies Badge */}
              {detail.isFemale && (
                <div className={`absolute top-0 right-0 bg-[#F58220] px-4 py-1 text-[8px] font-black text-white uppercase flex items-center gap-2 ${isAr ? 'tracking-normal' : 'tracking-widest'}`}>
                  <Sparkles size={10} />
                  {isAr ? "خاص بالسيدات فقط" : "Ladies Only"}
                </div>
              )}

              <div className={`w-14 h-14 border flex items-center justify-center mb-8 transition-all ${
                detail.isFemale 
                  ? 'bg-[#F58220] border-[#F58220] text-white' 
                  : 'border-white/10 group-hover:bg-[#F58220]/10 group-hover:border-[#F58220]/30 text-[#F58220]'
              }`}>
                <detail.icon className="w-6 h-6" />
              </div>

              <h3 className={`text-[10px] font-black uppercase mb-2 ${
                detail.isFemale ? 'text-[#F58220]' : 'text-white/30'
              } ${isAr ? 'tracking-normal' : 'tracking-[0.2em]'}`}>{detail.title}</h3>
              
              <p className="text-white font-bold text-xl mb-8 grow" dir="ltr">{detail.value}</p>
              
              {detail.type === 'whatsapp' ? (
                <Link 
                  href={`https://wa.me/${detail.number}`}
                  target="_blank"
                  className={`inline-flex items-center gap-3 font-bold text-[10px] uppercase hover:gap-5 transition-all group/link ${
                    detail.isFemale ? 'text-white' : 'text-[#F58220]'
                  } ${isAr ? 'tracking-normal' : 'tracking-widest'}`}
                >
                  <MessageSquare className="w-4 h-4" />
                  {isAr ? "تواصل الآن (واتساب)" : "Message Now (WhatsApp)"}
                  <Arrow className="w-4 h-4" />
                </Link>
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

              {/* Special Ladies Glow Effect */}
              {detail.isFemale && (
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#F58220]/20 blur-[100px] pointer-events-none" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
