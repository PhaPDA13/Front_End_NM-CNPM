import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import billApi from "../../services/billApi";
import LoadingBar from "react-top-loading-bar";

function ExportInvoiceListPage() {
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  const loadingBarRef = useRef(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        loadingBarRef.current?.continuousStart();
        const res = await billApi.getAll();
        setInvoices(res.data);
      } catch (error) {
        console.error("Lỗi tải danh sách phiếu xuất", error);
      } finally {
        loadingBarRef.current?.complete();
      }
    };
    fetchInvoices();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <LoadingBar color="#06b6d4" ref={loadingBarRef} height={3} />

      <div className="mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Danh sách phiếu xuất hàng
          </h1>

          <button
            onClick={() => navigate("/list-export/create-export")}
            className="h-12 px-6 rounded-xl bg-cyan-500 text-white font-bold hover:bg-cyan-600 shadow cursor-pointer"
          >
            + Lập phiếu xuất
          </button>
        </div>

        <div className="rounded-2xl bg-white shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
                  Mã phiếu
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
                  Đại lý
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500">
                  Ngày xuất
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500">
                  Tổng tiền
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 bg-white">
              {invoices.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-gray-400">
                    Chưa có phiếu xuất nào
                  </td>
                </tr>
              ) : (
                invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-blue-50/50">
                    <td className="px-6 py-4 font-medium">PX{inv.id}</td>
                    <td className="px-6 py-4">{inv.agent?.name}</td>
                    <td className="px-6 py-4">
                      {new Date(inv.issueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right font-bold">
                      {formatCurrency(inv.total)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ExportInvoiceListPage;
