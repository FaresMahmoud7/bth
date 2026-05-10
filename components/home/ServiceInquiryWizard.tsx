"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { X, ChevronRight, ChevronLeft, Check, Send, Loader2, MessageSquare } from "lucide-react";
import { submitFeedback } from "@/actions/feedback"; // Reuse feedback action for inquiry
import { validatePhoneNumber } from "@/lib/validation";

interface Type {
  _id: string;
  name: string;
  options: string[];
}

interface Category {
  _id: string;
  nameAr: string;
  nameEn: string;
  items: Type[];
}

interface WizardProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  initialCategory?: Category | null;
  initialType?: Type | null;
}

export const ServiceInquiryWizard = ({ isOpen, onClose, categories, initialCategory, initialType }: WizardProps) => {
  const { locale } = useLanguage();
  const isAr = locale === "ar";
  
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedType, setSelectedType] = useState<Type | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [commPreference, setCommPreference] = useState<'whatsapp' | 'email' | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [countryCode, setCountryCode] = useState('+966');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const generalNumbers = ["966566296262", "966505912477"];

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (initialCategory) {
          setSelectedCategory(initialCategory);
          if (initialType) {
            setSelectedType(initialType);
            setStep(3); // Options step
          } else {
            setStep(2); // Types step
          }
        } else {
          setStep(1); // Category step
        }
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen, initialCategory, initialType]);

  const reset = () => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
      if (initialType) {
        setSelectedType(initialType);
        setStep(3);
      } else {
        setStep(2);
        setSelectedType(null);
      }
    } else {
      setStep(1);
      setSelectedCategory(null);
      setSelectedType(null);
    }
    setSelectedOption("");
    setCommPreference(null);
    setSuccess(false);
    setPhone('');
    setPhoneError('');
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 500);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const userName = formData.get("name") as string;
    const userEmail = formData.get("email") as string;
    
    const val = validatePhoneNumber(phone, countryCode);
    if (!val.isValid) {
      setPhoneError(val.error || 'Invalid phone');
      setLoading(false);
      return;
    }
    
    // Clean phone number
    const cleanedPhone = phone.replace(/\D/g, '').replace(/^0+/, '');
    const userPhone = `${countryCode}${cleanedPhone}`;
    
    const inquiryDetails = `Inquiry for: ${selectedCategory?.nameEn} -> ${selectedType?.name}${selectedOption ? ` (${selectedOption})` : ''}`;
    
    const data = {
      name: userName,
      phone: userPhone,
      message: `${inquiryDetails}${userEmail ? ` | Email: ${userEmail}` : ''}`,
      type: 'suggestion' as const,
    };

    const result = await submitFeedback(data);
    
    if (result.success) {
      if (commPreference === 'whatsapp') {
        const targetPhone = generalNumbers[Math.floor(Math.random() * generalNumbers.length)];

        // Format WhatsApp Message
        const waMessage = encodeURIComponent(
          `*New Quote Request from BTH Website*\n\n` +
          `*Name:* ${userName}\n` +
          `*Phone:* ${userPhone}\n` +
          `*Service:* ${selectedCategory?.nameEn} / ${selectedCategory?.nameAr}\n` +
          `*Type:* ${selectedType?.name}\n` +
          `*Option:* ${selectedOption || 'General'}\n\n` +
          `_Sent via BTH Inquiry Wizard_`
        );

        const waUrl = `https://wa.me/${targetPhone}?text=${waMessage}`;
        window.location.href = waUrl;
      }
      
      setSuccess(true);
      setTimeout(handleClose, 2000);
    } else {
      alert("Error sending inquiry. Please try again.");
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card w-full max-w-2xl overflow-y-auto max-h-[95vh] relative shadow-2xl m-2"
      >
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h3 className="text-xl md:text-2xl font-black text-white">{isAr ? "طلب تسعيرة" : "Request a Quote"}</h3>
            <p className="text-zinc-500 text-[10px] md:text-sm mt-1">{isAr ? "خطوات بسيطة للحصول على تسعيرة احترافية" : "Easy steps to get your professional quote"}</p>
          </div>
          <button 
            onClick={handleClose} 
            title={isAr ? "إغلاق" : "Close"}
            className="p-2 text-zinc-500 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Stepper Progress */}
        <div className="px-6 md:px-8 pt-6 md:pt-8 flex items-center justify-between">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold text-[10px] md:text-xs transition-all ${step >= s ? "bg-[#F58220] text-white" : "bg-zinc-800 text-zinc-500"}`}>
                {step > s ? <Check size={12} /> : s}
              </div>
              {s < 5 && <div className={`h-0.5 flex-1 mx-1 md:mx-2 ${step > s ? "bg-[#F58220]" : "bg-zinc-800"}`} />}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 min-h-[350px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <h4 className={`text-lg font-bold text-white ${isAr ? "text-right" : ""}`}>{isAr ? "اختر الفئة" : "Select Category"}</h4>
                <div className="grid grid-cols-1 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat._id}
                      onClick={() => { setSelectedCategory(cat); setStep(2); }}
                      className="p-5 bg-zinc-800/50 border border-zinc-700 rounded-2xl text-white font-bold text-left hover:border-[#F58220] transition-all flex justify-between items-center"
                    >
                      {isAr ? cat.nameAr : cat.nameEn}
                      <ChevronRight size={18} className="text-[#F58220]" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  {!initialCategory && (
                    <button 
                      onClick={() => setStep(1)} 
                      title={isAr ? "رجوع" : "Back"}
                      className="text-zinc-500 hover:text-white"
                    >
                      <ChevronLeft size={20} className={isAr ? "rotate-180" : ""} />
                    </button>
                  )}
                  <h4 className={`text-lg font-bold text-white ${isAr ? "text-right" : ""}`}>{isAr ? "اختر النوع" : "Select Type"}</h4>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {selectedCategory?.items.map((type) => (
                    <button
                      key={type._id}
                      onClick={() => { setSelectedType(type); setStep(3); }}
                      className="p-5 bg-zinc-800/50 border border-zinc-700 rounded-2xl text-white font-bold text-left hover:border-[#F58220] transition-all flex justify-between items-center"
                    >
                      {type.name}
                      <ChevronRight size={18} className="text-[#F58220]" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  {!initialType && (
                    <button 
                      onClick={() => setStep(2)} 
                      title={isAr ? "رجوع" : "Back"}
                      className="text-zinc-500 hover:text-white"
                    >
                      <ChevronLeft size={20} className={isAr ? "rotate-180" : ""} />
                    </button>
                  )}
                  <h4 className={`text-lg font-bold text-white ${isAr ? "text-right" : ""}`}>{isAr ? "اختر الخيار" : "Select Specific Option"}</h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {selectedType?.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setSelectedOption(opt); setStep(4); }}
                      className="p-4 bg-zinc-800/50 border border-zinc-700 rounded-2xl text-white font-bold text-sm hover:border-[#F58220] transition-all"
                    >
                      {opt}
                    </button>
                  ))}
                  <button
                    onClick={() => { setSelectedOption(""); setStep(4); }}
                    className="p-4 bg-zinc-800/50 border border-zinc-700 rounded-2xl text-white font-bold text-sm hover:border-[#F58220] transition-all col-span-full"
                  >
                    {isAr ? "أخرى / غير محدد" : "Other / General Inquiry"}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="stepPreference" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <button 
                    onClick={() => setStep(3)} 
                    title={isAr ? "رجوع" : "Back"}
                    className="text-zinc-500 hover:text-white"
                  >
                    <ChevronLeft size={20} className={isAr ? "rotate-180" : ""} />
                  </button>
                  <h4 className={`text-lg font-bold text-white ${isAr ? "text-right" : ""}`}>{isAr ? "وسيلة التواصل المفضلة" : "Preferred Contact Method"}</h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => { setCommPreference('whatsapp'); setStep(5); }}
                    className={`p-8 bg-zinc-800/50 border rounded-2xl text-white font-bold flex flex-col items-center gap-4 transition-all ${commPreference === 'whatsapp' ? 'border-[#F58220] bg-[#F58220]/10' : 'border-zinc-700 hover:border-zinc-500'}`}
                  >
                    <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">
                      <MessageSquare size={24} />
                    </div>
                    {isAr ? "واتساب" : "WhatsApp"}
                  </button>
                  <button
                    onClick={() => { setCommPreference('email'); setStep(5); }}
                    className={`p-8 bg-zinc-800/50 border rounded-2xl text-white font-bold flex flex-col items-center gap-4 transition-all ${commPreference === 'email' ? 'border-[#F58220] bg-[#F58220]/10' : 'border-zinc-700 hover:border-zinc-500'}`}
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                      <Send size={24} />
                    </div>
                    {isAr ? "البريد الإلكتروني" : "Email"}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div className="flex items-center gap-4 mb-2">
                  <button 
                    onClick={() => setStep(4)} 
                    title={isAr ? "رجوع" : "Back"}
                    className="text-zinc-500 hover:text-white"
                  >
                    <ChevronLeft size={20} className={isAr ? "rotate-180" : ""} />
                  </button>
                  <h4 className={`text-lg font-bold text-white ${isAr ? "text-right" : ""}`}>{isAr ? "بيانات التواصل" : "Contact Details"}</h4>
                </div>
                
                {success ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto">
                      <Check size={40} />
                    </div>
                    <h5 className="text-xl font-bold text-white">{isAr ? "تم الإرسال بنجاح" : "Sent Successfully"}</h5>
                    <p className="text-zinc-500">
                      {commPreference === 'whatsapp' 
                        ? (isAr ? "جاري تحويلك إلى واتساب..." : "Redirecting to WhatsApp...")
                        : (isAr ? "سنتواصل معك عبر البريد الإلكتروني قريباً" : "We will contact you via email shortly")}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="p-4 bg-white/5 border border-white/5 rounded-2xl mb-6">
                      <p className="text-xs text-zinc-500 uppercase font-black tracking-widest mb-1">{isAr ? "طلبك لـ" : "Inquiry For"}</p>
                      <p className="text-white font-bold">{selectedCategory?.nameEn} {">"} {selectedType?.name} {selectedOption && `(${selectedOption})`}</p>
                    </div>
                    
                    <input 
                      name="name" required placeholder={isAr ? "الاسم الكامل" : "Full Name"} 
                      className="w-full p-5 bg-zinc-800/50 border border-zinc-700 rounded-2xl text-white outline-none focus:border-[#F58220] transition-all font-bold"
                    />

                    {commPreference === 'email' && (
                      <input 
                        name="email" type="email" required placeholder={isAr ? "البريد الإلكتروني" : "Email Address"} 
                        className="w-full p-5 bg-zinc-800/50 border border-zinc-700 rounded-2xl text-white outline-none focus:border-[#F58220] transition-all font-bold"
                      />
                    )}
                    
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <select 
                          value={countryCode}
                          onChange={(e) => { setCountryCode(e.target.value); setPhoneError(''); }}
                          className="w-1/3 p-5 bg-zinc-800/50 border border-zinc-700 rounded-2xl text-white outline-none focus:border-[#F58220] transition-all appearance-none text-center font-bold"
                          dir="ltr"
                          title={isAr ? "مفتاح الدولة" : "Country Code"}
                          aria-label={isAr ? "مفتاح الدولة" : "Country Code"}
                        >
                          <option value="+966">🇸🇦 +966</option>
                          <option value="+971">🇦🇪 +971</option>
                          <option value="+965">🇰🇼 +965</option>
                          <option value="+973">🇧🇭 +973</option>
                          <option value="+974">🇶🇦 +974</option>
                          <option value="+968">🇴🇲 +968</option>
                          <option value="+20">🇪🇬 +20</option>
                        </select>
                        <input 
                          required 
                          type="tel" 
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            const val = validatePhoneNumber(e.target.value, countryCode);
                            setPhoneError(val.isValid ? '' : val.error || '');
                          }}
                          placeholder={isAr ? "رقم الجوال" : "Phone Number"} 
                          className={`w-2/3 p-5 bg-zinc-800/50 border ${phoneError ? 'border-red-500' : 'border-zinc-700'} rounded-2xl text-white outline-none focus:border-[#F58220] transition-all font-bold`}
                          dir="ltr"
                        />
                      </div>
                      {phoneError && <p className="text-red-500 text-xs font-bold px-2">{phoneError}</p>}
                    </div>
                    
                    <button 
                      type="submit" disabled={loading}
                      className="w-full py-6 glow-button-primary font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                    >
                      {loading ? <Loader2 className="animate-spin" size={20} /> : <><Send size={18} /> {isAr ? "إرسال طلب التسعيرة" : "Request Quote"}</>}
                    </button>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
