import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import productsApi from "../../services/productsApi";
import unitsApi from "../../services/unitsApi";
import formatCurrency from "../../helper/formatCurrenry";
import LoadingBar from "react-top-loading-bar";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [units, setUnits] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({ name: '', price: '', unitId: '' });
  const navigate = useNavigate();
  const loadingBarRef = useRef(null);

  useEffect(() => {
    fetchProducts();
    fetchUnits();
  }, []);

  const fetchProducts = async () => {
    try {
      loadingBarRef.current?.continuousStart();
      const res = await productsApi.getAll();
      setProducts(res.data);
    } catch (error) {
      console.error("Lỗi tải danh sách sản phẩm", error);
    } finally {
      loadingBarRef.current?.complete();
    }
  };

  const fetchUnits = async () => {
    try {
      const res = await unitsApi.getAll();
      setUnits(res.data || []);
    } catch (error) {
      console.error("Lỗi tải danh sách đơn vị", error);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setEditFormData({
      name: product.name,
      price: product.price,
      unitId: product.unitId || ''
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      if (!editFormData.name || !editFormData.price) {
        toast.error("Vui lòng điền đầy đủ thông tin!");
        return;
      }
      loadingBarRef.current?.continuousStart();
      await productsApi.update(editingProduct.id, {
        name: editFormData.name,
        price: editFormData.price,
        unitId: editFormData.unitId || null
      });
      toast.success("Cập nhật sản phẩm thành công!");
      setShowEditModal(false);
      fetchProducts();
    } catch (error) {
      console.error("Lỗi cập nhật sản phẩm", error);
      toast.error("Lỗi cập nhật sản phẩm!");
    } finally {
      loadingBarRef.current?.complete();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 transition-colors duration-300">
      <LoadingBar color="#06b6d4" ref={loadingBarRef} height={3} />

      <div className="mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Danh sách sản phẩm
          </h1>

          <button
            onClick={() => navigate("/list-products/create-product")}
            className="h-12 px-6 rounded-xl bg-cyan-500 text-white font-bold hover:bg-cyan-600 shadow cursor-pointer"
          >
            + Thêm sản phẩm
          </button>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Tên sản phẩm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Giá
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Đơn vị
                </th>
              
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {products.map((product) => {
                const unit = units.find(u => u.id === product.unitId);
                return (
                  <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {unit?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="text-cyan-500 hover:text-cyan-700 font-semibold flex items-center gap-2"
                      >
                        <FaEdit /> Chỉnh sửa
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Product Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/30 dark:bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Chỉnh sửa sản phẩm</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tên sản phẩm
                </label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Giá
                </label>
                <input
                  type="number"
                  value={editFormData.price}
                  onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Đơn vị tính
                </label>
                <select
                  value={editFormData.unitId}
                  onChange={(e) => setEditFormData({ ...editFormData, unitId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">-- Chọn đơn vị --</option>
                  {units.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 font-semibold transition"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;