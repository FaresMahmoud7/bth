"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setLocaleCookie } from "@/actions/locale";

type Locale = "en" | "ar";

interface LanguageContextType {
  locale: Locale;
  toggleLanguage: () => void;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children, initialLocale = "ar" }: { children: React.ReactNode, initialLocale: Locale }) => {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const router = useRouter();

  const toggleLanguage = async () => {
    const newLocale = locale === "en" ? "ar" : "en";
    setLocale(newLocale);
    await setLocaleCookie(newLocale);
    router.refresh();
  };

  const dir = locale === "ar" ? "rtl" : "ltr";

  // Force direction on client to ensure immediate visual feedback if needed
  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = locale;
  }, [locale, dir]);

  return (
    <LanguageContext.Provider value={{ locale, toggleLanguage, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
