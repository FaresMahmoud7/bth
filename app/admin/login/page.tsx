"use client";

import { useState } from "react";
import { Loader2, Eye, EyeOff, Lock, User as UserIcon, ShieldCheck } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

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
      callbackUrl: "/admin",
      redirect: true,
    });

    if (result?.error) {
      setError(result.error === "CredentialsSignin" || result.error === "Invalid credentials" ? "بيانات الدخول غير صحيحة" : "فشل تسجيل الدخول");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-(--background) flex items-center justify-center p-4 relative overflow-hidden font-cairo" dir="rtl">
      {/* Background decoration matching website Hero */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-(--background)" />
        <Image
          src="/image2.jpeg" 
          alt="Background"
          fill
          priority
          className="object-cover opacity-20 scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
        {/* Dynamic Gradient Overlays */}
        <div className="absolute inset-0 bg-linear-to-b from-(--background) via-transparent to-(--background) opacity-95" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        
        {/* Orange accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#F58220]/60 to-transparent" />
        
        {/* Animated Radial Highlight */}
        <motion.div 
          animate={{ 
            opacity: [0.05, 0.1, 0.05],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,130,32,0.1),transparent_70%)]" 
        />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md glass-card p-10 relative z-10 border border-white/10 shadow-[0_32px_64px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        {/* Premium Glow effect behind logo */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#F58220]/10 blur-[80px] pointer-events-none" />
        
        <div className="flex flex-col items-center mb-10 relative">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 mb-6 drop-shadow-[0_0_15px_rgba(245,130,32,0.3)]"
          >
            <Logo />
          </motion.div>
          
          <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2">لوحة الإدارة</h1>
          <div className="flex items-center gap-2">
            <div className="w-8 h-px bg-[#F58220]/30" />
            <span className="text-[#F58220] text-[10px] font-black uppercase tracking-[0.2em]">BTH Agency Access</span>
            <div className="w-8 h-px bg-[#F58220]/30" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl text-center font-bold flex items-center justify-center gap-2 overflow-hidden"
              >
                <Lock className="w-3 h-3" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-2">
            <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.2em] px-1">اسم المستخدم</label>
            <div className="relative group">
              <div className="absolute inset-y-0 right-5 flex items-center text-white/20 group-focus-within:text-[#F58220] transition-colors">
                <UserIcon size={18} />
              </div>
              <input 
                type="text" 
                name="username" 
                required 
                className="w-full h-14 pr-12 pl-5 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-[#F58220] focus:bg-[#F58220]/5 transition-all text-white placeholder:text-white/10 font-bold" 
                placeholder="أدخل اسم المستخدم" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.2em] px-1">كلمة المرور</label>
            <div className="relative group">
              <div className="absolute inset-y-0 right-5 flex items-center text-white/20 group-focus-within:text-[#F58220] transition-colors">
                <Lock size={18} />
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                required 
                className="w-full h-14 pr-12 pl-12 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-[#F58220] focus:bg-[#F58220]/5 transition-all text-white placeholder:text-white/10 text-start font-bold" 
                placeholder="••••••••" 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 left-5 flex items-center text-white/20 hover:text-[#F58220] transition-colors z-20"
                title={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-16 rounded-full glow-button-primary font-black uppercase tracking-widest text-sm mt-4 flex items-center justify-center gap-3 transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>دخول النظام</span>
                <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="h-px w-12 bg-white/10" />
          <p className="text-center text-[9px] text-white/30 uppercase tracking-[0.3em] font-black max-w-[200px] leading-relaxed">
            دخول مقيد • موظفين مصرح لهم فقط • نظام BTH الآمن
          </p>
        </div>
      </motion.div>

      {/* Decorative accent for the corner */}
      <div className="fixed bottom-0 left-0 w-64 h-64 bg-[#F58220]/5 blur-[120px] -z-10 pointer-events-none" />
    </div>
  );
}
