"use client";

import { useState, useRef } from "react";
import { Loader2, Trash2, Plus, Edit2, X, ImageIcon, Check } from "lucide-react";
import { createProduct, deleteProduct, updateProduct } from "@/actions/admin/products";
import { validateTextLanguage } from "@/lib/validation";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

interface Category {
  _id: string;
  nameAr: string;
  nameEn: string;
  type: string;
}

interface Product {
  _id: string;
  name: string;
  descriptionEnglish: string;
  descriptionArabic: string;
  images: string[];
  category?: string;
  options: string[];
}



export const ProductTable = ({ products, categories }: { products: Product[], categories: Category[] }) => {
  const { locale } = useLanguage();
  const isAr = locale === "ar";
  const [loading, setLoading] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  
  const [errors, setErrors] = useState<{descriptionArabic?: string; descriptionEnglish?: string}>({});
  
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);



  const handleValidation = (name: string, value: string, lang: 'ar' | 'en') => {
    const { isValid, error } = validateTextLanguage(value, lang);
    setErrors(prev => ({
      ...prev,
      [name]: isValid ? undefined : error
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const promises = fileArray.map(file => new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      }));
      
      Promise.all(promises).then(base64s => {
        setPreviews(prev => [...prev, ...base64s]);
      });
    }
  };

  const handleDelete = async (id: string) => {
    const msg = isAr ? "هل أنت متأكد من حذف هذا المنتج؟" : "Are you sure you want to delete this product?";
    if (!confirm(msg)) return;
    setLoading(id);
    await deleteProduct(id);
    setLoading(null);
  };

  const handleAction = async (e: React.FormEvent<HTMLFormElement>, isEdit: boolean) => {
    e.preventDefault();
    if (submitLoading || errors.descriptionArabic || errors.descriptionEnglish) return;
    setSubmitLoading(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const existingImagesStr = formData.get("images") as string;
    const existingImages = existingImagesStr ? existingImagesStr.split("|||").filter(img => img.trim() !== "") : [];
    
    const combinedImages = [...existingImages, ...previews].join("|||");
    formData.set("images", combinedImages);

    const res = isEdit && editingProduct
      ? await updateProduct(editingProduct._id, formData)
      : await createProduct(formData);

    if (res.success) {
      setIsAdding(false);
      setEditingProduct(null);
      setPreviews([]);
      window.location.reload();
    } else {
      setSubmitLoading(false);
      alert(res.error || (isAr ? "فشلت العملية" : "Failed to process"));
    }
  };

  const removeExistingImage = (index: number) => {
    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        images: editingProduct.images.filter((_, idx) => idx !== index)
      });
    }
  };

  const removePreviewImage = (index: number) => {
    setPreviews(prev => prev.filter((_, idx) => idx !== index));
  };

  return (
    <div className="space-y-8" dir={isAr ? "rtl" : "ltr"}>
      <div className="flex justify-between items-center bg-white/5 p-6 rounded-3xl border border-white/5">
        <h2 className="text-xl font-black text-white flex items-center gap-3">
          <ImageIcon className="text-[#F58220]" />
          {isAr ? "قائمة الخدمات الحالية" : "Current Services List"}
          <span className="bg-[#F58220]/20 text-[#F58220] px-3 py-1 rounded-full text-[10px] tracking-widest">{products.length}</span>
        </h2>
        <button onClick={() => { 
          setIsAdding(!isAdding); 
          setEditingProduct(null); 
          setPreviews([]); 
          setErrors({});
        }} className="flex items-center gap-3 glow-button-primary font-black uppercase tracking-widest text-[10px] px-8 py-4 rounded-2xl transition-all">
          {isAdding ? <X size={16} /> : <Plus size={16} />}
          {isAdding ? (isAr ? "إلغاء" : "Cancel") : (isAr ? "إضافة خدمة جديدة" : "Add Service")}
        </button>
      </div>

      <AnimatePresence>
        {(isAdding || editingProduct) && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="glass-card p-10 mb-8 border-[#F58220]/20">
            <h3 className="text-2xl font-black text-white text-start mb-10 pb-6 border-b border-white/5">
              {editingProduct ? (isAr ? `تعديل: ${editingProduct.name}` : `Editing: ${editingProduct.name}`) : (isAr ? "إضافة خدمة جديدة للكتالوج" : "Add New Service to Catalog")}
            </h3>
            
            <form onSubmit={(e) => handleAction(e, !!editingProduct)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-start">
                <input type="hidden" name="images" value={editingProduct?.images.join("|||") || ""} />
                
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{isAr ? "اسم الخدمة" : "Service Name"}</label>
                  <input id="name" type="text" name="name" defaultValue={editingProduct?.name} required placeholder={isAr ? "أدخل اسم الخدمة" : "Enter service name"} title={isAr ? "اسم الخدمة" : "Service Name"} className="w-full h-14 px-5 rounded-2xl border border-white/10 bg-white/5 outline-none focus:border-[#F58220] transition-all text-white text-sm" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="category" className="block text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{isAr ? "القسم" : "Category"}</label>
                  <select id="category" name="category" defaultValue={editingProduct?.category} title={isAr ? "اختر القسم" : "Select Category"} className="w-full h-14 px-5 rounded-2xl border border-white/10 bg-white/5 outline-none focus:border-[#F58220] transition-all text-white appearance-none text-sm">
                    <option value="">{isAr ? "بدون قسم" : "No Category"}</option>
                    {categories.filter(c => c.type === 'product').map(c => (<option key={c._id} value={c._id}>{isAr ? c.nameAr : c.nameEn}</option>))}
                  </select>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{isAr ? "الصور" : "Images"}</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                    {editingProduct?.images.filter(img => img.trim() !== "").map((img, i) => (
                      <div key={`ex-${i}`} className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group cursor-pointer transition-all active:scale-95">
                        <Image src={img} alt="img" fill className="object-cover" unoptimized={true} />
                        <button 
                          type="button" 
                          onClick={() => removeExistingImage(i)} 
                          title={isAr ? "حذف الصورة" : "Remove Image"} 
                          aria-label={isAr ? "حذف الصورة" : "Remove Image"} 
                          className="absolute inset-0 bg-red-600/80 text-white opacity-0 lg:group-hover:opacity-100 group-active:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]"
                        >
                          <Trash2 size={24} className="scale-0 group-hover:scale-100 group-active:scale-100 transition-transform duration-300" />
                        </button>
                      </div>
                    ))}
                    {previews.map((img, i) => (
                      <div key={`pre-${i}`} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-[#F58220]/30 group">
                        <Image src={img} alt="pre" fill className="object-cover blur-[2px]" unoptimized={true} />
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-1">
                          <Loader2 className="animate-spin text-[#F58220]" size={20} /><span className="text-[8px] font-black uppercase text-white tracking-widest">{isAr ? "جاري الرفع" : "Uploading"}</span>
                        </div>
                        <button type="button" onClick={() => removePreviewImage(i)} title={isAr ? "إلغاء الصورة" : "Cancel Preview"} aria-label={isAr ? "إلغاء الصورة" : "Cancel Preview"} className="absolute top-2 right-2 p-1 bg-black/60 rounded-full text-white"><X size={12} /></button>
                      </div>
                    ))}
                    <div onClick={() => fileInputRef.current?.click()} className="aspect-square border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#F58220]/50 hover:bg-[#F58220]/5 transition-all group">
                      <ImageIcon className="text-white/20 group-hover:text-[#F58220]" size={24} /><span className="text-[8px] font-black uppercase text-white/20 tracking-widest text-center px-2">{isAr ? "أضف صور" : "Add Photos"}</span>
                    </div>
                  </div>
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" multiple title={isAr ? "تحميل الصور" : "Upload Photos"} className="hidden" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="descriptionArabic" className="block text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{isAr ? "الوصف (عربي)" : "Arabic Desc"}</label>
                  <textarea 
                    id="descriptionArabic" 
                    name="descriptionArabic" 
                    defaultValue={editingProduct?.descriptionArabic} 
                    onChange={(e) => handleValidation('descriptionArabic', e.target.value, 'ar')}
                    required 
                    rows={4} 
                    placeholder={isAr ? "وصف الخدمة بالعربية" : "Arabic description"} 
                    title={isAr ? "الوصف بالعربية" : "Arabic Description"} 
                    className={`w-full p-5 rounded-2xl border ${errors.descriptionArabic ? 'border-red-500 bg-red-500/5' : 'border-white/10 bg-white/5'} outline-none focus:border-[#F58220] transition-all text-white text-sm`} 
                  />
                  {errors.descriptionArabic && <p className="text-red-500 text-xs font-bold mt-1">{errors.descriptionArabic}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="descriptionEnglish" className="block text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{isAr ? "الوصف (إنجليزي)" : "English Desc"}</label>
                  <textarea 
                    id="descriptionEnglish" 
                    name="descriptionEnglish" 
                    defaultValue={editingProduct?.descriptionEnglish} 
                    onChange={(e) => handleValidation('descriptionEnglish', e.target.value, 'en')}
                    required 
                    rows={4} 
                    placeholder="English description" 
                    title="English Description" 
                    className={`w-full p-5 rounded-2xl border ${errors.descriptionEnglish ? 'border-red-500 bg-red-500/5' : 'border-white/10 bg-white/5'} outline-none focus:border-[#F58220] transition-all text-white text-sm`} 
                  />
                  {errors.descriptionEnglish && <p className="text-red-500 text-xs font-bold mt-1">{errors.descriptionEnglish}</p>}
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-12 pt-8 border-t border-white/5">
                <button type="button" onClick={() => { setIsAdding(false); setEditingProduct(null); }} className="px-8 py-4 font-black text-white/40 uppercase tracking-widest text-[10px]">{isAr ? "إلغاء" : "Cancel"}</button>
                <button type="submit" disabled={submitLoading || !!errors.descriptionArabic || !!errors.descriptionEnglish} className="glow-button-primary px-12 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] disabled:opacity-50 flex items-center gap-3">
                  {submitLoading ? <Loader2 className="animate-spin" size={16} /> : <Check size={16} />}
                  {editingProduct ? (isAr ? "حفظ التغييرات" : "Save Changes") : (isAr ? "إضافة الخدمة الآن" : "Add Service Now")}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass-card overflow-hidden border-white/5">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-start border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[10px] text-white/30 uppercase tracking-[0.2em]">
                <th className="px-8 py-6 font-black">{isAr ? "الخدمة" : "Service"}</th>
                <th className="px-8 py-6 font-black">{isAr ? "القسم" : "Category"}</th>
                <th className="px-8 py-6 font-black">{isAr ? "الصور" : "Images"}</th>
                <th className={`px-8 py-6 font-black ${isAr ? 'text-start' : 'text-right'}`}>{isAr ? "الإجراءات" : "Actions"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map((prod) => (
                <tr key={prod._id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0">
                        {prod.images?.[0] ? <Image src={prod.images[0]} alt={prod.name} width={48} height={48} className="object-cover w-full h-full" unoptimized={true} /> : <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/10"><ImageIcon size={20} /></div>}
                      </div>
                      <span className="font-bold text-white text-base">{prod.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6"><span className="text-white/60 text-sm bg-white/5 px-3 py-1 rounded-lg">{isAr ? (categories.find(c => c._id === prod.category)?.nameAr || 'غير محدد') : (categories.find(c => c._id === prod.category)?.nameEn || 'N/A')}</span></td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-3 rtl:space-x-reverse">
                        {prod.images?.slice(0, 3).map((img, idx) => (<div key={idx} className="w-8 h-8 rounded-full border-2 border-(--background) overflow-hidden"><Image src={img} alt="img" width={32} height={32} className="object-cover w-full h-full" unoptimized={true} /></div>))}
                      </div>
                      <span className="text-[10px] font-black text-[#F58220] ms-2">+{prod.images?.length || 0}</span>
                    </div>
                  </td>
                  <td className={`px-8 py-6 ${isAr ? 'text-start' : 'text-right'}`}>
                    <div className={`flex items-center gap-3 ${isAr ? 'justify-start' : 'justify-end'}`}>
                      <button onClick={() => { 
                        setEditingProduct(prod); 
                        setIsAdding(false); 
                        setPreviews([]);
                        setErrors({});
                        window.scrollTo({ top: 0, behavior: "smooth" }); 
                      }} className="p-3 text-white/20 hover:text-[#F58220] hover:bg-[#F58220]/10 rounded-xl transition-all" title={isAr ? "تعديل" : "Edit"} aria-label={isAr ? "تعديل" : "Edit"}><Edit2 size={18} /></button>
                      <button onClick={() => handleDelete(prod._id)} disabled={loading === prod._id} className="p-3 text-white/20 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all disabled:opacity-50" title={isAr ? "حذف" : "Delete"} aria-label={isAr ? "حذف" : "Delete"}>{loading === prod._id ? <Loader2 className="w-5 h-5 animate-spin text-[#F58220]" /> : <Trash2 size={18} />}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-white/5">
          {products.map((prod) => (
            <div key={prod._id} className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-start">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10 shrink-0">
                    {prod.images?.[0] ? <Image src={prod.images[0]} alt={prod.name} width={56} height={56} className="object-cover w-full h-full" unoptimized={true} /> : <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/10"><ImageIcon size={24} /></div>}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">{prod.name}</h4>
                    <span className="text-[10px] text-[#F58220] font-black uppercase tracking-widest">{isAr ? (categories.find(c => c._id === prod.category)?.nameAr || 'غير محدد') : (categories.find(c => c._id === prod.category)?.nameEn || 'N/A')}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { 
                    setEditingProduct(prod); 
                    setIsAdding(false); 
                    setPreviews([]);
                    setErrors({});
                    window.scrollTo({ top: 0, behavior: "smooth" }); 
                  }} className="p-3 text-[#F58220] bg-[#F58220]/10 rounded-xl" title={isAr ? "تعديل" : "Edit"}><Edit2 size={18} /></button>
                  <button onClick={() => handleDelete(prod._id)} disabled={loading === prod._id} className="p-3 text-red-500 bg-red-500/10 rounded-xl" title={isAr ? "حذف" : "Delete"}>{loading === prod._id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 size={18} />}</button>
                </div>
              </div>
              
              <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl">
                <div className="flex -space-x-3 rtl:space-x-reverse">
                  {prod.images?.slice(0, 5).map((img, idx) => (
                    <div key={idx} className="w-8 h-8 rounded-full border-2 border-zinc-900 overflow-hidden">
                      <Image src={img} alt="img" width={32} height={32} className="object-cover w-full h-full" unoptimized={true} />
                    </div>
                  ))}
                </div>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{prod.images?.length || 0} {isAr ? "صور" : "Images"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
