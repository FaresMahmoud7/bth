import { getProducts } from "@/actions/admin/products";
import { getCategories } from "@/actions/admin/categories";
import { ProductTable } from "@/components/admin/ProductTable";
import connectToDatabase from "@/lib/db";

export default async function AdminProductsPage() {
  await connectToDatabase();
  const products = await getProducts();
  const categories = await getCategories('product');

  return (
    <div className="space-y-10">
      <div className="text-start">
        <h1 className="text-4xl font-black text-white tracking-tighter uppercase">إدارة المنتجات</h1>
        <p className="text-white/40 mt-2 text-lg font-bold">إضافة وتعديل وحذف المنتجات المعروضة في الكتالوج العام.</p>
      </div>

      <ProductTable products={products} categories={categories} />
    </div>
  );
}
