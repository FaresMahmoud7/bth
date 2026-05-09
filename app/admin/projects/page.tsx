import { getProjects } from "@/actions/admin/projects";
import { getCategories } from "@/actions/admin/categories";
import { ProjectTable } from "@/components/admin/ProjectTable";
import connectToDatabase from "@/lib/db";

export default async function AdminProjectsPage() {
  await connectToDatabase();
  const projects = await getProjects();
  const categories = await getCategories('project');

  return (
    <div className="space-y-10">
      <div className="text-start">
        <h1 className="text-4xl font-black text-white tracking-tighter uppercase">إدارة المشاريع</h1>
        <p className="text-white/40 mt-2 text-lg font-bold">إضافة وتعديل وحذف المشاريع المنفذة من المحفظة الأعمال.</p>
      </div>

      <ProjectTable projects={projects} categories={categories} />
    </div>
  );
}
