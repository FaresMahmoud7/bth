"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, MessageSquare, ChevronRight, Image as ImageIcon, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { ServiceInquiryWizard } from "@/components/home/ServiceInquiryWizard";

interface Type {
  _id: string;
  name: string;
  descriptionArabic: string;
  descriptionEnglish: string;
  images: string[];
  options: string[];
}

interface Category {
  _id: string;
  nameAr: string;
  nameEn: string;
  type: 'product' | 'project';
  image?: string;
  items: Type[];
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800";

export const CategoryShowcase = ({ categories }: { categories: Category[] }) => {
  const { locale } = useLanguage();
  const isAr = locale === "ar";
  const [selectedItem, setSelectedItem] = useState<Type | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryCategory, setInquiryCategory] = useState<Category | null>(null);
  const [inquiryType, setInquiryType] = useState<Type | null>(null);

  const openInquiry = (category: Category | null = null, type: Type | null = null) => {
    setInquiryCategory(category);
    setInquiryType(type);
    setIsInquiryOpen(true);
  };

  return (
    <section id="expertise" className="pt-12 pb-24 bg-(--background)">
      <div className="container mx-auto px-6">
        <div className="mb-24 text-center flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
          >
            {isAr ? "خدماتنا" : "Our Services"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-xl md:text-2xl max-w-3xl font-light"
          >
            {isAr ? "نقدم لك حلولاً إعلانية متكاملة بأعلى معايير الجودة" : "Providing integrated advertising solutions with the highest quality standards"}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {categories.map((category, idx) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col gap-8 h-full"
            >
              <div className="flex flex-col text-start items-start gap-4 mb-6 h-[120px] shrink-0 px-2 justify-center border-b border-white/5">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-1.5 h-10 bg-[#F58220] rounded-full shadow-[0_0_15px_rgba(245,130,32,0.5)] shrink-0" />
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase leading-tight wrap-break-word">
                    {isAr ? category.nameAr : category.nameEn}
                  </h3>
                </div>
              </div>

              <div className="flex flex-col gap-10 flex-1">
                {category.items.map((item) => {
                  // FIX DUPLICATION: Remove category image if it's the same as the first item image
                  const itemImages = item.images || [];
                  const categoryImage = category.image;
                  
                  let allImages: string[] = [];
                  if (categoryImage && categoryImage.trim() !== "") {
                    // Check if category image is already in the item images to avoid duplicates
                    const isDuplicate = itemImages.some(img => img === categoryImage);
                    if (!isDuplicate) {
                      allImages.push(categoryImage);
                    }
                  }
                  allImages = [...allImages, ...itemImages].filter(img => img && img.trim() !== "");
                  
                  return (
                    <div 
                      key={item._id}
                      className="group glass-card hover:border-[#F58220]/50 transition-all duration-500 overflow-hidden flex flex-col h-[750px] shrink-0 relative"
                    >
                      <div className="relative h-[280px] shrink-0 overflow-hidden bg-zinc-900 group/carousel">
                        <ImageCarousel 
                          images={allImages.length > 0 ? allImages : [FALLBACK_IMAGE]} 
                          itemName={item.name}
                          autoPlay={true}
                        />
                      </div>

                      <div className="p-6 md:p-8 flex flex-col flex-1 bg-zinc-900/50 backdrop-blur-sm pb-28">
                        <div className="flex-1 overflow-hidden">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-[#F58220] text-[10px] font-black uppercase tracking-widest">{isAr ? category.nameAr : category.nameEn}</span>
                          </div>
                          <h4 className="text-xl font-bold text-white mb-3 text-start line-clamp-1">{item.name}</h4>
                          <p className="text-zinc-400 text-sm line-clamp-3 mb-6 text-start h-[60px] leading-relaxed shrink-0">
                            {isAr ? item.descriptionArabic : item.descriptionEnglish}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 overflow-y-auto max-h-[180px] custom-scrollbar content-start">
                            {item.options.map((opt, i) => (
                              <span 
                                key={i} 
                                className="text-[9px] font-black border px-3 py-1.5 rounded-lg uppercase tracking-widest text-white/40 border-white/10 bg-white/5"
                              >
                                {opt}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="absolute bottom-8 left-6 right-6 lg:bottom-10 lg:left-8 lg:right-8">
                          <button 
                            onClick={() => setSelectedItem(item)}
                            className="w-full py-5 bg-white/5 hover:bg-[#F58220] border border-white/10 hover:border-[#F58220] rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all duration-500 flex items-center justify-center gap-3 group/btn"
                          >
                            {isAr ? "عرض التفاصيل" : "View Details"}
                            <ChevronRight size={14} className={`${isAr ? "rotate-180" : ""} group-hover/btn:translate-x-1 transition-transform`} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ServiceInquiryWizard 
        isOpen={isInquiryOpen} 
        onClose={() => {
          setIsInquiryOpen(false);
          setTimeout(() => {
            setInquiryCategory(null);
            setInquiryType(null);
          }, 500);
        }} 
        categories={categories}
        initialCategory={inquiryCategory}
        initialType={inquiryType}
      />

      <AnimatePresence>
        {selectedItem && (
          <ItemDetailsModal 
            item={selectedItem} 
            categoryImage={categories.find(c => c.items.some(i => i._id === selectedItem._id))?.image}
            onClose={() => setSelectedItem(null)} 
            onInquire={() => {
              const cat = categories.find(c => c.items.some(i => i._id === selectedItem._id)) || null;
              setSelectedItem(null);
              openInquiry(cat, selectedItem);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

const ImageCarousel = ({ 
  images, 
  itemName, 
  autoPlay = true, 
  autoPlayInterval = 4000, 
  objectFit = "cover" 
}: { 
  images: string[], 
  itemName: string, 
  autoPlay?: boolean,
  autoPlayInterval?: number, 
  objectFit?: "cover" | "contain" 
}) => {
  const [index, setIndex] = useState(0);
  const { locale } = useLanguage();
  const isAr = locale === "ar";

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [images.length, autoPlay, autoPlayInterval]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-zinc-900">
        <ImageIcon size={40} className="text-zinc-800" />
      </div>
    );
  }

  const next = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentImage = images[index] || FALLBACK_IMAGE;

  return (
    <div className="relative w-full h-full group/controls">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image 
            src={currentImage} 
            alt={`${itemName} - ${index + 1}`} 
            fill 
            className={`object-${objectFit} transition-opacity duration-300`}
            unoptimized={true}
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              if (img.src !== FALLBACK_IMAGE) {
                img.src = FALLBACK_IMAGE;
              }
            }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

      {images.length > 1 && (
        <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover/controls:opacity-100 transition-opacity duration-300">
          <button 
            onClick={isAr ? next : prev}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#F58220] transition-all border border-white/10"
          >
            {isAr ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
          <button 
            onClick={isAr ? prev : next}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#F58220] transition-all border border-white/10"
          >
            {isAr ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
      )}

      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 px-4">
        {images.map((_, i) => (
          <button 
            key={i} 
            onClick={(e) => { e.stopPropagation(); setIndex(i); }}
            className={`h-1.5 rounded-full transition-all duration-500 ${index === i ? "bg-[#F58220] w-8 shadow-[0_0_10px_rgba(245,130,32,0.5)]" : "bg-white/20 w-2 hover:bg-white/40"}`}
            title={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const ItemDetailsModal = ({ 
  item, 
  categoryImage,
  onClose, 
  onInquire 
}: { 
  item: Type, 
  categoryImage?: string,
  onClose: () => void, 
  onInquire: () => void 
}) => {
  const { locale } = useLanguage();
  const isAr = locale === "ar";

  const itemImages = item.images || [];
  let allImages: string[] = [];
  if (categoryImage && categoryImage.trim() !== "") {
    const isDuplicate = itemImages.some(img => img === categoryImage);
    if (!isDuplicate) {
      allImages.push(categoryImage);
    }
  }
  allImages = [...allImages, ...itemImages].filter(img => img && img.trim() !== "");

  const displayImages = allImages.length > 0 ? allImages : [FALLBACK_IMAGE];

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-card w-full max-w-6xl rounded-[40px] overflow-hidden flex flex-col lg:flex-row max-h-[90vh] relative"
      >
        <button 
          onClick={onClose} 
          title={isAr ? "إغلاق" : "Close"}
          className="absolute top-8 inset-e-8 z-50 p-3 bg-black/50 hover:bg-white hover:text-black rounded-full text-white transition-all"
        >
          <ArrowRight size={24} className={isAr ? "rotate-180" : ""} />
        </button>

        <div className="flex-1 bg-black relative min-h-[400px]">
          <ImageCarousel 
            images={displayImages} 
            itemName={item.name} 
            autoPlay={false} 
            objectFit="contain"
          />
        </div>

        <div className="w-full lg:w-[450px] p-12 overflow-y-auto">
          <h3 className="text-4xl font-black text-white mb-6 text-start">{item.name}</h3>
          <p className="text-zinc-400 text-lg leading-relaxed mb-10 text-start">
            {isAr ? item.descriptionArabic : item.descriptionEnglish}
          </p>

          <div className="space-y-8">
            <div>
              <h5 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-4 text-start">
                {isAr ? "خيارات متوفرة" : "Available Options"}
              </h5>
              <div className="flex flex-wrap gap-3">
                {item.options.map((opt, i) => (
                  <div key={i} className="px-6 py-3 bg-zinc-800/50 rounded-2xl text-white font-bold text-sm">
                    {opt}
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={onInquire}
              className="w-full py-6 glow-button-primary font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 mt-8"
            >
              <MessageSquare size={20} />
              {isAr ? "استفسار عن السعر" : "Inquire Price"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
