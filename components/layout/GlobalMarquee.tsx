"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";

const allClientsDefault = [
  { ar: "الصين لإنشاءات السكك الحديدية (TIEJUN)", en: "China Railway TIEJUN" },
  { ar: "سيبكو 3 (SEPCOIII)", en: "SEPCOIII" },
  { ar: "ميناء الملك فهد الصناعي بالجبيل", en: "King Fahad Industrial Port in Jubail" },
  { ar: "المؤسسة العامة لتحلية المياه المالحة", en: "Saline Water Conversion Corporation (SWCC)" },
  { ar: "مستشفى المواساة", en: "Mouwasat Hospital" },
  { ar: "تيكفين للإنشاءات", en: "Tekfen Construction" },
  { ar: "ألفا لافال", en: "Alfa Laval" },
  { ar: "سولزر", en: "Sulzer" },
  { ar: "الجزيرة للمركبات", en: "Al Jazirah Vehicles" },
  { ar: "شيميدت السعودية", en: "Schmidt Saudi Arabia" },
  { ar: "إرادة", en: "Eradah" },
  { ar: "مكتبة جرير", en: "Jarir Bookstore" },
  { ar: "الجمعية الخيرية لرعاية الأيتام (إنسان)", en: "Ensan Charity" },
  { ar: "المملكة العربية السعودية", en: "Kingdom of Saudi Arabia" },
  { ar: "برنامج الخدمات الصحية للهيئة الملكية (RCH)", en: "Royal Commission Health Services Program" },
  { ar: "مجموعة زيد الحسين وإخوانه", en: "Zaid Al Hussain & Brothers Group" },
  { ar: "بلانت-تيك العربية", en: "Plant-Tech Arabia" },
  { ar: "شركة داز السعودية المحدودة", en: "Saudi Daz Company Limited" },
  { ar: "إم آي إس العربية", en: "MIS Arabia" },
  { ar: "المراكز العربية", en: "Arabian Centres" },
  { ar: "كيكسا (KEKSA)", en: "KEKSA" },
  { ar: "لولو هايبر ماركت", en: "LuLu Hypermarket" },
  { ar: "سلمان عياد الرمالي للمحاماة", en: "Salman Ayed Al-Remaly Law Firm" },
  { ar: "عيادات الرازي", en: "Arrazi Clinics" },
  { ar: "شركة دانة الصحراء الطبية", en: "Danat Al Sahraa Medical Co." },
  { ar: "فاسكو", en: "Vasco" },
  { ar: "روستا (جي للتجارة)", en: "Rousta (G Trading)" },
  { ar: "مختبرات البرج الطبية", en: "Al Borg Medical Laboratories" },
  { ar: "بايرن لتأجير المعدات", en: "Byrne Equipment Rental" },
  { ar: "العليان / ديسكون", en: "Olayan / Descon" },
  { ar: "كوبيريون", en: "Coperion" },
  { ar: "أبل بيز", en: "Applebee's" },
  { ar: "عفيفي", en: "Afifi" },
  { ar: "بابريكا", en: "Paprika" },
  { ar: "سار (الشركة السعودية للخطوط الحديدية)", en: "SAR (Saudi Arabia Railways)" }
];

interface ClientData {
  ar: string;
  en: string;
  logoUrl?: string;
  logoScale?: number;
}

interface ApiPartner {
  nameAr: string;
  nameEn: string;
  logoUrl?: string;
  logoScale?: number;
}

const SimpleMarquee = ({ items, direction = "left" }: { items: ClientData[], direction?: "left" | "right" }) => {

  const displayItems = useMemo(() => {
    if (!items || items.length === 0) return [];
    // Just duplicate the items a few times to ensure it covers the screen
    // We don't need 50 copies, 2-4 copies is more than enough to prevent large off-screen bounds
    const baseList = [...items];
    return baseList;
  }, [items]);

  // Slow down the animation significantly (4 seconds per item)
  const duration = displayItems.length * 4;

  if (displayItems.length === 0) return null;

  const renderClient = (client: ClientData, idx: number) => (
    <div
      key={`banner-${idx}`}
      className="flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/5 whitespace-nowrap cursor-default bg-white/5 backdrop-blur-md"
    >
      {client.logoUrl ? (
        <div className="w-6 h-6 rounded-full overflow-hidden bg-white flex items-center justify-center p-[2px] shrink-0">
          <Image
            src={client.logoUrl}
            alt={client.ar}
            width={24}
            height={24}
            className="object-contain"
            style={{ transform: `scale(${client.logoScale || 1})` }}
          />
        </div>
      ) : (
        <div className="w-6 h-6 rounded-full bg-linear-to-br from-[#F58220] to-[#e1730a] flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-xs uppercase">
            {client.ar.charAt(0)}
          </span>
        </div>
      )}
      <span className="text-white/95 font-semibold text-sm font-cairo">
        {client.ar}
      </span>
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes marquee-left {
          from {
            transform: translateX(25vw);
          }
          to {
            transform: translateX(-100vw);
          }
        }

        @keyframes marquee-right {
          from {
            transform: translateX(-25vw);
          }
          to {
            transform: translateX(100vw);
          }
        }

        .marquee-content {
          display: flex;
          width: max-content;
        }

        .marquee-group {
          display: flex;
          gap: .75rem;
        }

        .animate-marquee-left {
          animation: marquee-left ${duration}s linear infinite;
        }

        .animate-marquee-right {
          animation: marquee-right ${duration}s linear infinite;
        }
      `}</style>

      <div className="marquee-content">
        <div
          className={`marquee-group ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
            }`}
        >
          {displayItems.map((client, idx) => renderClient(client, idx))}
        </div>

        <div
          className={`marquee-group ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
            }`}
        >
          {displayItems.map((client, idx) =>
            renderClient(client, idx + displayItems.length)
          )}
        </div>
      </div>
    </>
  );
};

export const GlobalMarquee = () => {
  const [allData, setAllData] = useState<ClientData[]>(allClientsDefault);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await fetch("/api/partners");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            const mapped = data.map((p: ApiPartner) => ({
              ar: p.nameAr,
              en: p.nameEn,
              logoUrl: p.logoUrl,
              logoScale: p.logoScale
            }));

            setAllData(mapped);
          }
        }
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };
    fetchPartners();
  }, []);

  return (
    <div className="w-full bg-transparent relative z-40 overflow-hidden">
      <div className="flex flex-col gap-[2px] py-[2px]">
        <SimpleMarquee items={allData.slice(0, Math.ceil(allData.length / 2))} direction="left" />
        <SimpleMarquee items={allData.slice(Math.ceil(allData.length / 2))} direction="right" />

      </div>
    </div>
  );
};
