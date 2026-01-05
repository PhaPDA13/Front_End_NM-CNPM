import { useRef, useState, useEffect, useMemo } from "react";
import axiosClient from "../../services/axiosClient";
import LoadingBar from "react-top-loading-bar";
import UpdateAgencyModal from "./ModalPopup/UpdateAgencyModal";
import {
  FaSort,
  FaSortUp,
  FaSortDown,
} from "react-icons/fa";
import AgencyTableRow from "./Components/AgencyTableRow";
import AgencyFilterBar from "./Components/AgencyFilterBar";
import Pagination from "./Components/Pagination";
import { toast } from "react-toastify";

function SearchAgencyPage() {
  const [agencies, setAgencies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const loadingBarRef = useRef(null);

  const [filters, setFilters] = useState({
    keyword: "",
    type: "ALL",
    district: "ALL",
    sort: "",
  });

  const fetchAgents = async () => {
    try {
      setIsLoading(true);
      loadingBarRef.current?.continuousStart();
      const response = await axiosClient.get("/api/agents/");
      console.log(response.data)
      setAgencies(response.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách:", error);
    } finally {
      setIsLoading(false);
      loadingBarRef.current?.complete();
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const filteredAgencies = useMemo(() => {
    let result = [...agencies];
    if (filters.keyword) {
      console.log(result)
      console.log(filters.keyword)
      const lowerKey = filters.keyword.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerKey) ||
          item.id.toString().includes(lowerKey) ||
          item.address.toLowerCase().includes(lowerKey)
      );
    }
    if (filters.type !== "ALL") {
      console.log(result);
      console.log(filters.type);
      result = result.filter((item) => item.agentType?.name == filters.type);
    }

    if (filters.district !== "ALL") {
      console.log(filters.district);
      console.log(result);
      result = result.filter((item) => filters.district == item.district.name);
    }

    if (filters.sort) {
      result.sort((a, b) => {
        return filters.sort === "asc"
          ? a.debtAmount - b.debtAmount
          : b.debtAmount - a.debtAmount;
      });
    }

    return result;
  }, [agencies, filters]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredAgencies.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAgencies.slice(start, start + itemsPerPage);
  }, [filteredAgencies, currentPage]);


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({ keyword: "", type: "ALL", district: "ALL", sort: "" });
    setCurrentPage(1);
  };

  const handleSortToggle = () => {
    setFilters((prev) => ({
      ...prev,
      sort: prev.sort === "asc" ? "desc" : "asc",
    }));
  };

  const handleEditClick = (agency) => {
    setSelectedAgency(agency);
    setOpen(true);
  };

  const handleDeleteClick = async (agencyId) => {
    if (
      window.confirm(
        "Bạn có chắc chắn muốn xoá đại lý này không? Hành động này không thể hoàn tác."
      )
    ) {
      try {
        setIsLoading(true);
        await axiosClient.delete(`/api/agents/${agencyId}`);
        setAgencies((prevList) =>
          prevList.filter((item) => item.id !== agencyId)
        );
        toast.success("Xoá thành công");
      } catch (error) {
        console.error("Lỗi khi xoá:", error);
        toast.error("Lỗi khi xoá");
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 transition-colors duration-300">
      <LoadingBar color="#06b6d4" ref={loadingBarRef} height={3} />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Quản Lý Đại Lý</h1>
      </div>
      <AgencyFilterBar
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleResetFilters}
      />
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="p-4 w-16">Mã</th>
                <th className="p-4">Tên Đại Lý</th>
                <th className="p-4">Loại</th>
                <th className="p-4">Liên Hệ</th>
                <th className="p-4">Quận</th>
                <th className="p-4">Địa Chỉ</th>
                <th
                  className="p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors select-none"
                  onClick={handleSortToggle}
                >
                  <div className="flex items-center gap-1 text-cyan-700 dark:text-cyan-400">
                    Công Nợ
                    {filters.sort === "asc" && <FaSortUp />}
                    {filters.sort === "desc" && <FaSortDown />}
                    {!filters.sort && <FaSort className="text-gray-300 dark:text-gray-500" />}
                  </div>
                </th>
                <th className="p-4 text-center">Tác vụ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {isLoading ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-gray-500 dark:text-gray-400">
                    <div className="flex justify-center items-center gap-2">
                      <span className="animate-spin">⏳</span> Đang tải dữ
                      liệu...
                    </div>
                  </td>
                </tr>
              ) : paginatedData.length > 0 ? (
                paginatedData.map((agency) => (
                  <AgencyTableRow
                    key={agency.id}
                    agency={agency}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                      <span className="text-4xl mb-2">🔍</span>
                      <p>Không tìm thấy kết quả nào phù hợp.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          totalItems={filteredAgencies.length}
          currentCount={paginatedData.length}
        />
      </div>
      <UpdateAgencyModal
        open={open}
        agency={selectedAgency}
        onClose={() => setOpen(false)}
        onReload={fetchAgents}
      />
    </div>
  );
}

export default SearchAgencyPage;
