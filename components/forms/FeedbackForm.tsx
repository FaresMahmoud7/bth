"use client";

import { useState, ChangeEvent } from "react";
import { submitFeedback } from "@/actions/submitFeedback";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { validateTextLanguage, validatePhoneNumber, COUNTRY_CODES } from "@/lib/validation";

export const FeedbackForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  
  const { locale } = useLanguage();
  const isAr = locale === "ar";
  const [countryCode, setCountryCode] = useState("+966");
  const [validationErrors, setValidationErrors] = useState<{name?: string; phone?: string}>({});


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Final check before submission
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    
    const nameError = validateTextLanguage(name, isAr ? 'ar' : 'en').error;
    const phoneError = validatePhoneNumber(phone, countryCode).error;
    
    if (nameError || phoneError) {
      setValidationErrors({
        name: nameError ? (isAr ? "الرجاء استخدام أحرف عربية" : "Please use English letters") : undefined,
        phone: phoneError ? (isAr ? "رقم جوال غير صحيح" : "Invalid phone number") : undefined
      });
      return;
    }
    
    setLoading(true);
    setError("");

    // Append the country code to the phone number before sending
    const submitData = new FormData(e.currentTarget);
    submitData.set("phone", `${countryCode}${phone}`);

    try {
      const result = await submitFeedback(submitData);

      if (result.success && result.waLink) {
        setSuccess(true);
        // Add a slight delay before redirecting to show the success state
        setTimeout(() => {
          window.location.href = result.waLink!;
        }, 1500);
      } else {
        setError(result.error || "Failed to submit. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-zinc-900 rounded-3xl border border-zinc-800 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Submission Successful</h3>
        <p className="text-zinc-400 text-lg mb-8 max-w-sm">
          Thank you for reaching out. We are redirecting you to our dedicated WhatsApp line...
        </p>
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {error && (
        <div className="p-4 bg-red-500/10 text-red-400 rounded-xl text-sm font-medium border border-red-500/20 animate-in fade-in slide-in-from-top-2">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-zinc-400 mb-2">
            {isAr ? "الاسم الكامل" : "Full Name"}
          </label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const err = validateTextLanguage(e.target.value, isAr ? 'ar' : 'en').error;
              setValidationErrors(prev => ({ ...prev, name: err ? (isAr ? "الرجاء استخدام أحرف عربية" : "Please use English letters") : undefined }));
            }}
            className={`w-full h-14 px-5 rounded-xl border ${validationErrors.name ? 'border-red-500 bg-red-500/5' : 'border-zinc-800 bg-zinc-900 focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700'} text-white outline-none transition-all placeholder:text-zinc-600`}
            placeholder={isAr ? "الاسم" : "Jane Doe"} 
          />
          {validationErrors.name && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-bold text-zinc-400 mb-2">
            {isAr ? "رقم الجوال" : "Phone Number"}
          </label>
          <div className="flex gap-2">
            <select
              value={countryCode}
              onChange={(e) => {
                setCountryCode(e.target.value);
                setValidationErrors(prev => ({ ...prev, phone: undefined }));
              }}
              title={isAr ? "كود الدولة" : "Country Code"}
              aria-label={isAr ? "اختر كود الدولة" : "Select country code"}
              className="w-[100px] h-14 px-2 rounded-xl border border-zinc-800 bg-zinc-900 text-white focus:bg-zinc-800 focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 outline-none transition-all cursor-pointer"
            >
              {COUNTRY_CODES.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.code} {country.flag}
                </option>
              ))}
            </select>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              required 
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const err = validatePhoneNumber(e.target.value, countryCode).error;
                setValidationErrors(prev => ({ ...prev, phone: err ? (isAr ? "رقم جوال غير صحيح" : "Invalid phone number") : undefined }));
              }}
              className={`flex-1 h-14 px-5 rounded-xl border ${validationErrors.phone ? 'border-red-500 bg-red-500/5' : 'border-zinc-800 bg-zinc-900 focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700'} text-white outline-none transition-all placeholder:text-zinc-600`}
              placeholder="05xxxxxxx" 
            />
          </div>
          {validationErrors.phone && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-zinc-400 mb-3">
          {isAr ? "نوع الطلب" : "Submission Type"}
        </label>
        <div className="flex gap-4">
          <label className="flex-1 cursor-pointer">
            <input type="radio" name="type" value="complaint" className="peer sr-only" required />
            <div className="w-full h-14 flex items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 peer-checked:bg-white peer-checked:text-black peer-checked:border-white font-semibold transition-all">
              {isAr ? "شكوى" : "Complaint"}
            </div>
          </label>
          <label className="flex-1 cursor-pointer">
            <input type="radio" name="type" value="suggestion" className="peer sr-only" required />
            <div className="w-full h-14 flex items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 peer-checked:bg-white peer-checked:text-black peer-checked:border-white font-semibold transition-all">
              {isAr ? "اقتراح" : "Suggestion"}
            </div>
          </label>
        </div>
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-bold text-zinc-400 mb-2">
          {isAr ? "تفاصيل الرسالة" : "Message Details"}
        </label>
        <textarea 
          id="message" 
          name="message" 
          required 
          rows={5} 
          className="w-full p-5 rounded-xl border border-zinc-800 bg-zinc-900 text-white focus:bg-zinc-800 focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 outline-none transition-all resize-none placeholder:text-zinc-600" 
          placeholder={isAr ? "يرجى كتابة التفاصيل هنا..." : "Please provide the details here..."} 
        />
      </div>
      
      <button 
        type="submit" 
        disabled={loading || !!validationErrors.name || !!validationErrors.phone}
        className="w-full flex items-center justify-center gap-3 h-16 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed group"
      >
        {loading ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          <>
            <Send className={`w-5 h-5 group-hover:-translate-y-1 transition-transform ${isAr ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} />
            {isAr ? "إرسال عبر واتساب" : "Send via WhatsApp"}
          </>
        )}
      </button>
      
      <p className="text-center text-xs text-zinc-500 mt-2">
        {isAr 
          ? "سيتم معالجة طلبك بالكامل عبر الإيميل وواتساب. لن يتم حفظ أي بيانات." 
          : "Your submission will be processed entirely via email and WhatsApp. No data is saved to our databases."}
      </p>
    </form>
  );
};
