import { useState, useEffect, useRef } from "react";
import LoadingBar from 'react-top-loading-bar';
import { toast } from 'react-toastify';
import districtApi from "../../services/districtApi";
import agentTypeApi from "../../services/agentTypes";
import productsApi from "../../services/productsApi";
import unitsApi from "../../services/unitsApi";
import formatCurrency from "../../helper/formatCurrenry";

function EditRulesPage() {
  const loadingBarRef = useRef(null);
  const [activeTab, setActiveTab] = useState(1);  
  // Rule 1 data
  const [districts, setDistricts] = useState([]);
  const [editingDistrict, setEditingDistrict] = useState(null);
  const [showAddDistrictModal, setShowAddDistrictModal] = useState(false);
  
  // Pagination for Rule 1
  const [currentPageDistricts, setCurrentPageDistricts] = useState(1);
  const itemsPerPage = 5;
  
  // Rule 2 data
  const [products, setProducts] = useState([]);
  const [units, setUnits] = useState([]);
  const [agentTypesDebt, setAgentTypesDebt] = useState([]);
  const [editingAgentTypeDebt, setEditingAgentTypeDebt] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingUnit, setEditingUnit] = useState(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddUnitModal, setShowAddUnitModal] = useState(false);
  const [showAddAgentTypeDebtModal, setShowAddAgentTypeDebtModal] = useState(false);
  
  // Pagination for Rule 2
  const [currentPageProducts, setCurrentPageProducts] = useState(1);
  const [currentPageUnits, setCurrentPageUnits] = useState(1);
  const [currentPageAgentTypesDebt, setCurrentPageAgentTypesDebt] = useState(1);

  // Load data for Rule 1
  useEffect(() => {
    if (activeTab === 1) {
      loadDistricts();
    }
  }, [activeTab]);

  // Load data for Rule 2
  useEffect(() => {
    if (activeTab === 2) {
      loadProductsUnitsAndAgentTypes();
    }
  }, [activeTab]);

  const loadDistricts = async () => {
    try {
      loadingBarRef.current?.continuousStart();
      const districtsRes = await districtApi.getAll();
      setDistricts(districtsRes.data || []);
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error('Không thể tải danh sách quận!');
    } finally {
      loadingBarRef.current?.complete();
    }
  };

  const loadProductsUnitsAndAgentTypes = async () => {
    try {
      loadingBarRef.current?.continuousStart();
      const [productsRes, unitsRes, agentTypesRes] = await Promise.all([
        productsApi.getAll(),
        unitsApi.getAll(),
        agentTypeApi.getAll()
      ]);
      setProducts(productsRes.data || []);
      setUnits(unitsRes.data || []);
      setAgentTypesDebt(agentTypesRes.data || []);
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error('Không thể tải dữ liệu!');
    } finally {
      loadingBarRef.current?.complete();
    }
  };

  const handleUpdateDistrict = async (district, formData) => {
    try {
      loadingBarRef.current?.continuousStart();
      const data = {
          name: formData.name,
          maxAgents: parseInt(formData.maxAgents)
      }
      await districtApi.update(data, district.id);
      await loadDistricts();
      setEditingDistrict(null);
      toast.success('Cập nhật quận thành công!');
    } catch (error) {
      console.error("Error updating district:", error);
      toast.error('Cập nhật quận thất bại!');
    } finally {
      loadingBarRef.current?.complete();
    }
  };

  const handleAddDistrict = async (data) => {
    try {
      loadingBarRef.current?.continuousStart();
      await districtApi.create(data);
      await loadDistricts();
      setShowAddDistrictModal(false);
      toast.success('Thêm quận mới thành công!');
    } catch (error) {
      console.error("Error adding district:", error);
      toast.error('Thêm quận thất bại!');
    } finally {
      loadingBarRef.current?.complete();
    }
  };

  const handleAddProduct = async (data) => {
    try {
      loadingBarRef.current?.continuousStart();
      await productsApi.create(data);
      await loadProductsUnitsAndAgentTypes();
      setShowAddProductModal(false);
      toast.success('Thêm mặt hàng mới thành công!');
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error('Thêm mặt hàng thất bại!');
    } finally {
      loadingBarRef.current?.complete();
    }
  };

  const handleAddUnit = async (data) => {
    try {
      loadingBarRef.current?.continuousStart();
      await unitsApi.create(data);
      await loadProductsUnitsAndAgentTypes();
      setShowAddUnitModal(false);
      toast.success('Thêm đơn vị tính mới thành công!');
    } catch (error) {
      console.error("Error adding unit:", error);
      toast.error('Thêm đơn vị tính thất bại!');
    } finally {
      loadingBarRef.current?.complete();
    }
  };

  const handleUpdateAgentTypeDebt = async (id, formData) => {
    try {
      loadingBarRef.current?.continuousStart();
      const data = {
        name: formData.name,
        maxDebt: parseInt(formData.maxDebt)
      };
      await agentTypeApi.update(data, id);
      await loadProductsUnitsAndAgentTypes();
      setEditingAgentTypeDebt(null);
      toast.success('Cập nhật loại đại lý thành công!');
    } catch (error) {
      console.error("Error updating agent type debt:", error);
      toast.error('Cập nhật loại đại lý thất bại!');
    } finally {
      loadingBarRef.current?.complete();
    }
  };

  const handleAddAgentTypeDebt = async (data) => {
    try {
      loadingBarRef.current?.continuousStart();
      await agentTypeApi.create(data);
      await loadProductsUnitsAndAgentTypes();
      setShowAddAgentTypeDebtModal(false);
      toast.success('Thêm loại đại lý mới thành công!');
    } catch (error) {
      console.error("Error adding agent type debt:", error);
      toast.error('Thêm loại đại lý thất bại!');
    } finally {
      loadingBarRef.current?.complete();
    }
  };

  const handleUpdateProduct = async (id, formData) => {
    try {
      loadingBarRef.current?.continuousStart();
      await productsApi.update(id, formData);
      await loadProductsUnitsAndAgentTypes();
      setEditingProduct(null);
      toast.success('Cập nhật mặt hàng thành công!');
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error('Cập nhật mặt hàng thất bại!');
    } finally {
      loadingBarRef.current?.complete();
    }
  };

  const handleUpdateUnit = async (id, data) => {
    try {
      loadingBarRef.current?.continuousStart();
      await unitsApi.update(data, id);
      await loadProductsUnitsAndAgentTypes();
      setEditingUnit(null);
      toast.success('Cập nhật đơn vị tính thành công!');
    } catch (error) {
      console.error("Error updating unit:", error);
      toast.error('Cập nhật đơn vị tính thất bại!');
    } finally {
      loadingBarRef.current?.complete();
    }
  };

  // Pagination helpers
  const paginate = (array, page) => {
    const start = (page - 1) * itemsPerPage;
    return array.slice(start, start + itemsPerPage);
  };

  const totalPages = (array) => Math.ceil(array.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 transition-colors duration-300">
      <LoadingBar color="#06b6d4" ref={loadingBarRef} />
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Thay đổi quy định</h1>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          onClick={() => setActiveTab(1)}
          className={`px-6 py-3 font-semibold transition-colors ${
            activeTab === 1
              ? "border-b-2 border-cyan-500 text-cyan-600 dark:text-cyan-400"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          }`}
        >
          Quy định 1
        </button>
        <button
          onClick={() => setActiveTab(2)}
          className={`px-6 py-3 font-semibold transition-colors ${
            activeTab === 2
              ? "border-b-2 border-cyan-500 text-cyan-600 dark:text-cyan-400"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          }`}
        >
          Quy định 2
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 1 && (
        <div className="space-y-6">
          {/* Districts Table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Danh sách quận và số lượng đại lý tối đa</h2>
              <button
                onClick={() => setShowAddDistrictModal(true)}
                className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold shadow-md transition duration-200"
              >
                + Thêm quận
              </button>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Tên quận</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Số đại lý tối đa</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {paginate(districts, currentPageDistricts).map((district) => (
                  <tr key={district.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 text-gray-800 dark:text-white">
                      {editingDistrict?.id === district.id ? (
                        <input
                          type="text"
                          defaultValue={district.name}
                          id={`district-name-${district.id}`}
                          className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      ) : (
                        district.name
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-800 dark:text-white">
                      {editingDistrict?.id === district.id ? (
                        <input
                          type="number"
                          defaultValue={district.maxAgents || 0}
                          id={`district-max-${district.id}`}
                          className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      ) : (
                        district.maxAgents || 0
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {editingDistrict?.id === district.id ? (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              const name = document.getElementById(`district-name-${district.id}`).value;
                              const maxAgents = document.getElementById(`district-max-${district.id}`).value;
                              handleUpdateDistrict(district, { name, maxAgents });
                            }}
                            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm font-semibold shadow-sm transition duration-200"
                          >
                            Lưu
                          </button>
                          <button
                            onClick={() => setEditingDistrict(null)}
                            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-semibold shadow-sm transition duration-200"
                          >
                            Hủy
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setEditingDistrict(district)}
                          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm font-semibold shadow-sm transition duration-200"
                        >
                          Chỉnh sửa
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            {districts.length > itemsPerPage && (
              <div className="flex justify-center items-center gap-2 px-6 py-4 border-t border-gray-200">
                <button
                  onClick={() => setCurrentPageDistricts(prev => Math.max(1, prev - 1))}
                  disabled={currentPageDistricts === 1}
                  className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Trước
                </button>
                <span className="text-sm text-gray-600">
                  Trang {currentPageDistricts} / {totalPages(districts)}
                </span>
                <button
                  onClick={() => setCurrentPageDistricts(prev => Math.min(totalPages(districts), prev + 1))}
                  disabled={currentPageDistricts === totalPages(districts)}
                  className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sau
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 2 && (
        <div className="space-y-6">
          {/* Products Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Danh sách mặt hàng</h2>
              <button
                onClick={() => setShowAddProductModal(true)}
                className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold shadow-md transition duration-200"
              >
                + Thêm mặt hàng
              </button>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tên mặt hàng</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Đơn giá</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Đơn vị tính</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginate(products, currentPageProducts).map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-800">
                      {editingProduct?.id === product.id ? (
                        <input
                          type="text"
                          defaultValue={product.name}
                          id={`product-name-${product.id}`}
                          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                      ) : (
                        product.name
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-800">
                      {editingProduct?.id === product.id ? (
                        <input
                          type="number"
                          defaultValue={product.price || 0}
                          id={`product-price-${product.id}`}
                          className="border border-gray-300 rounded-lg px-3 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                      ) : (
                        formatCurrency(product.price || 0)
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-800">
                      {editingProduct?.id === product.id ? (
                        <div className="space-y-1">
                          {units.map(unit => (
                            <label key={unit.id} className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                defaultChecked={product.units?.some(u => u.unitId === unit.id)}
                                value={unit.id}
                                className="product-unit-checkbox-${product.id}"
                              />
                              <span className="text-sm">{unit.name}</span>
                            </label>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {product.units?.map(productUnit => {
                            const unit = units.find(u => u.id === productUnit.unitId);
                            return unit ? (
                              <span key={productUnit.unitId} className="px-2 py-1 bg-cyan-100 text-cyan-700 rounded text-xs font-medium">
                                {unit.name}
                              </span>
                            ) : null;
                          })}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {editingProduct?.id === product.id ? (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              const name = document.getElementById(`product-name-${product.id}`).value;
                              const price = document.getElementById(`product-price-${product.id}`).value;
                              const checkboxes = document.querySelectorAll(`.product-unit-checkbox-${product.id}`);
                              const selectedUnits = Array.from(checkboxes)
                                .filter(cb => cb.checked)
                                .map(cb => parseInt(cb.value));
                              handleUpdateProduct(product.id, { name, price: parseInt(price), unitIds: selectedUnits });
                            }}
                            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm font-semibold shadow-sm transition duration-200"
                          >
                            Lưu
                          </button>
                          <button
                            onClick={() => setEditingProduct(null)}
                            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-semibold shadow-sm transition duration-200"
                          >
                            Hủy
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setEditingProduct(product)}
                          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm font-semibold shadow-sm transition duration-200"
                        >
                          Chỉnh sửa
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            {products.length > itemsPerPage && (
              <div className="flex justify-center items-center gap-2 px-6 py-4 border-t border-gray-200">
                <button
                  onClick={() => setCurrentPageProducts(prev => Math.max(1, prev - 1))}
                  disabled={currentPageProducts === 1}
                  className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Trước
                </button>
                <span className="text-sm text-gray-600">
                  Trang {currentPageProducts} / {totalPages(products)}
                </span>
                <button
                  onClick={() => setCurrentPageProducts(prev => Math.min(totalPages(products), prev + 1))}
                  disabled={currentPageProducts === totalPages(products)}
                  className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sau
                </button>
              </div>
            )}
          </div>

          {/* Units Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Danh sách đơn vị tính</h2>
              <button
                onClick={() => setShowAddUnitModal(true)}
                className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold shadow-md transition duration-200"
              >
                + Thêm đơn vị tính
              </button>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tên đơn vị</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginate(units, currentPageUnits).map((unit) => (
                  <tr key={unit.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-800">
                      {editingUnit?.id === unit.id ? (
                        <input
                          type="text"
                          defaultValue={unit.name}
                          id={`unit-name-${unit.id}`}
                          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                      ) : (
                        unit.name
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {editingUnit?.id === unit.id ? (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              const name = document.getElementById(`unit-name-${unit.id}`).value;
                              handleUpdateUnit(unit.id, { name });
                            }}
                            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm font-semibold shadow-sm transition duration-200"
                          >
                            Lưu
                          </button>
                          <button
                            onClick={() => setEditingUnit(null)}
                            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-semibold shadow-sm transition duration-200"
                          >
                            Hủy
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setEditingUnit(unit)}
                          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm font-semibold shadow-sm transition duration-200"
                        >
                          Chỉnh sửa
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            {units.length > itemsPerPage && (
              <div className="flex justify-center items-center gap-2 px-6 py-4 border-t border-gray-200">
                <button
                  onClick={() => setCurrentPageUnits(prev => Math.max(1, prev - 1))}
                  disabled={currentPageUnits === 1}
                  className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Trước
                </button>
                <span className="text-sm text-gray-600">
                  Trang {currentPageUnits} / {totalPages(units)}
                </span>
                <button
                  onClick={() => setCurrentPageUnits(prev => Math.min(totalPages(units), prev + 1))}
                  disabled={currentPageUnits === totalPages(units)}
                  className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sau
                </button>
              </div>
            )}
          </div>

          {/* Agent Types Debt Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Danh sách loại đại lý và công nợ tối đa</h2>
              <button
                onClick={() => setShowAddAgentTypeDebtModal(true)}
                className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold shadow-md transition duration-200"
              >
                + Thêm loại đại lý
              </button>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Loại đại lý</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tiền công nợ tối đa</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginate(agentTypesDebt, currentPageAgentTypesDebt).map((type) => (
                  <tr key={type.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-800">
                      {editingAgentTypeDebt?.id === type.id ? (
                        <input
                          type="text"
                          defaultValue={type.name}
                          id={`agent-debt-name-${type.id}`}
                          className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                      ) : (
                        type.name
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingAgentTypeDebt?.id === type.id ? (
                        <input
                          type="number"
                          defaultValue={type.maxDebt || 0}
                          id={`agent-debt-max-${type.id}`}
                          className="border border-gray-300 rounded-lg px-3 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                      ) : (
                        formatCurrency(type.maxDebt || 0)
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {editingAgentTypeDebt?.id === type.id ? (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              const name = document.getElementById(`agent-debt-name-${type.id}`).value;
                              const maxDebt = document.getElementById(`agent-debt-max-${type.id}`).value;
                              handleUpdateAgentTypeDebt(type.id, { name, maxDebt });
                            }}
                            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm font-semibold shadow-sm transition duration-200"
                          >
                            Lưu
                          </button>
                          <button
                            onClick={() => setEditingAgentTypeDebt(null)}
                            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-semibold shadow-sm transition duration-200"
                          >
                            Hủy
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setEditingAgentTypeDebt(type)}
                          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg text-sm font-semibold shadow-sm transition duration-200"
                        >
                          Chỉnh sửa
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            {agentTypesDebt.length > itemsPerPage && (
              <div className="flex justify-center items-center gap-2 px-6 py-4 border-t border-gray-200">
                <button
                  onClick={() => setCurrentPageAgentTypesDebt(prev => Math.max(1, prev - 1))}
                  disabled={currentPageAgentTypesDebt === 1}
                  className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Trước
                </button>
                <span className="text-sm text-gray-600">
                  Trang {currentPageAgentTypesDebt} / {totalPages(agentTypesDebt)}
                </span>
                <button
                  onClick={() => setCurrentPageAgentTypesDebt(prev => Math.min(totalPages(agentTypesDebt), prev + 1))}
                  disabled={currentPageAgentTypesDebt === totalPages(agentTypesDebt)}
                  className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sau
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modals */}
      {showAddDistrictModal && (
        <AddDistrictModal
          onClose={() => setShowAddDistrictModal(false)}
          onSave={handleAddDistrict}
        />
      )}

      {showAddProductModal && (
        <AddProductModal
          onClose={() => setShowAddProductModal(false)}
          onSave={handleAddProduct}
          units={units}
        />
      )}

      {showAddUnitModal && (
        <AddUnitModal
          onClose={() => setShowAddUnitModal(false)}
          onSave={handleAddUnit}
        />
      )}

      {showAddAgentTypeDebtModal && (
        <AddAgentTypeModal
          onClose={() => setShowAddAgentTypeDebtModal(false)}
          onSave={handleAddAgentTypeDebt}
        />
      )}
    </div>
  );
}

// Modal Components
function AddDistrictModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({ name: "", maxAgents: 0 });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-[480px] p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Thêm quận</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tên quận</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
              placeholder="Nhập tên quận"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Số đại lý tối đa</label>
            <input
              type="number"
              value={formData.maxAgents}
              onChange={(e) => setFormData({ ...formData, maxAgents: parseInt(e.target.value) })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
              placeholder="Nhập số lượng"
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold shadow-sm transition duration-200"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold shadow-md transition duration-200"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddAgentTypeModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({ name: "", maxDebt: 0 });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-[480px] p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Thêm loại đại lý</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tên loại đại lý</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
              placeholder="Nhập tên loại đại lý"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tiền nợ tối đa (VNĐ)</label>
            <input
              type="number"
              value={formData.maxDebt}
              onChange={(e) => setFormData({ ...formData, maxDebt: parseInt(e.target.value) })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
              placeholder="Nhập số tiền"
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold shadow-sm transition duration-200"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold shadow-md transition duration-200"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddProductModal({ onClose, onSave, units }) {
  const [formData, setFormData] = useState({ name: "", price: 0, unitIds: [] });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleUnitToggle = (unitId) => {
    setFormData(prev => ({
      ...prev,
      unitIds: prev.unitIds.includes(unitId)
        ? prev.unitIds.filter(id => id !== unitId)
        : [...prev.unitIds, unitId]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-[480px] p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Thêm mặt hàng</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tên mặt hàng</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
              placeholder="Nhập tên mặt hàng"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Đơn giá (VNĐ)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
              placeholder="Nhập đơn giá"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Đơn vị tính</label>
            <div className="border border-gray-300 rounded-lg px-4 py-3 space-y-2 max-h-40 overflow-y-auto">
              {units && units.length > 0 ? (
                units.map(unit => (
                  <label key={unit.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input
                      type="checkbox"
                      checked={formData.unitIds.includes(unit.id)}
                      onChange={() => handleUnitToggle(unit.id)}
                      className="w-4 h-4 text-cyan-500 rounded focus:ring-cyan-500"
                    />
                    <span className="text-sm text-gray-700">{unit.name}</span>
                  </label>
                ))
              ) : (
                <p className="text-sm text-gray-500">Chưa có đơn vị tính nào</p>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold shadow-sm transition duration-200"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold shadow-md transition duration-200"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddUnitModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({ name: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-[480px] p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Thêm đơn vị tính</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tên đơn vị tính</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
              placeholder="Nhập tên đơn vị tính"
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold shadow-sm transition duration-200"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold shadow-md transition duration-200"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditRulesPage;
