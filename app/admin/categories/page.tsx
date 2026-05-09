"use client";

import { useEffect, useState } from "react";
import { getCategories } from "@/actions/admin/categories";
import { CategoryManager } from "@/components/admin/CategoryManager";
import { useLanguage } from "@/context/LanguageContext";

export default function AdminCategoriesPage() {
  const { locale } = useLanguage();
  const isAr = locale === "ar";
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <div className="space-y-10 text-start">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-white tracking-tighter">
          {isAr ? "إدارة الأقسام" : "Categories Management"}
        </h1>
        <p className="text-white/40 mt-2 text-lg">
          {isAr ? "إدارة الأقسام الخاصة بالمنتجات والمشاريع." : "Manage categories for both products and projects."}
        </p>
      </div>

      <CategoryManager initialCategories={categories} />
    </div>
  );
}
