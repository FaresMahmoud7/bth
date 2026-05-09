"use client";

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { content } from '@/constants/content';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { FeedbackModal } from '@/components/forms/FeedbackModal';
import { Logo } from '@/components/ui/Logo';

export const Footer = () => {
  const { locale } = useLanguage();
  const t = content[locale].footer;
  const isAr = locale === "ar";
  const [activePolicy, setActivePolicy] = useState<"privacy" | "terms" | null>(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const policies = {
    privacy: {
      title: isAr ? "سياسة الخصوصية" : "Privacy Policy",
      content: isAr 
        ? "نحن في BTH نلتزم بحماية خصوصيتك. نقوم بجمع المعلومات اللازمة فقط لتقديم خدماتنا الإعلانية. لا نقوم بمشاركة بياناتك مع أطراف ثالثة دون موافقتك. نستخدم تقنيات تشفير متطورة لضمان أمن معلوماتك."
        : "At BTH, we are committed to protecting your privacy. We collect only the information necessary to provide our advertising services. We do not share your data with third parties without your consent. We use advanced encryption to ensure the security of your information."
    },
    terms: {
      title: isAr ? "الشروط والأحكام" : "Terms & Conditions",
      content: isAr
        ? "باستخدامك لخدماتنا، فإنك توافق على شروطنا. جميع التصاميم والأعمال الفنية هي ملك لشركة BTH حتى يتم سداد كامل المستحقات. نلتزم بمواعيد التسليم المتفق عليها شريطة توفر جميع المتطلبات من العميل. تخضع جميع النزاعات لقوانين المملكة العربية السعودية."
        : "By using our services, you agree to our terms. All designs and artworks remain the property of BTH until full payment is received. We commit to agreed delivery times provided all client requirements are met. All disputes are subject to the laws of the Kingdom of Saudi Arabia."
    }
  };

  const quickLinks = [
    { name: isAr ? "الرئيسية" : "Home", href: "/" },
    { name: isAr ? "نبذه عننا" : "About Us", href: "#about" },
    { name: isAr ? "خدماتنا" : "Services", href: "#expertise" },
    { name: isAr ? "عملاؤنا" : "Clients", href: "#clients" },
    { name: isAr ? "الشكاوى والمقترحات" : "Feedback", action: () => setIsFeedbackOpen(true) },
  ];

  return (
    <footer className="bg-(--background) text-(--foreground) pt-32 pb-12 relative overflow-hidden transition-colors border-t border-(--border)">
      {/* Premium Decorative Divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-[#F58220]/40 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Main Branding Slogan */}
        <div className="flex items-center gap-6 mb-20 overflow-hidden">
          <div className="h-px bg-[#F58220]/30 flex-1 hidden md:block" />
          <span className="text-shimmer text-4xl md:text-8xl font-black uppercase tracking-[0.2em] whitespace-nowrap drop-shadow-2xl py-4">
            {isAr ? "نصنع التميز" : "Crafting Excellence"}
          </span>
          <div className="h-px bg-[#F58220]/30 flex-1" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
          <div className="lg:col-span-2">
            <Link href="/" className="group mb-8 inline-block">
              <div className="w-20 h-20 mb-4">
                <Logo />
              </div>
              <span className="text-2xl font-black tracking-tighter text-(--foreground) group-hover:text-[#F58220] transition-colors">BTH</span>
            </Link>
            <p className="text-(--foreground)/90 max-w-sm mb-8 text-lg leading-relaxed font-light">
              {t.description}
            </p>
            <div className="flex gap-4">
              <Link 
                href="https://www.instagram.com/bth_adv?igsh=MTVsZHkxbmpmcDFtOQ==" 
                target="_blank" 
                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:text-[#F58220] hover:border-[#F58220]/50 transition-all group"
                title="Instagram"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="group-hover:scale-110 transition-transform"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-[#F58220] mb-10">{t.quick_links}</h4>
            <ul className="space-y-5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {link.href ? (
                    <Link href={link.href} className="text-(--foreground)/90 hover:text-[#F58220] transition-colors flex items-center gap-3 group text-sm font-bold uppercase tracking-widest">
                      <span className="w-0 h-px bg-[#F58220] group-hover:w-4 transition-all" />
                      {link.name}
                    </Link>
                  ) : (
                    <button onClick={link.action} className="text-(--foreground)/90 hover:text-[#F58220] transition-colors flex items-center gap-3 group text-sm font-bold uppercase tracking-widest cursor-pointer">
                      <span className="w-0 h-px bg-[#F58220] group-hover:w-4 transition-all" />
                      {link.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-[#F58220] mb-10">{content[locale].contact.address_title}</h4>
            <ul className="space-y-6 text-(--foreground)/90">
              <li className="leading-relaxed text-sm">
                {content[locale].contact.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-(--border) flex flex-col md:flex-row items-center justify-between gap-8 text-xs font-bold uppercase tracking-[0.2em] text-(--foreground)/60">
          <p>{t.copyright}</p>
          <div className="flex gap-10">
            <button onClick={() => setActivePolicy("privacy")} className="hover:text-[#F58220] transition-colors">
              {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
            </button>
            <button onClick={() => setActivePolicy("terms")} className="hover:text-[#F58220] transition-colors">
              {isAr ? "الشروط والأحكام" : "Terms & Conditions"}
            </button>
          </div>
        </div>
      </div>

      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />

      {/* Policy Modal */}
      <AnimatePresence>
        {activePolicy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-150 flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-2xl glass border border-white/10 rounded-[2.5rem] p-10 md:p-16 relative"
            >
              <button 
                onClick={() => setActivePolicy(null)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              <h3 className="text-3xl md:text-4xl font-black mb-10 text-primary">
                {policies[activePolicy].title}
              </h3>
              
              <div className="text-xl text-gray-300 leading-relaxed space-y-6">
                <p>{policies[activePolicy].content}</p>
              </div>

              <div className="mt-12">
                <button 
                  onClick={() => setActivePolicy(null)}
                  className="w-full h-16 rounded-full glow-button-primary font-bold text-lg hover:scale-[1.02] transition-transform"
                >
                  {isAr ? "فهمت ذلك" : "I Understand"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};
