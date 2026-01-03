import { useEffect, useRef, useState } from "react";
import unitsApi from "../../services/unitsApi";
import LoadingBar from "react-top-loading-bar";
import AddUnitModal from "./ModalPopup/AddUnitModal";

function UnitsPage() {
  const [units, setUnits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const loadingBarRef = useRef(null);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        loadingBarRef.current?.continuousStart();
        const res = await unitsApi.getAll();
        setUnits(res.data);
      } catch (error) {
        console.error("Lỗi tải danh sách đơn vị tính", error);
      } finally {
        loadingBarRef.current?.complete();
      }
    };
    fetchUnits();
  }, []);

  const handleAddUnit = async (data) => {
    const res = await unitsApi.create(data);
    setUnits([...units, res.data]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 transition-colors duration-300">
      <LoadingBar color="#06b6d4" ref={loadingBarRef} height={3} />

      <div className="mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Danh sách đơn vị tính
          </h1>

          <button
            onClick={() => setIsModalOpen(true)}
            className="h-12 px-6 rounded-xl bg-cyan-500 text-white font-bold hover:bg-cyan-600 shadow cursor-pointer"
          >
            + Thêm đơn vị tính
          </button>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Tên đơn vị tính
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Ngày tạo
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {units.map((unit) => (
                <tr key={unit.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {unit.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {new Date(unit.createdAt).toLocaleDateString('vi-VN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <AddUnitModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddUnit}
        />
      )}
    </div>
  );
}

export default UnitsPage;