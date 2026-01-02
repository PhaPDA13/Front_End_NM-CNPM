import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import receiptApi from "../../services/billApi";
import formatCurrency from "../../helper/formatCurrenry";
import LoadingBar from "react-top-loading-bar";

function ReceiptInvoiceListPage() {
  const [receipts, setReceipts] = useState([]);
  const navigate = useNavigate();
  const loadingBarRef = useRef(null);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
      loadingBarRef.current?.continuousStart();

        const res = await receiptApi.getAll();
        setReceipts(res.data);
      } catch (error) {
        console.error("Lỗi tải danh sách phiếu thu", error);
      }
      finally{
      loadingBarRef.current?.complete();

      }
    };
    fetchReceipts();
  }, []);
  

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <LoadingBar color="#06b6d4" ref={loadingBarRef} height={3} />

      <div className="mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Danh sách phiếu thu tiền
          </h1>

          <button
            onClick={() => navigate("/list-invoice/create-invoice")}
            className="h-12 px-6 rounded-xl bg-cyan-500 text-white font-bold hover:bg-cyan-600 shadow cursor-pointer"
          >
            + Lập phiếu thu tiền
          </button>
        </div>

        {/* Table */}
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
                  Ngày thu
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500">
                  Số tiền
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 bg-white">
              {receipts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-gray-400">
                    Chưa có phiếu thu tiền nào
                  </td>
                </tr>
              ) : (
                receipts.map((r) => (
                  <tr key={r.id} className="hover:bg-blue-50/50">
                    <td className="px-6 py-4 font-medium">
                      PT{r.id}
                    </td>
                    <td className="px-6 py-4">
                      {r.agent?.name}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(r.issueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right font-bold">
                      {formatCurrency(r.total.toLocaleString())}
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

export default ReceiptInvoiceListPage;
