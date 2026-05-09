"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/constants/content";
import { useState } from "react";
import { ArrowRight, ArrowLeft, MessageSquare, CheckCircle2, Loader2, X } from "lucide-react";
import { saveInquiry } from "../../actions/inquiry";
import Image from "next/image";

interface ServiceItem {
  title: string;
  description: string;
  images: string[];
}

interface ProjectItem {
  title: string;
  image: string;
}

interface ExpertiseCategory {
  name: string;
  services: ServiceItem[];
  projects: ProjectItem[];
}

interface ExpertiseContent {
  title: string;
  subtitle: string;
  categories: ExpertiseCategory[];
}

interface ContactData {
  mobiles: string[];
  title: string;
  subtitle: string;
  address: string;
  phone: string;
  email: string;
}

export const Expertise = () => {
  const { locale } = useLanguage();
  const isAr = locale === "ar";
  const expertiseData = (content[locale] as { expertise: ExpertiseContent }).expertise;
  const contactData = (content[locale] as { contact: ContactData }).contact;
  const t = expertiseData;

  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showInquiryForm, setShowInquiryForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string || "N/A";
    const serviceName = selectedService?.title || "";

    const result = await saveInquiry({
      name,
      phone,
      email: email === "N/A" ? undefined : email,
      productName: serviceName,
    });

    if (result.success) {
      setIsSuccess(true);
      
      // WhatsApp Redirection
      const whatsappNumber = contactData.mobiles[0].replace(/\s/g, ''); // Use first mobile
      const message = isAr 
        ? `مرحباً، أود الاستفسار عن خدمة: ${serviceName}\n\nبياناتي:\nالاسم: ${name}\nالجوال: ${phone}\nالبريد: ${email}`
        : `Hello, I'd like to inquire about: ${serviceName}\n\nMy Details:\nName: ${name}\nPhone: ${phone}\nEmail: ${email}`;
      
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        setIsSuccess(false);
        setSelectedService(null);
        setShowInquiryForm(false);
        setIsSubmitting(false);
      }, 1500);
    } else {
      setIsSubmitting(false);
    }
  };

  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const category = t.categories[activeCategory];

  return (
    <section id="expertise" className="py-32 bg-(--background)">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-20 text-start">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[#F58220] text-3xl md:text-5xl font-black uppercase tracking-tight">
                {isAr ? "خدماتنا وأعمالنا" : "Services & Portfolio"}
              </span>
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl font-black text-white/50 mb-4 leading-tight"
          >
            {t.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/40 text-lg max-w-2xl"
          >
            {t.subtitle}
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-16">
          {t.categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveCategory(i)}
              className={`px-6 py-3 text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                activeCategory === i
                  ? "bg-[#F58220] text-white"
                  : "border border-white/10 text-white/40 hover:border-[#F58220]/50 hover:text-white"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Content: Services + Projects Side by Side */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
        >
          {/* LEFT: Services List */}
          <div>
            <h3 className="text-white/30 text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-start">
              {isAr ? "الخدمات" : "Services"}
            </h3>
            <div className="space-y-px">
              {category.services.map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="group flex items-start justify-between gap-6 p-6 glass-card hover:border-[#F58220]/30 transition-all cursor-pointer text-start"
                  onClick={() => {
                    setSelectedService(service);
                    setShowInquiryForm(false);
                  }}
                >
                  <div className="flex-1">
                    <h4 className="text-white font-bold text-lg mb-1 group-hover:text-[#F58220] transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-white/30 text-sm line-clamp-1">{service.description}</p>
                  </div>
                  <button className="shrink-0 flex items-center gap-2 text-[#F58220] text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity mt-1 whitespace-nowrap">
                    {isAr ? "عرض التفاصيل" : "View Details"}
                    <Arrow className="w-3 h-3" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: Projects Gallery */}
          <div>
            <h3 className="text-white/30 text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-start">
              {isAr ? "مشاريع منجزة" : "Featured Projects"}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {category.projects.map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative aspect-square overflow-hidden glass-card card-hover cursor-pointer"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-bold text-sm">{project.title}</p>
                    <p className="text-[#F58220] text-xs uppercase tracking-wider mt-1">{category.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Service Details & Inquiry Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass-card w-full max-w-4xl relative overflow-hidden"
            >
               <button
                 onClick={() => setSelectedService(null)}
                 title={isAr ? "إغلاق" : "Close"}
                 aria-label={isAr ? "إغلاق النافذة" : "Close modal"}
                 className="absolute top-6 right-6 z-20 p-2 bg-black/50 text-white/50 hover:text-white transition-colors rounded-full"
               >
                 <X className="w-5 h-5" />
               </button>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Images Section */}
                <div className="bg-(--surface) p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/5">
                  <div className="space-y-6">
                    {selectedService.images.map((img, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.2 }}
                        className="relative aspect-video overflow-hidden rounded-sm"
                      >
                        <Image src={img} alt={selectedService.title} fill className="object-cover" />
                      </motion.div>
                    ))}
                    {selectedService.images.length === 0 && (
                       <div className="aspect-video bg-white/5 flex items-center justify-center text-white/10 uppercase tracking-widest text-xs">
                         No Images Available
                       </div>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 lg:p-12 flex flex-col">
                  {!showInquiryForm ? (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex-1 flex flex-col justify-center text-start"
                    >
                      <span className="text-[#F58220] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                        {category.name}
                      </span>
                      <h3 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                        {selectedService.title}
                      </h3>
                      <p className="text-white/40 text-lg leading-relaxed mb-10">
                        {selectedService.description}
                      </p>
                      <button
                        onClick={() => setShowInquiryForm(true)}
                        className="w-full py-5 glow-button-primary font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-4"
                      >
                        <MessageSquare className="w-5 h-5" />
                        {isAr ? "استفسار الآن" : "Inquire Now"}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex-1 flex flex-col justify-center text-start"
                    >
                      <div className="mb-8">
                        <h3 className="text-2xl font-black text-white mb-2">{isAr ? "طلب تسعيره" : "Request a Quote"}</h3>
                        <p className="text-white/30 text-sm">{isAr ? "يرجى ملء البيانات للتواصل معك عبر واتساب" : "Please fill in your details to connect via WhatsApp"}</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                          <label className="block text-white/40 text-[10px] font-bold uppercase tracking-wider mb-2">{isAr ? "الاسم *" : "Full Name *"}</label>
                          <input
                            name="name" required type="text"
                            minLength={3}
                            maxLength={50}
                            placeholder={isAr ? "اسمك الكريم" : "Your name"}
                            className="w-full px-5 py-4 bg-white/5 border border-white/10 text-white placeholder:text-white/10 focus:border-[#F58220] outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-white/40 text-[10px] font-bold uppercase tracking-wider mb-2">{isAr ? "رقم الجوال *" : "Phone Number *"}</label>
                          <input
                            name="phone" required type="tel"
                            pattern="05[0-9]{8}"
                            title={isAr ? "يرجى إدخال رقم جوال سعودي صحيح يبدأ بـ 05 ويتكون من 10 أرقام" : "Please enter a valid Saudi mobile number starting with 05 (10 digits)"}
                            placeholder="05xxxxxxx"
                            className="w-full px-5 py-4 bg-white/5 border border-white/10 text-white placeholder:text-white/10 focus:border-[#F58220] outline-none transition-colors"
                          />
                        </div>
                        <div className="pt-4">
                          <button
                            type="submit"
                            disabled={isSubmitting || isSuccess}
                            className={`w-full py-5 font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all ${
                              isSuccess ? "bg-green-600 text-white" : "glow-button-primary"
                            }`}
                          >
                            {isSubmitting ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                            ) : isSuccess ? (
                              <><CheckCircle2 className="w-5 h-5" />{isAr ? "جاري التحويل..." : "Redirecting..."}</>
                            ) : (
                              <><MessageSquare className="w-5 h-5" />{isAr ? "تواصل عبر واتساب" : "Connect via WhatsApp"}</>
                            )}
                          </button>
                          <button 
                            type="button"
                            onClick={() => setShowInquiryForm(false)}
                            className="w-full mt-4 text-white/20 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors"
                          >
                            {isAr ? "العودة للتفاصيل" : "Back to details"}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
