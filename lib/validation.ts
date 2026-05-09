// Regex patterns for validation
export const arabicRegex = /^[\u0600-\u06FF\s0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
export const englishRegex = /^[a-zA-Z\s0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
export const phoneDigitsRegex = /^[0-9]+$/;

export interface CountryCode { code: string; flag: string; }

export const COUNTRY_CODES: CountryCode[] = [
  { code: "+966", flag: "🇸🇦" },
  { code: "+971", flag: "🇦🇪" },
  { code: "+965", flag: "🇰🇼" },
  { code: "+974", flag: "🇶🇦" },
  { code: "+973", flag: "🇧🇭" },
  { code: "+968", flag: "🇴🇲" },
  { code: "+20", flag: "🇪🇬" },
  { code: "+1", flag: "🇺🇸" },
  { code: "+44", flag: "🇬🇧" },
];

export const validateTextLanguage = (text: string, lang: 'ar' | 'en'): { isValid: boolean; error?: string } => {
  if (!text) return { isValid: true }; // Allow empty strings if handled by required attribute
  
  if (lang === 'ar' && !arabicRegex.test(text)) {
    return { isValid: false, error: "الرجاء إدخال أحرف عربية فقط" };
  }
  
  if (lang === 'en' && !englishRegex.test(text)) {
    return { isValid: false, error: "Please enter English characters only" };
  }
  
  return { isValid: true };
};

export const validatePhoneNumber = (phone: string, countryCode: string): { isValid: boolean; error?: string } => {
  if (!phone) return { isValid: false, error: "رقم الهاتف مطلوب / Phone number is required" };
  
  // Clean phone number from spaces/dashes
  const cleanedPhone = phone.replace(/[\s-]/g, '');
  
  if (!phoneDigitsRegex.test(cleanedPhone)) {
    return { isValid: false, error: "الرجاء إدخال أرقام فقط / Please enter digits only" };
  }
  
  // Saudi Arabia specific validation (usually 9 digits without leading 0, e.g., 501234567)
  if (countryCode === '+966') {
    if (cleanedPhone.length !== 9 && cleanedPhone.length !== 10) {
      return { isValid: false, error: "رقم الجوال السعودي يجب أن يكون 9 أرقام (بدون صفر) / Saudi number must be 9 digits" };
    }
    // if they entered 10 digits starting with 0, we can consider it valid but it's better to warn or auto-strip
  } else {
    // General validation for other countries (between 7 and 15 digits)
    if (cleanedPhone.length < 7 || cleanedPhone.length > 15) {
      return { isValid: false, error: "رقم الهاتف غير صالح / Invalid phone number length" };
    }
  }
  
  return { isValid: true };
};
