import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import reportApi from "../../services/reportApi";
import LoadingBar from "react-top-loading-bar";

function ReportPage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // Mặc định tháng hiện tại (YYYY-MM)
  const [salesReport, setSalesReport] = useState([]);
  const [debtReport, setDebtReport] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingBarRef = useRef(null);
  

  const MOCK_SALES = [
    { id: 1, agentName: "Đại lý A", exportCount: 5, totalValue: 50000000, ratio: 0.5 },
    { id: 2, agentName: "Đại lý B", exportCount: 3, totalValue: 30000000, ratio: 0.3 },
    { id: 3, agentName: "Đại lý C", exportCount: 2, totalValue: 20000000, ratio: 0.2 },
  ];

  const MOCK_DEBT = [
    { id: 1, agentName: "Đại lý A", initialDebt: 1000000, incurred: 50000000, finalDebt: 51000000 },
    { id: 2, agentName: "Đại lý B", initialDebt: 0, incurred: 30000000, finalDebt: 30000000 },
    { id: 3, agentName: "Đại lý C", initialDebt: 5000000, incurred: 20000000, finalDebt: 25000000 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log(selectedMonth)
        const res = await reportApi.getDebt(selectedMonth);
        console.log(res)
        setTimeout(() => {
          setSalesReport(MOCK_SALES);
          setDebtReport(MOCK_DEBT);
          setLoading(false);
        }, 500);

      } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message|| "Lỗi tải báo cáo");
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedMonth]); 

  const formatCurrency = (value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
             <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Báo Cáo Doanh Số & Công Nợ</h1>
             <p className="text-gray-500 mt-1">Tổng hợp tình hình kinh doanh theo tháng</p>
          </div>
          
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <label className="font-semibold text-gray-700">Chọn tháng:</label>
            <input 
              type="month" 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 outline-none font-medium text-gray-700"
            />
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-100 bg-cyan-50/30 flex justify-between items-center">
            <h2 className="text-xl font-bold text-cyan-800">1. Báo Cáo Doanh Số (BM5.1)</h2>
            <span className="text-sm font-medium text-cyan-600 bg-white px-3 py-1 rounded-full shadow-sm">
              Tháng {selectedMonth}
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase text-gray-500 w-16">STT</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-500">Đại Lý</th>
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase text-gray-500">Số Phiếu Xuất</th>
                  <th className="px-6 py-4 text-right text-xs font-bold uppercase text-gray-500">Tổng Trị Giá</th>
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase text-gray-500">Tỷ Lệ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {loading ? (
                   <tr><td colSpan={5} className="text-center py-8 text-gray-400">Đang tải...</td></tr>
                ) : salesReport.length === 0 ? (
                   <tr><td colSpan={5} className="text-center py-8 text-gray-400 italic">Không có dữ liệu doanh số</td></tr>
                ) : (
                  salesReport.map((item, index) => (
                    <tr key={item.id} className="hover:bg-cyan-50/20 transition-colors">
                      <td className="px-6 py-4 text-center text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4 font-medium text-gray-800">{item.agentName}</td>
                      <td className="px-6 py-4 text-center text-gray-700">{item.exportCount}</td>
                      <td className="px-6 py-4 text-right font-bold text-gray-800">{formatCurrency(item.totalValue)}</td>
                      <td className="px-6 py-4 text-center font-medium text-cyan-600">
                        {(item.ratio * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- REPORT 2: BÁO CÁO CÔNG NỢ (BM5.2) --- */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
           <div className="p-6 border-b border-gray-100 bg-orange-50/30 flex justify-between items-center">
            <h2 className="text-xl font-bold text-orange-800">2. Báo Cáo Công Nợ (BM5.2)</h2>
             <span className="text-sm font-medium text-orange-600 bg-white px-3 py-1 rounded-full shadow-sm">
              Tháng {selectedMonth}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase text-gray-500 w-16">STT</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-500">Đại Lý</th>
                  <th className="px-6 py-4 text-right text-xs font-bold uppercase text-gray-500">Nợ Đầu</th>
                  <th className="px-6 py-4 text-right text-xs font-bold uppercase text-gray-500">Phát Sinh</th>
                  <th className="px-6 py-4 text-right text-xs font-bold uppercase text-gray-500">Nợ Cuối</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {loading ? (
                   <tr><td colSpan={5} className="text-center py-8 text-gray-400">Đang tải...</td></tr>
                ) : debtReport.length === 0 ? (
                   <tr><td colSpan={5} className="text-center py-8 text-gray-400 italic">Không có dữ liệu công nợ</td></tr>
                ) : (
                  debtReport.map((item, index) => (
                    <tr key={item.id} className="hover:bg-orange-50/20 transition-colors">
                      <td className="px-6 py-4 text-center text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4 font-medium text-gray-800">{item.agentName}</td>
                      <td className="px-6 py-4 text-right text-gray-600">{formatCurrency(item.initialDebt)}</td>
                      <td className="px-6 py-4 text-right text-gray-600">{formatCurrency(item.incurred)}</td>
                      <td className="px-6 py-4 text-right font-bold text-red-600">{formatCurrency(item.finalDebt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ReportPage;