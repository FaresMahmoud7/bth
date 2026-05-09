"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  LogOut, 
  Menu, 
  X,
  User,
  Globe,
  Check,
  Edit2
} from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { updateAdminName } from "@/actions/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status, update } = useSession();
  const pathname = usePathname();
  const { locale, toggleLanguage } = useLanguage();
  const isAr = locale === "ar";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Avoid synchronous setState to prevent cascading render warning
    const checkWidth = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      }
    };
    
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);
  
  // Name editing states
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const navigation = [
    { name: isAr ? "لوحة التحكم" : "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: isAr ? "الخدمات" : "Services", href: "/admin/products", icon: Package },
    { name: isAr ? "الأقسام" : "Categories", href: "/admin/categories", icon: Tags },
  ];

  const handleNameUpdate = async () => {
    if (!newName.trim() || !session?.user?.id) return;
    setIsUpdating(true);
    const res = await updateAdminName(session.user.id, newName);
    if (res.success) {
      // Update NextAuth session client-side
      await update({ name: res.name });
      setIsEditingName(false);
    } else {
      alert(res.error);
    }
    setIsUpdating(false);
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-(--background) flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F58220]"></div>
          <span className="text-white/40 font-bold animate-pulse">{isAr ? "جاري تحميل لوحة التحكم..." : "Loading Dashboard..."}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--background) text-white flex" dir={isAr ? "rtl" : "ltr"}>
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? "translate-x-0" : (isAr ? "translate-x-full" : "-translate-x-full")
        } lg:translate-x-0 transition-transform duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        } lg:block flex flex-col fixed h-full z-50 inset-s-0 border-e border-white/10 glass-card rounded-none bg-(--background)`}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && <span className="font-bold text-xl tracking-tight">{isAr ? "لوحة تحكم BTH" : "BTH Admin"}</span>}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors lg:hidden"
            title={isAr ? "إغلاق القائمة" : "Close Sidebar"}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => {
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? "bg-[#F58220]/10 text-[#F58220] border-s-2 border-[#F58220]" 
                    : "text-white/40 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon size={20} className={isActive ? "text-[#F58220]" : "group-hover:text-white"} />
                {(isSidebarOpen || window.innerWidth < 1024) && <span className={isActive ? "font-bold" : ""}>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          {isSidebarOpen && (
            <button
              onClick={toggleLanguage}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 transition-all duration-200 text-white/40 hover:text-white"
            >
              <Globe size={20} />
              <span>{isAr ? "تغيير للإنجليزية" : "Switch to Arabic"}</span>
            </button>
          )}
          
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isEditingName ? 'bg-white/5' : ''}`}>
            <button 
              onClick={() => {
                if (!isEditingName) {
                  setNewName(session?.user?.name || "");
                  setIsEditingName(true);
                }
              }}
              className="h-8 w-8 shrink-0 bg-[#F58220]/10 rounded-full flex items-center justify-center border border-[#F58220]/20 text-[#F58220] hover:bg-[#F58220] hover:text-white transition-all"
              title={isAr ? "تعديل الملف الشخصي" : "Edit Profile"}
            >
              <User size={16} />
            </button>
            
            {isSidebarOpen && (
              <div className="flex flex-col overflow-hidden text-start flex-1">
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <input 
                      autoFocus
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleNameUpdate()}
                      placeholder={isAr ? "أدخل الاسم الجديد" : "Enter new name"}
                      title={isAr ? "الاسم الجديد" : "New Name"}
                      className="w-full bg-white/10 border border-[#F58220]/30 rounded px-2 py-0.5 text-xs text-white outline-none focus:border-[#F58220]"
                    />
                    <button 
                      onClick={handleNameUpdate} 
                      disabled={isUpdating} 
                      className="text-[#F58220] hover:text-white"
                      title={isAr ? "تأكيد الحفظ" : "Confirm Save"}
                    >
                      {isUpdating ? <span className="animate-spin text-[8px]">...</span> : <Check size={14} />}
                    </button>
                    <button 
                      onClick={() => setIsEditingName(false)} 
                      className="text-white/20 hover:text-white"
                      title={isAr ? "إلغاء" : "Cancel"}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <>
                    <button 
                      onClick={() => {
                        setNewName(session?.user?.name || "");
                        setIsEditingName(true);
                      }}
                      title={isAr ? "تعديل الاسم" : "Edit Name"}
                      className="text-sm font-medium truncate hover:text-[#F58220] transition-colors flex items-center gap-2 group"
                    >
                      {session?.user?.name || (isAr ? "مدير النظام" : "System Admin")}
                      <Edit2 size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                    <span className="text-xs text-[#F58220] uppercase tracking-wider">{isAr ? "مسؤول" : "Administrator"}</span>
                  </>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all duration-200"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>{isAr ? "تسجيل الخروج" : "Logout"}</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${
        isSidebarOpen && window.innerWidth >= 1024 ? "ps-64" : "ps-0 lg:ps-20"
      } p-4 md:p-8 pt-20 lg:pt-8`}>
        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className={`lg:hidden fixed top-4 inset-s-4 z-40 p-3 bg-white/5 border border-white/10 rounded-xl text-[#F58220]`}
          title={isAr ? "فتح القائمة" : "Open Sidebar"}
        >
          <Menu size={24} />
        </button>
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
