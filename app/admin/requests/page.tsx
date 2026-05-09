import { getProductRequests } from "@/actions/admin/requests";
import { RequestTable } from "@/components/admin/RequestTable";

export default async function AdminRequestsPage() {
  const requests = await getProductRequests();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Product Requests</h1>
        <p className="text-gray-500 mt-1">Manage incoming leads and customer inquiries.</p>
      </div>

      <RequestTable requests={requests} />
    </div>
  );
}
