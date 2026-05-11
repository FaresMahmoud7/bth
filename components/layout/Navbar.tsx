"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X, Globe, Lock } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FeedbackModal } from "@/components/forms/FeedbackModal";
import { Logo } from "@/components/ui/Logo";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const { locale, toggleLanguage } = useLanguage();
  const isAr = locale === "ar";

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", "about", "clients", "expertise", "why-us", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id || "home");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const links = [
    { name: isAr ? "الرئيسية" : "Home", href: "home" },
    { name: isAr ? "نبذه عننا" : "About", href: "about" },
    { name: isAr ? "عملاؤنا" : "Clients", href: "clients" },
    { name: isAr ? "خدماتنا" : "Services", href: "expertise" },
    { name: isAr ? "لماذا تختارنا" : "Why Choose Us", href: "why-us" },
    { name: isAr ? "تواصل معانا" : "Contact", href: "contact" },
  ];

  const scrollToSection = (id: string) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/");
    } else {
      const el = document.getElementById(id);
      if (el) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
        window.history.pushState(null, "", `#${id}`);
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-9999 transition-all duration-500 ${
          isScrolled
            ? "bg-(--background)/95 border-b border-(--border) backdrop-blur-md py-4"
            : "bg-transparent py-7"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" onClick={(e) => { e.preventDefault(); scrollToSection("home"); }} className="flex items-center gap-4 group">
            <div className="w-16 h-16 shrink-0">
              <Logo />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-(--foreground) text-sm md:text-base tracking-tight leading-none mb-1 text-start">
                {isAr ? "بث الخليجية للدعاية والإعلان" : "BTH Al-khalejeah Advertising Agency"}
              </span>
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest leading-none text-start">
                {isAr ? "BTH Al-khalejeah Advertising Agency" : "Best To Have"}
              </span>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center gap-10">
            {links.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={`${
                    isActive ? "text-[#F58220]" : "text-white hover:text-[#F58220]"
                  } text-[13px] md:text-[14px] font-black uppercase tracking-widest transition-all duration-300 relative group text-start`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-px bg-[#F58220] transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                </button>
              );
            })}

            <button
              onClick={() => setIsFeedbackOpen(true)}
              className="text-white hover:text-[#F58220] text-[13px] md:text-[14px] font-black uppercase tracking-widest transition-all duration-300 relative group"
            >
              {isAr ? "الشكاوى والمقترحات" : "Feedback"}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#F58220] group-hover:w-full transition-all duration-300" />
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="hidden lg:flex items-center gap-2 px-4 py-2 border border-white/10 text-white/50 hover:text-white hover:border-white/30 text-xs font-bold uppercase tracking-widest transition-colors rounded-lg"
            >
              <Globe className="w-3 h-3" />
              {isAr ? "EN" : "AR"}
            </button>

            <Link
              href="/admin"
              className="p-2 text-white/20 hover:text-[#F58220] transition-colors"
              title="Admin"
            >
              <Lock className="w-4 h-4" />
            </Link>

            <button
              className="xl:hidden text-white p-1"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-(--background) border-b border-(--border) py-8 max-h-[80vh] overflow-y-auto"
          >
            <div className="container mx-auto px-6 space-y-6">
              {links.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <button
                    key={link.name}
                    onClick={() => {
                      setIsMobileOpen(false);
                      scrollToSection(link.href);
                    }}
                    className={`block text-xl font-black transition-colors text-start ${isActive ? "text-[#F58220]" : "text-(--foreground) hover:text-[#F58220]"}`}
                  >
                    {link.name}
                  </button>
                );
              })}

              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  setIsFeedbackOpen(true);
                }}
                className="block w-full text-xl font-black text-(--foreground) hover:text-[#F58220] transition-colors text-start"
              >
                {isAr ? "الشكاوى والمقترحات" : "Feedback"}
              </button>
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-(--foreground)/40 text-sm font-bold uppercase tracking-wider"
              >
                <Globe className="w-4 h-4" />
                {isAr ? "Switch to English" : "التبديل للعربية"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
    </>
  );
};
