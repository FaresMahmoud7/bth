"use client";

import { useState } from "react";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result?.ok) {
      // Use window.location.replace for the fastest, most reliable redirection
      window.location.replace("/admin");
    } else {
      setError(result?.error === "CredentialsSignin" || result?.error === "Invalid credentials" ? "بيانات الدخول غير صحيحة" : "فشل تسجيل الدخول");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-(--background) flex items-center justify-center p-4 relative overflow-hidden" dir="rtl">
      {/* Background decoration matching website */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-(--background)" />
        {/* Orange accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#F58220]/60 to-transparent" />
      </div>
      
      <div className="w-full max-w-md bg-(--surface) border border-(--border) rounded-3xl p-10 shadow-2xl relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 mb-4">
            <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <defs>
                <radialGradient id="adminSphereGradient" cx="35%" cy="35%" r="65%" fx="35%" fy="35%">
                  <stop offset="0%" stopColor="#FFB380" />
                  <stop offset="70%" stopColor="#FF8C42" />
                  <stop offset="100%" stopColor="#E66A1F" />
                </radialGradient>
                <linearGradient id="adminGlossHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="white" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <filter id="adminGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <circle cx="256" cy="256" r="240" fill="white" />
              <ellipse cx="256" cy="256" rx="180" ry="80" stroke="#FF8C42" strokeWidth="4" fill="none" transform="rotate(-30 256 256)" opacity="0.6" />
              <ellipse cx="256" cy="256" rx="190" ry="60" stroke="#FF8C42" strokeWidth="3" fill="none" transform="rotate(45 256 256)" opacity="0.5" />
              <circle cx="256" cy="256" r="120" fill="url(#adminSphereGradient)" />
              <circle cx="256" cy="256" r="120" fill="url(#adminGlossHighlight)" />
              <text x="50%" y="53%" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="72" fill="#001F3F" letterSpacing="-2">BTH</text>
              <g filter="url(#adminGlow)">
                <path d="M 100 280 A 180 80 -30 0 1 412 232" stroke="#FF8C42" strokeWidth="5" fill="none" strokeLinecap="round" />
                <path d="M 120 180 A 190 60 45 0 0 392 332" stroke="#FF8C42" strokeWidth="4" fill="none" strokeLinecap="round" />
              </g>
              <ellipse cx="256" cy="400" rx="80" ry="20" fill="black" fillOpacity="0.05" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-white uppercase tracking-wider">لوحة الإدارة</h1>
          <p className="text-white/40 text-sm mt-2 font-bold">سجل دخولك لإدارة عمليات وكالة BTH.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl text-center font-bold">
              {error}
            </div>
          )}

          <div className="text-start">
            <label className="block text-sm font-bold text-white/40 mb-2 uppercase tracking-widest text-[10px]">اسم المستخدم</label>
            <input 
              type="text" 
              name="username" 
              required 
              title="اسم المستخدم"
              className="w-full h-14 px-5 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-[#F58220] transition-all text-white placeholder:text-white/10" 
              placeholder="أدخل اسم المستخدم" 
            />
          </div>

          <div className="text-start">
            <label className="block text-sm font-bold text-white/40 mb-2 uppercase tracking-widest text-[10px]">كلمة المرور</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                required 
                title="كلمة المرور"
                className="w-full h-14 px-5 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-[#F58220] transition-all text-white placeholder:text-white/10 text-start" 
                placeholder="••••••••" 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 left-5 flex items-center text-[#F58220] hover:text-white transition-colors z-20"
                title={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-16 rounded-full glow-button-primary font-bold uppercase tracking-widest text-sm mt-6 flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "تسجيل الدخول"}
          </button>
        </form>

        <p className="text-center text-[10px] text-white/20 mt-8 uppercase tracking-widest font-bold">
          دخول مقيد. للموظفين المصرح لهم فقط.
        </p>
      </div>
    </div>
  );
}
