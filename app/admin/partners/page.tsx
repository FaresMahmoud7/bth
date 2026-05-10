"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Loader2, 
  Building2,
  AlertTriangle
} from "lucide-react";

interface Partner {
  _id: string;
  nameAr: string;
  nameEn: string;
  row: number;
}

export default function PartnersAdminPage() {
  const { locale } = useLanguage();
  const isAr = locale === "ar";
  
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    nameAr: "",
    nameEn: "",
    row: 1
  });

  const fetchPartners = async () => {
    try {
      const res = await fetch("/api/partners");
      const data = await res.json();
      setPartners(data);
    } catch (error) {
      console.error("Error fetching partners:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchPartners();
    };
    init();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        fetchPartners();
        setIsAdding(false);
        setFormData({ nameAr: "", nameEn: "", row: 1 });
      }
    } catch (error) {
      console.error("Error adding partner:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/partners/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        fetchPartners();
        setEditingId(null);
        setFormData({ nameAr: "", nameEn: "", row: 1 });
      }
    } catch (error) {
      console.error("Error updating partner:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(isAr ? "هل أنت متأكد من حذف هذا الشريك؟" : "Are you sure you want to delete this partner?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/partners/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        fetchPartners();
      }
    } catch (error) {
      console.error("Error deleting partner:", error);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (partner: Partner) => {
    setEditingId(partner._id);
    setFormData({
      nameAr: partner.nameAr,
      nameEn: partner.nameEn,
      row: partner.row
    });
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black mb-2">{isAr ? "إدارة الشركاء" : "Manage Partners"}</h1>
          <p className="text-white/40 text-sm">{isAr ? "إضافة أو تعديل أسماء الشركات في شريط التمرير" : "Add or edit company names in the marquee banner"}</p>
        </div>
        
        <button 
          onClick={() => {
            setIsAdding(true);
            setEditingId(null);
            setFormData({ nameAr: "", nameEn: "", row: 1 });
          }}
          className="flex items-center gap-2 px-6 py-3 bg-[#F58220] text-black font-bold rounded-xl hover:scale-105 transition-all shadow-lg shadow-[#F58220]/20"
        >
          <Plus size={20} />
          {isAr ? "إضافة شريك جديد" : "Add New Partner"}
        </button>
      </div>

      {/* Form Area */}
      <AnimatePresence>
        {(isAdding || editingId) && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-card p-8 border border-[#F58220]/30 bg-[#F58220]/5"
          >
            <form onSubmit={editingId ? (e) => { e.preventDefault(); handleUpdate(editingId); } : handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-white/40 tracking-widest px-1">{isAr ? "الاسم بالعربية" : "Name in Arabic"}</label>
                <input 
                  required
                  value={formData.nameAr}
                  onChange={(e) => setFormData({...formData, nameAr: e.target.value})}
                  className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-[#F58220] transition-all"
                  placeholder="مثال: شركة سابك"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-white/40 tracking-widest px-1">{isAr ? "الاسم بالإنجليزية" : "Name in English"}</label>
                <input 
                  required
                  value={formData.nameEn}
                  onChange={(e) => setFormData({...formData, nameEn: e.target.value})}
                  className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-[#F58220] transition-all"
                  placeholder="Example: SABIC"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-white/40 tracking-widest px-1">{isAr ? "الصف" : "Row"}</label>
                <select 
                  value={formData.row}
                  onChange={(e) => setFormData({...formData, row: parseInt(e.target.value)})}
                  className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-[#F58220] transition-all"
                  title={isAr ? "اختيار الصف" : "Select Row"}
                >
                  <option value={1}>{isAr ? "الصف العلوي" : "Top Row"}</option>
                  <option value={2}>{isAr ? "الصف السفلي" : "Bottom Row"}</option>
                </select>
              </div>
              
              <div className="md:col-span-3 flex justify-end gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => { setIsAdding(false); setEditingId(null); }}
                  className="px-6 py-2 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-sm font-bold"
                >
                  {isAr ? "إلغاء" : "Cancel"}
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="px-8 py-2 rounded-xl bg-[#F58220] text-black font-black text-sm hover:scale-105 transition-all flex items-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : (editingId ? <Save size={18} /> : <Plus size={18} />)}
                  {editingId ? (isAr ? "حفظ التعديلات" : "Save Changes") : (isAr ? "إضافة" : "Add")}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Partners List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && partners.length === 0 ? (
          <div className="col-span-full py-20 flex flex-col items-center gap-4">
            <Loader2 className="animate-spin text-[#F58220]" size={40} />
            <span className="text-white/40 font-bold">{isAr ? "جاري التحميل..." : "Loading Partners..."}</span>
          </div>
        ) : partners.length === 0 ? (
          <div className="col-span-full py-20 flex flex-col items-center gap-6 glass-card border-dashed">
            <Building2 size={60} className="text-white/10" />
            <div className="text-center">
              <p className="text-white/40 font-bold mb-2">{isAr ? "لا يوجد شركاء مضافين حالياً" : "No partners added yet"}</p>
              <p className="text-xs text-white/20 uppercase tracking-[0.2em]">{isAr ? "سيظهر الشريط القديم بشكل افتراضي" : "Old banner will show as fallback"}</p>
            </div>
          </div>
        ) : (
          partners.map((partner) => (
            <motion.div 
              key={partner._id}
              layout
              className="glass-card p-6 border border-white/10 hover:border-[#F58220]/30 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#F58220]/10 flex items-center justify-center text-[#F58220]">
                  <Building2 size={20} />
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => startEdit(partner)}
                    className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors"
                    title={isAr ? "تعديل" : "Edit"}
                  >
                    <Edit3 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(partner._id)}
                    className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                    title={isAr ? "حذف" : "Delete"}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div className="space-y-1">
                <h3 className="font-bold text-white text-lg">{partner.nameAr}</h3>
                <p className="text-white/40 text-sm uppercase tracking-wider font-medium">{partner.nameEn}</p>
              </div>
              
              <div className="mt-6 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white/20">
                <span>{partner.row === 1 ? (isAr ? "الصف العلوي" : "Top Row") : (isAr ? "الصف السفلي" : "Bottom Row")}</span>
                <span className="px-2 py-0.5 bg-white/5 rounded border border-white/10">ID: {partner._id.slice(-4)}</span>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {partners.length > 0 && (
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex gap-4 items-center">
          <AlertTriangle className="text-blue-400 shrink-0" size={24} />
          <p className="text-xs text-blue-200/60 leading-relaxed font-bold">
            {isAr 
              ? "سيتم تحديث الشريط في الصفحة الرئيسية فوراً بعد أي تغيير هنا. تأكد من توزيع الشركات بشكل متساوٍ بين الصفين الأول والثاني لمظهر أفضل." 
              : "The marquee on the home page will update immediately after any changes here. Ensure a balanced distribution between the top and bottom rows for the best visual experience."}
          </p>
        </div>
      )}
    </div>
  );
}
