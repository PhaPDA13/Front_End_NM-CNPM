import { useState, useEffect, useRef, useMemo } from "react";
import { toast } from "react-toastify";
import reportApi from "../../services/reportApi";
import LoadingBar from "react-top-loading-bar";
import formatCurrency from "../../helper/formatCurrenry";
import Pagination from "../SearchAgency/Components/Pagination";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaFilePdf, FaSearch } from "react-icons/fa";
function ReportPage() {
  const loadingBarRef = useRef(null);
  const ITEMS_PER_PAGE = 5; 
  const [salesMonth, setSalesMonth] = useState(new Date().toISOString().slice(0, 7));
  const [salesData, setSalesData] = useState([]); 
  const [salesPage, setSalesPage] = useState(1);
  const [loadingSales, setLoadingSales] = useState(false);
  const [salesSearchTerm, setSalesSearchTerm] = useState("");

  const [debtMonth, setDebtMonth] = useState(new Date().toISOString().slice(0, 7));
  const [debtData, setDebtData] = useState([]); 
  const [debtPage, setDebtPage] = useState(1);
  const [loadingDebt, setLoadingDebt] = useState(false);
  const [debtSearchTerm, setDebtSearchTerm] = useState("");

  useEffect(() => {
    const fetchSales = async () => {
      setLoadingSales(true);
      loadingBarRef.current?.continuousStart();
      try {
        const [year, month] = salesMonth.split("-");
        const res = await reportApi.getSale(year, month);
        console.log(res)
        setSalesData(res.data?.salesData || []);
        setSalesPage(1); 
      } catch (error) {
        console.log(error);
        toast.error("Lỗi tải báo cáo doanh số");
      } finally {
        setLoadingSales(false);
        loadingBarRef.current?.complete();
      }
    };
    fetchSales();
  }, [salesMonth]);

  useEffect(() => {
    const fetchDebt = async () => {
      setLoadingDebt(true);
      loadingBarRef.current?.continuousStart();
      try {
        const [year, month] = debtMonth.split("-");
        const res = await reportApi.getDebt(year, month);
        console.log(res)
        setDebtData(res.data?.debtData || []);
        setDebtPage(1); 
      } catch (error) {
        console.log(error);
        toast.error("Lỗi tải báo cáo công nợ");
      } finally {
        setLoadingDebt(false);
        loadingBarRef.current?.complete();
      }
    };
    fetchDebt();
  }, [debtMonth]);

  const filteredSalesData = useMemo(() => {
    return salesData.filter((item) => 
      item.agentName?.toLowerCase().includes(salesSearchTerm.toLowerCase())
    );
  }, [salesData, salesSearchTerm]);

  const currentSalesData = useMemo(() => {
    const firstPageIndex = (salesPage - 1) * ITEMS_PER_PAGE;
    const lastPageIndex = firstPageIndex + ITEMS_PER_PAGE;
    return filteredSalesData.slice(firstPageIndex, lastPageIndex);
  }, [salesPage, filteredSalesData]);

  useEffect(() => {
    setSalesPage(1);
  }, [salesSearchTerm]);

  const filteredDebtData = useMemo(() => {
    return debtData.filter((item) => 
      item.agentName?.toLowerCase().includes(debtSearchTerm.toLowerCase())
    );
  }, [debtData, debtSearchTerm]);

  const currentDebtData = useMemo(() => {
    const firstPageIndex = (debtPage - 1) * ITEMS_PER_PAGE;
    const lastPageIndex = firstPageIndex + ITEMS_PER_PAGE;
    return filteredDebtData.slice(firstPageIndex, lastPageIndex);
  }, [debtPage, filteredDebtData]);

  useEffect(() => {
    setDebtPage(1);
  }, [debtSearchTerm]);

  const exportSalesPDF = () => {
    const doc = new jsPDF();
    
    // Add Vietnamese font support
    doc.setFont("helvetica");
    
    // Title
    doc.setFontSize(16);
    doc.text("BAO CAO DOANH SO", 105, 15, { align: "center" });
    doc.setFontSize(10);
    doc.text(`Thang: ${salesMonth}`, 105, 22, { align: "center" });
    
    // Table
    autoTable(doc, {
      startY: 30,
      head: [["STT", "Dai Ly", "So Phieu Xuat", "Tong Tri Gia", "Ty Le"]],
      body: filteredSalesData.map((item, index) => [
        index + 1,
        item.agentName,
        item.billCount,
        formatCurrency(item.totalRevenue),
        `${item.percentage}%`
      ]),
      styles: { font: "helvetica", fontSize: 9 },
      headStyles: { fillColor: [6, 182, 212] }
    });
    
    doc.save(`Bao_Cao_Doanh_So_${salesMonth}.pdf`);
    toast.success("Đã xuất PDF báo cáo doanh số");
  };

  const exportDebtPDF = () => {
    const doc = new jsPDF();
    
    doc.setFont("helvetica");
    
    // Title
    doc.setFontSize(16);
    doc.text("BAO CAO CONG NO", 105, 15, { align: "center" });
    doc.setFontSize(10);
    doc.text(`Thang: ${debtMonth}`, 105, 22, { align: "center" });
    
    // Table
    autoTable(doc, {
      startY: 30,
      head: [["STT", "Dai Ly", "No Dau", "Phat Sinh", "No Cuoi"]],
      body: filteredDebtData.map((item, index) => [
        index + 1,
        item.agentName,
        formatCurrency(item.beginningDebt),
        formatCurrency(item.issuedDebt),
        formatCurrency(item.endingDebt)
      ]),
      styles: { font: "helvetica", fontSize: 9 },
      headStyles: { fillColor: [249, 115, 22] }
    });
    
    doc.save(`Bao_Cao_Cong_No_${debtMonth}.pdf`);
    toast.success("Đã xuất PDF báo cáo công nợ");
  };


  return (
    <div className=" md:p-10 font-sans p-8 bg-gray-50 min-h-full">
      <LoadingBar color="#06b6d4" ref={loadingBarRef} height={3} />
      <div className="mx-auto max-w-6xl space-y-8">
        
        <div>
           <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
             Báo Cáo Doanh Số & Công Nợ
           </h1>
           <p className="text-gray-500 mt-1">
             Tổng hợp tình hình kinh doanh chi tiết
           </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
          {/* Header Card Sales */}
          <div className="p-6 border-b border-gray-100 bg-cyan-50/30 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-cyan-800">
                1. Báo Cáo Doanh Số (BM5.1)
                </h2>
                <span className="text-xs font-semibold text-cyan-600 bg-white px-2 py-1 rounded border border-cyan-100">
                    {filteredSalesData.length} bản ghi
                </span>
            </div>
            
            <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-600">Tháng:</label>
                <input
                    type="month"
                    value={salesMonth}
                    onChange={(e) => setSalesMonth(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-cyan-500 outline-none bg-white text-gray-700 shadow-sm"
                />
                <button
                    onClick={exportSalesPDF}
                    disabled={filteredSalesData.length === 0}
                    className="flex items-center gap-2 px-4 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                >
                    <FaFilePdf /> Xuất PDF
                </button>
            </div>
          </div>

          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên đại lý..."
                value={salesSearchTerm}
                onChange={(e) => setSalesSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
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
                {loadingSales ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-400">Đang tải dữ liệu...</td>
                  </tr>
                ) : currentSalesData.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-400 italic">Không có dữ liệu doanh số tháng này</td>
                  </tr>
                ) : (
                  currentSalesData.map((item, index) => (
                    <tr key={index} className="hover:bg-cyan-50/20 transition-colors">
                      <td className="px-6 py-4 text-center text-gray-500">
                        {(salesPage - 1) * ITEMS_PER_PAGE + index + 1}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-800">{item.agentName}</td>
                      <td className="px-6 py-4 text-center text-gray-700">{item.billCount}</td>
                      <td className="px-6 py-4 text-right font-bold text-gray-800">{formatCurrency(item.totalRevenue)}</td>
                      <td className="px-6 py-4 text-center font-medium text-cyan-600">{(item.percentage)}%</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Sales */}
          {filteredSalesData.length > 0 && (
            <Pagination
              currentPage={salesPage}
              totalItems={filteredSalesData.length}
              currentCount={currentSalesData.length}
              totalPages={Math.ceil(filteredSalesData.length / ITEMS_PER_PAGE)}
              onPageChange={(page) => setSalesPage(page)}
            />
          )}
        </div>

        {/* ================= 2. BÁO CÁO CÔNG NỢ ================= */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
          {/* Header Card Debt */}
          <div className="p-6 border-b border-gray-100 bg-orange-50/30 flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-orange-800">
                2. Báo Cáo Công Nợ (BM5.2)
                </h2>
                <span className="text-xs font-semibold text-orange-600 bg-white px-2 py-1 rounded border border-orange-100">
                    {filteredDebtData.length} bản ghi
                </span>
            </div>

            <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-600">Tháng:</label>
                <input
                    type="month"
                    value={debtMonth}
                    onChange={(e) => setDebtMonth(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-orange-500 outline-none bg-white text-gray-700 shadow-sm"
                />
                <button
                    onClick={exportDebtPDF}
                    disabled={filteredDebtData.length === 0}
                    className="flex items-center gap-2 px-4 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                >
                    <FaFilePdf /> Xuất PDF
                </button>
            </div>
          </div>

          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên đại lý..."
                value={debtSearchTerm}
                onChange={(e) => setDebtSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
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
                {loadingDebt ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-400">Đang tải dữ liệu...</td>
                  </tr>
                ) : currentDebtData.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-400 italic">Không có dữ liệu công nợ tháng này</td>
                  </tr>
                ) : (
                  currentDebtData.map((item, index) => (
                    <tr key={index} className="hover:bg-orange-50/20 transition-colors">
                      <td className="px-6 py-4 text-center text-gray-500">
                        {(debtPage - 1) * ITEMS_PER_PAGE + index + 1}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-800">{item.agentName}</td>
                      <td className="px-6 py-4 text-right text-gray-600">{formatCurrency(item.beginningDebt)}</td>
                      <td className="px-6 py-4 text-right text-gray-600">{formatCurrency(item.issuedDebt)}</td>
                      <td className="px-6 py-4 text-right font-bold text-red-600">{formatCurrency(item.endingDebt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Debt */}
          {filteredDebtData.length > 0 && (
            <Pagination
              currentPage={debtPage}
              totalItems={filteredDebtData.length}
              currentCount={currentDebtData.length}
              totalPages={Math.ceil(filteredDebtData.length / ITEMS_PER_PAGE)}
              onPageChange={(page) => setDebtPage(page)}
            />
          )}
        </div>

      </div>
    </div>
  );
}


export default ReportPage;