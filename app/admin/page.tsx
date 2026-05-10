import ProductRequest from "@/models/ProductRequest";
import connectToDatabase from "@/lib/db";
import AdminUser from "@/models/AdminUser";
import PageView from "@/models/PageView";

export default async function AdminDashboard() {
  await connectToDatabase();
  
  const requestCount = await ProductRequest.countDocuments();
  const adminCount = await AdminUser.countDocuments();
  const visitorCount = await PageView.countDocuments();

  return (
    <div className="space-y-10">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-white tracking-tighter">Dashboard Overview</h1>
        <p className="text-white/40 mt-2 text-lg">Welcome to the BTH administrative control center.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Visitor Count Card — first slot */}
        <div className="glass-card p-10 hover:border-[#F58220]/50 transition-all group relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-[#F58220]/5 via-transparent to-transparent pointer-events-none" />
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-white/40 text-[10px] font-black tracking-[0.3em] uppercase group-hover:text-[#F58220] transition-colors">زوار الموقع</h3>
          </div>
          <p className="text-6xl font-black text-white">{visitorCount.toLocaleString()}</p>
          <p className="text-[10px] text-[#F58220]/60 mt-4 font-bold uppercase tracking-widest">إجمالي الزيارات · Total Visits</p>
        </div>

        <div className="glass-card p-10 hover:border-[#F58220]/50 transition-all group">
          <h3 className="text-white/40 text-[10px] font-black tracking-[0.3em] uppercase mb-6 group-hover:text-[#F58220] transition-colors">Total Product Requests</h3>
          <p className="text-6xl font-black text-white">{requestCount}</p>
        </div>

        <div className="glass-card p-10 hover:border-[#F58220]/50 transition-all group">
          <h3 className="text-white/40 text-[10px] font-black tracking-[0.3em] uppercase mb-6 group-hover:text-[#F58220] transition-colors">Total Complaints</h3>
          <p className="text-6xl font-black text-white">N/A</p>
          <p className="text-[10px] text-white/20 mt-4 font-bold uppercase tracking-widest italic">Handled via WhatsApp/Email</p>
        </div>

        <div className="glass-card p-10 hover:border-[#F58220]/50 transition-all group">
          <h3 className="text-white/40 text-[10px] font-black tracking-[0.3em] uppercase mb-6 group-hover:text-[#F58220] transition-colors">System Admins</h3>
          <p className="text-6xl font-black text-white">{adminCount}</p>
        </div>
      </div>
    </div>
  );
}
