import type { Metadata } from "next";
import { Montserrat, Manrope, Geist, Cairo } from "next/font/google";
import "./globals.css";
const montserrat = Montserrat({ subsets: ["latin"], weight: ['400', '500', '600', '700', '800', '900'], variable: '--font-montserrat' });
const manrope = Manrope({ subsets: ["latin"], weight: ['400', '500', '600', '700'], variable: '--font-manrope' });
const geist = Geist({ subsets: ["latin"], weight: ['400', '500', '600', '700'], variable: '--font-geist' });
const cairo = Cairo({ subsets: ["arabic", "latin"], weight: ['400', '600', '700', '900'], variable: '--font-cairo' });

export const metadata: Metadata = {
  title: "BTH | Corporate Advertising",
  description: "Elevate your brand with premium advertising solutions.",
};

import { cookies } from "next/headers";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { MainLayout } from "@/components/layout/MainLayout";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("locale")?.value;
  const locale = (localeCookie === "en" || localeCookie === "ar") ? localeCookie : "ar";
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction} className="scroll-smooth">
      <body className={`${montserrat.variable} ${manrope.variable} ${geist.variable} ${cairo.variable} ${locale === 'ar' ? cairo.className : montserrat.className} min-h-screen bg-(--background) text-(--foreground) antialiased selection:bg-[#F58220] selection:text-white flex flex-col transition-colors duration-300`}>
        <AuthProvider>
          <LanguageProvider initialLocale={locale}>
            <MainLayout>
              {children}
            </MainLayout>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
