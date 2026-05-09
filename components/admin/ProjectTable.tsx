"use client";

import { useState } from "react";
import { Loader2, Trash2, Plus, Edit2, X, ImageIcon, Layers } from "lucide-react";
import { createProject, deleteProject, updateProject } from "@/actions/admin/projects";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

interface Category {
  _id: string;
  nameAr: string;
  nameEn: string;
  type: string;
}

interface Project {
  _id: string;
  name: string;
  descriptionEnglish: string;
  descriptionArabic: string;
  images: string[];
  category?: string;
  options: string[];
}

interface FormFieldsProps {
  project?: Project;
  categories: Category[];
  onRemoveImage: (index: number) => void;
  isAr: boolean;
}

const FormFields = ({ project, categories, onRemoveImage, isAr }: FormFieldsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-start" dir={isAr ? "rtl" : "ltr"}>
    <input type="hidden" name="images" value={project?.images.join(",") || ""} />
    
    <div className="space-y-2">
      <label htmlFor="name" className="block text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
        {isAr ? "اسم المشروع" : "Project Name"}
      </label>
      <input 
        id="name"
        type="text" 
        name="name" 
        defaultValue={project?.name}
        required 
        placeholder={isAr ? "أدخل اسم المشروع" : "Enter project name"}
        title={isAr ? "اسم المشروع" : "Project Name"}
        className="w-full h-14 px-5 rounded-2xl border border-white/10 bg-white/5 outline-none focus:border-[#F58220] transition-all text-white text-sm" 
      />
    </div>

    <div className="space-y-2">
      <label htmlFor="category" className="block text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
        {isAr ? "القسم التابع له" : "Belongs to Category"}
      </label>
      <div className="relative">
        <select 
          id="category"
          name="category" 
          defaultValue={project?.category}
          title={isAr ? "اختر القسم" : "Select Category"}
          className="w-full h-14 px-5 rounded-2xl border border-white/10 bg-white/5 outline-none focus:border-[#F58220] transition-all text-white appearance-none text-sm"
        >
          <option value="" className="bg-[#0f0f0f]">{isAr ? "بدون قسم" : "No Category"}</option>
          {categories.filter((c) => c.type === 'project').map((c) => (
            <option key={c._id} value={c._id} className="bg-[#0f0f0f]">{isAr ? c.nameAr : c.nameEn}</option>
          ))}
        </select>
        <div className={`absolute inset-y-0 ${isAr ? 'left-4' : 'right-4'} flex items-center pointer-events-none text-white/20`}>
          <Layers size={16} />
        </div>
      </div>
    </div>

    <div className="md:col-span-2 space-y-4">
      <label htmlFor="imageUpload" className="block text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
        {isAr ? "إدارة صور المشروع" : "Project Images Management"}
      </label>
      
      {project?.images && project.images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
          {project.images.map((img, i) => (
            <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group cursor-pointer transition-all active:scale-95">
              <Image src={img} alt={`Preview ${i + 1}`} fill className="object-cover transition-transform group-hover:scale-110" />
              <button 
                type="button"
                onClick={() => onRemoveImage(i)}
                title={isAr ? "حذف الصورة" : "Remove image"}
                className="absolute inset-0 bg-red-600/80 text-white opacity-0 lg:group-hover:opacity-100 group-active:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]"
              >
                <Trash2 size={24} className="scale-0 group-hover:scale-100 group-active:scale-100 transition-transform duration-300" />
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className="relative group">
        <input 
          id="imageUpload"
          type="file" 
          accept="image/*"
          multiple
          title={isAr ? "تحميل صور جديدة للمشروع" : "Upload new project images"}
          className="absolute inset-0 opacity-0 cursor-pointer z-10" 
        />
        <div className="w-full h-32 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-2 group-hover:border-[#F58220]/50 group-hover:bg-[#F58220]/5 transition-all">
          <ImageIcon className="text-[#F58220] group-hover:scale-110 transition-transform" size={32} />
          <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
            {isAr ? "اضغط هنا لتحميل صور المشروع أو اسحبها" : "Click or drag images to upload"}
          </span>
        </div>
      </div>
    </div>

    <div className="space-y-2">
      <label htmlFor="descriptionAr" className="block text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
        {isAr ? "وصف المشروع (بالعربية)" : "Description (Arabic)"}
      </label>
      <textarea 
        id="descriptionAr"
        name="descriptionArabic" 
        defaultValue={project?.descriptionArabic}
        required 
        rows={4} 
        placeholder={isAr ? "اشرح تفاصيل المشروع المنفذ بالعربية..." : "Describe the executed project details here..."}
        title={isAr ? "الوصف بالعربية" : "Description in Arabic"}
        className="w-full p-5 rounded-2xl border border-white/10 bg-white/5 outline-none focus:border-[#F58220] transition-all text-white text-sm leading-relaxed"
      ></textarea>
    </div>

    <div className="space-y-2">
      <label htmlFor="descriptionEn" className="block text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
        {isAr ? "وصف المشروع (بالإنجليزية)" : "Description (English)"}
      </label>
      <textarea 
        id="descriptionEn"
        name="descriptionEnglish" 
        defaultValue={project?.descriptionEnglish}
        required 
        rows={4} 
        placeholder="Describe the project in English..."
        title="Description in English"
        className="w-full p-5 rounded-2xl border border-white/10 bg-white/5 outline-none focus:border-[#F58220] transition-all text-white text-sm leading-relaxed"
      ></textarea>
    </div>

    <div className="md:col-span-2 space-y-2">
      <label htmlFor="options" className="block text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
        {isAr ? "المواد المستخدمة / تفاصيل إضافية (افصل بينهم بفاصلة)" : "Materials Used / Details (comma separated)"}
      </label>
      <input 
        id="options"
        type="text" 
        name="options" 
        defaultValue={project?.options.join(", ")}
        placeholder={isAr ? "مثال: لوحات مضيئة، كلادينج، حروف بارزة" : "e.g. Light boxes, Cladding, Raised letters"}
        title={isAr ? "خيارات المشروع" : "Project Options"}
        className="w-full h-14 px-5 rounded-2xl border border-white/10 bg-white/5 outline-none focus:border-[#F58220] transition-all text-white text-sm" 
      />
    </div>
  </div>
);

export const ProjectTable = ({ projects, categories }: { projects: Project[], categories: Category[] }) => {
  const { locale } = useLanguage();
  const isAr = locale === "ar";
  const [loading, setLoading] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleDelete = async (id: string) => {
    const msg = isAr ? "هل أنت متأكد من حذف هذا المشروع؟" : "Are you sure you want to delete this project?";
    if (!confirm(msg)) return;
    setLoading(id);
    await deleteProject(id);
    setLoading(null);
  };

  const handleAction = async (e: React.FormEvent<HTMLFormElement>, isEdit: boolean) => {
    e.preventDefault();
    setSubmitLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const fileInput = form.querySelector('input[type="file"]') as HTMLInputElement;
    let newImages: string[] = [];
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const files = Array.from(fileInput.files);
      const base64Promises = files.map(file => new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      }));
      newImages = await Promise.all(base64Promises);
    }

    const existingImagesStr = formData.get("images") as string;
    const existingImages = existingImagesStr ? existingImagesStr.split(",").filter(Boolean) : [];
    
    const combinedImages = [...existingImages, ...newImages].join(",");
    formData.set("images", combinedImages);

    const res = isEdit && editingProject
      ? await updateProject(editingProject._id, formData)
      : await createProject(formData);

    setSubmitLoading(false);
    if (res.success) {
      setIsAdding(false);
      setEditingProject(null);
      window.location.reload();
    } else {
      alert(res.error || (isAr ? "فشلت العملية" : "Failed to process"));
    }
  };

  const onRemoveImage = (index: number) => {
    if (editingProject) {
      setEditingProject({
        ...editingProject,
        images: editingProject.images.filter((_, idx) => idx !== index)
      });
    }
  };

  return (
    <div className="space-y-8" dir={isAr ? "rtl" : "ltr"}>
      <div className="flex justify-between items-center bg-white/5 p-6 rounded-3xl border border-white/5">
        <h2 className="text-xl font-black text-white flex items-center gap-3">
          <ImageIcon className="text-[#F58220]" />
          {isAr ? "سجل المشاريع المنفذة" : "Executed Projects Portfolio"}
          <span className="bg-[#F58220]/20 text-[#F58220] px-3 py-1 rounded-full text-[10px] tracking-widest">{projects.length}</span>
        </h2>
        <button 
          onClick={() => {
            setIsAdding(!isAdding);
            setEditingProject(null);
          }}
          className="flex items-center gap-3 glow-button-primary font-black uppercase tracking-widest text-[10px] px-8 py-4 rounded-2xl transition-all"
        >
          {isAdding ? <X size={16} /> : <Plus size={16} />}
          {isAdding ? (isAr ? "إلغاء" : "Cancel") : (isAr ? "إضافة مشروع جديد" : "Add Project")}
        </button>
      </div>

      {(isAdding || editingProject) && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-10 mb-8 border-[#F58220]/20"
        >
          <div className="flex items-center gap-3 mb-10 pb-6 border-b border-white/5">
            <div className="w-10 h-10 rounded-full bg-[#F58220]/20 flex items-center justify-center text-[#F58220]">
              {editingProject ? <Edit2 size={20} /> : <Plus size={20} />}
            </div>
            <h3 className="text-2xl font-black text-white">
              {editingProject ? (isAr ? `تعديل مشروع: ${editingProject.name}` : `Editing: ${editingProject.name}`) : (isAr ? "توثيق مشروع جديد في المحفظة" : "Document New Project in Portfolio")}
            </h3>
          </div>
          
          <form onSubmit={(e) => handleAction(e, !!editingProject)}>
            <FormFields 
              project={editingProject || undefined} 
              categories={categories}
              onRemoveImage={onRemoveImage}
              isAr={isAr}
            />
            
            <div className={`flex justify-end gap-4 mt-12 pt-8 border-t border-white/5 ${isAr ? 'flex-row-reverse' : ''}`}>
              <button 
                type="button" 
                onClick={() => {
                  setIsAdding(false);
                  setEditingProject(null);
                }} 
                className="px-8 py-4 font-black text-white/40 hover:text-white uppercase tracking-widest text-[10px] transition-colors"
              >
                {isAr ? "إلغاء التعديلات" : "Cancel Changes"}
              </button>
              <button 
                type="submit" 
                disabled={submitLoading} 
                className="glow-button-primary px-12 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] disabled:opacity-50 flex items-center gap-3"
              >
                {submitLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {editingProject ? (isAr ? "حفظ التغييرات" : "Save Changes") : (isAr ? "إضافة المشروع الآن" : "Add Project Now")}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="glass-card overflow-hidden border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-start border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[10px] text-white/30 uppercase tracking-[0.2em]">
                <th className="px-8 py-6 font-black">{isAr ? "المشروع" : "Project"}</th>
                <th className="px-8 py-6 font-black">{isAr ? "القسم" : "Category"}</th>
                <th className="px-8 py-6 font-black">{isAr ? "الصور" : "Images"}</th>
                <th className={`px-8 py-6 font-black ${isAr ? 'text-start' : 'text-right'}`}>{isAr ? "الإجراءات" : "Actions"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.map((proj) => (
                <tr key={proj._id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0">
                        {proj.images?.[0] ? (
                          <Image src={proj.images[0]} alt={proj.name} width={48} height={48} className="object-cover w-full h-full" />
                        ) : (
                          <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/10">
                            <ImageIcon size={20} />
                          </div>
                        )}
                      </div>
                      <span className="font-bold text-white text-base">{proj.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-white/60 text-sm bg-white/5 px-3 py-1 rounded-lg border border-white/5">
                      {isAr 
                        ? (categories.find(c => c._id === proj.category)?.nameAr || 'غير محدد')
                        : (categories.find(c => c._id === proj.category)?.nameEn || 'N/A')}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-3 rtl:space-x-reverse">
                        {proj.images?.slice(0, 3).map((img, idx) => (
                          <div key={idx} className="w-8 h-8 rounded-full border-2 border-(--background) overflow-hidden">
                            <Image src={img} alt="img" width={32} height={32} className="object-cover w-full h-full" />
                          </div>
                        ))}
                      </div>
                      <span className="text-[10px] font-black text-[#F58220] uppercase tracking-widest ms-2">
                        +{proj.images?.length || 0}
                      </span>
                    </div>
                  </td>
                  <td className={`px-8 py-6 ${isAr ? 'text-start' : 'text-right'}`}>
                    <div className={`flex items-center gap-3 ${isAr ? 'justify-start' : 'justify-end'}`}>
                      <button 
                        onClick={() => {
                          setEditingProject(proj);
                          setIsAdding(false);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="p-3 text-white/20 hover:text-[#F58220] hover:bg-[#F58220]/10 rounded-xl transition-all"
                        title={isAr ? "تعديل المشروع" : "Edit Project"}
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(proj._id)}
                        disabled={loading === proj._id}
                        className="p-3 text-white/20 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all disabled:opacity-50"
                        title={isAr ? "حذف المشروع" : "Delete Project"}
                      >
                        {loading === proj._id ? <Loader2 className="w-5 h-5 animate-spin text-[#F58220]" /> : <Trash2 size={18} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center text-white/20 font-black uppercase tracking-[0.3em] text-xs italic">
                    {isAr ? "لا توجد مشاريع مضافة حالياً" : "No projects found in portfolio."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
