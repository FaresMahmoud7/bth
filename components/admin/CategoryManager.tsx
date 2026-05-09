"use client";

import { useState, useEffect } from "react";
import { Loader2, Trash2, Plus, Edit2, X, ImageIcon, Layers, Check } from "lucide-react";
import { createCategory, deleteCategory, updateCategory, getCategories } from "@/actions/admin/categories";
import { validateTextLanguage } from "@/lib/validation";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

interface Category {
  _id: string;
  nameAr: string;
  nameEn: string;
  type: string;
  image?: string;
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800";

export const CategoryManager = ({ initialCategories }: { initialCategories: Category[] }) => {
  const { locale } = useLanguage();
  const isAr = locale === "ar";
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [loading, setLoading] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const [errors, setErrors] = useState<{nameAr?: string; nameEn?: string}>({});
  useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);

  useEffect(() => {
    if (editingCategory) {
      setPreviewImage(editingCategory.image || null);
      setErrors({}); // Reset errors on edit
    } else {
      setPreviewImage(null);
      setErrors({});
    }
  }, [editingCategory]);

  const handleValidation = (name: string, value: string, lang: 'ar' | 'en') => {
    const { isValid, error } = validateTextLanguage(value, lang);
    setErrors(prev => ({
      ...prev,
      [name]: isValid ? undefined : error
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitLoading || errors.nameAr || errors.nameEn) return;
    setSubmitLoading(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append("categoryImage", previewImage || "");

    const res = editingCategory 
      ? await updateCategory(editingCategory._id, formData)
      : await createCategory(formData);

    if (res.success) {
      const updated = await getCategories();
      setCategories(updated);
      setIsAdding(false);
      setEditingCategory(null);
      setPreviewImage(null);
      window.location.reload();
    } else {
      setSubmitLoading(false);
      alert(res.error || "Operation failed");
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm(isAr ? "هل أنت متأكد من الحذف؟" : "Are you sure?")) return;
    setLoading(id);
    const res = await deleteCategory(id);
    if (res.success) {
      setCategories(categories.filter(c => c._id !== id));
    }
    setLoading(null);
  };

  return (
    <div className="space-y-8" dir={isAr ? "rtl" : "ltr"}>
      <div className="flex justify-between items-center bg-white/5 p-6 rounded-3xl border border-white/5">
        <h2 className="text-xl font-black text-white flex items-center gap-3">
          <Layers className="text-[#F58220]" />
          {isAr ? "إدارة الأقسام" : "Category Management"}
        </h2>
        <button onClick={() => { setIsAdding(!isAdding); setEditingCategory(null); }} className="glow-button-primary font-black uppercase tracking-widest text-[10px] px-8 py-4 rounded-2xl flex items-center gap-2">
          {isAdding ? <X size={16} /> : <Plus size={16} />}
          {isAdding ? (isAr ? "إلغاء" : "Cancel") : (isAr ? "أضف قسم" : "Add Category")}
        </button>
      </div>

      <AnimatePresence>
        {(isAdding || editingCategory) && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="glass-card p-10 border-[#F58220]/20">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-start">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-white/30 uppercase tracking-widest">{isAr ? "الاسم (عربي)" : "Name (Ar)"}</label>
                  <input 
                    id="nameAr" 
                    name="nameAr" 
                    defaultValue={editingCategory?.nameAr} 
                    onChange={(e) => handleValidation('nameAr', e.target.value, 'ar')}
                    required 
                    placeholder={isAr ? "أدخل الاسم بالعربية" : "Enter Arabic name"} 
                    title={isAr ? "الاسم بالعربية" : "Arabic Name"} 
                    className={`w-full h-14 px-5 rounded-2xl border ${errors.nameAr ? 'border-red-500 bg-red-500/5' : 'border-white/10 bg-white/5'} outline-none focus:border-[#F58220] transition-all text-white`} 
                  />
                  {errors.nameAr && <p className="text-red-500 text-xs font-bold mt-1">{errors.nameAr}</p>}
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-white/30 uppercase tracking-widest">{isAr ? "الاسم (إنجليزي)" : "Name (En)"}</label>
                  <input 
                    id="nameEn" 
                    name="nameEn" 
                    defaultValue={editingCategory?.nameEn} 
                    onChange={(e) => handleValidation('nameEn', e.target.value, 'en')}
                    required 
                    placeholder={isAr ? "أدخل الاسم بالإنجليزية" : "Enter English name"} 
                    title={isAr ? "الاسم بالإنجليزية" : "English Name"} 
                    className={`w-full h-14 px-5 rounded-2xl border ${errors.nameEn ? 'border-red-500 bg-red-500/5' : 'border-white/10 bg-white/5'} outline-none focus:border-[#F58220] transition-all text-white`} 
                  />
                  {errors.nameEn && <p className="text-red-500 text-xs font-bold mt-1">{errors.nameEn}</p>}
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-white/30 uppercase tracking-widest">{isAr ? "النوع" : "Type"}</label>
                  <select id="type" name="type" defaultValue={editingCategory?.type || "product"} title={isAr ? "اختر النوع" : "Select Type"} className="w-full h-14 px-5 rounded-2xl border border-white/10 bg-white/5 text-white outline-none">
                    <option value="product" className="bg-black">Product/Service</option>
                    <option value="project" className="bg-black">Project</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="block text-[10px] font-black text-white/30 uppercase tracking-widest">{isAr ? "صورة القسم" : "Category Image"}</label>
                  <div className="flex items-center gap-6">
                    <div className="relative w-32 h-20 rounded-xl overflow-hidden border border-white/10 bg-zinc-900 group">
                      {previewImage ? (
                        <Image src={previewImage} alt="Preview" fill className={`object-cover ${submitLoading ? 'blur-sm' : ''}`} unoptimized={true} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/10"><ImageIcon size={24} /></div>
                      )}
                      {submitLoading && <div className="absolute inset-0 flex items-center justify-center bg-black/40"><Loader2 className="animate-spin text-[#F58220]" size={16} /></div>}
                    </div>
                    <label className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl cursor-pointer text-[10px] font-black uppercase tracking-widest transition-all">
                      {isAr ? "تغيير الصورة" : "Change Image"}
                      <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-8 border-t border-white/5">
                <button type="button" onClick={() => { setIsAdding(false); setEditingCategory(null); }} className="px-8 py-4 font-black text-white/40 uppercase text-[10px]">{isAr ? "إلغاء" : "Cancel"}</button>
                <button type="submit" disabled={submitLoading || !!errors.nameAr || !!errors.nameEn} className="glow-button-primary px-12 py-4 rounded-2xl font-black uppercase text-[10px] disabled:opacity-50 flex items-center gap-2">
                  {submitLoading ? <Loader2 className="animate-spin" size={16} /> : <Check size={16} />}
                  {isAr ? "حفظ القسم" : "Save Category"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category._id} className="glass-card overflow-hidden group hover:border-[#F58220]/50 transition-all flex flex-col">
            <div className="relative aspect-video bg-zinc-900 overflow-hidden">
              <Image 
                src={category.image || FALLBACK_IMAGE} 
                alt={category.nameEn} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
                unoptimized={true}
              />
            </div>
            <div className="p-6 flex items-center justify-between bg-white/5 text-start">
              <div>
                <h4 className="text-lg font-bold text-white line-clamp-1">{isAr ? category.nameAr : category.nameEn}</h4>
                <span className="text-[8px] font-black uppercase tracking-widest text-[#F58220]/60">{category.type}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setEditingCategory(category); setIsAdding(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="p-2 text-white/20 hover:text-[#F58220] transition-colors" title={isAr ? "تعديل" : "Edit"} aria-label={isAr ? "تعديل" : "Edit"}><Edit2 size={16} /></button>
                <button onClick={() => handleDelete(category._id)} disabled={loading === category._id} className="p-2 text-white/20 hover:text-red-500 transition-colors" title={isAr ? "حذف" : "Delete"} aria-label={isAr ? "حذف" : "Delete"}>{loading === category._id ? <Loader2 className="animate-spin" size={16} /> : <Trash2 size={16} />}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
