import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { exportInvoiceSchema } from "./schema/schemaExportInvoice";
import Input from "../../components/Input";
import Select from "../../components/Select";
import agencyApi from "../../services/agencyApi";
import productsApi from "../../services/productsApi";
import unitsApi from "../../services/unitsApi";
import billApi from "../../services/billApi";
import { toast } from "react-toastify";

function ExportInvoicePage() {
  const [items, setItems] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [products, setProducts] = useState([]);
  const [units, setUnits] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    productId: "", 
    productName: "", 
    unitId: "", 
    unitName: "", 
    quantity: "",
    price: "",
  });
  const [itemError, setItemError] = useState("");
  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        const [agencyRes, productRes, unitRes] = await Promise.all([
          agencyApi.getAll(),
          productsApi.getAll(),
          unitsApi.getAll(),
        ]);

        setAgencies(agencyRes.data);
        setProducts(productRes.data);
        setUnits(unitRes.data);
      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
      }
    };
    fetchMasterData();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(exportInvoiceSchema),
    shouldUnregister: false,
  });

  const handleProductChange = (e) => {
    const selectedId = Number(e.target.value);
    const product = products.find((p) => p.id === selectedId);

    if (product) {
      setCurrentItem((prev) => ({
        ...prev,
        productId: selectedId,
        productName: product.name,
        price: product.price, 
      }));
    } else {
      setCurrentItem((prev) => ({
        ...prev,
        productId: "",
        productName: "",
        price: "",
      }));
    }
  };

  const handleUnitChange = (e) => {
    const selectedId = Number(e.target.value);
    const unit = units.find((u) => u.id === selectedId);

    setCurrentItem((prev) => ({
      ...prev,
      unitId: selectedId || "",
      unitName: unit?.name || "",
    }));
  };

  const handleAddItem = () => {
    if (
      !currentItem.productId ||
      !currentItem.unitId ||
      !currentItem.quantity
    ) {
      setItemError("Vui lòng chọn sản phẩm, đơn vị tính và nhập số lượng!");
      return;
    }

    if (Number(currentItem.quantity) <= 0) {
      setItemError("Số lượng phải lớn hơn 0");
      return;
    }

    const newItem = {
      productName: currentItem.productName,
      unitName: currentItem.unitName,
      productId: Number(currentItem.productId),
      unitId: Number(currentItem.unitId),
      quantity: Number(currentItem.quantity),
      price: Number(currentItem.price),
      amount: Number(currentItem.quantity) * Number(currentItem.price),
    };

    setItems([...items, newItem]);
    setCurrentItem({
      productId: "",
      productName: "",
      unitId: "",
      unitName: "",
      quantity: "",
      price: "",
    });
    setItemError("");
  };
  const onSubmitInvoice = async (data) => {
    try {
      if (items.length === 0) {
        alert("Phiếu xuất phải có ít nhất 1 mặt hàng");
        return;
      }
      const detailsPayload = items.map((item) => ({
        productId: item.productId,
        unitId: item.unitId,
        quantity: item.quantity,
        price: item.price,
      }));

      const payload = {
        agentId: Number(data.agentId), 
        issueDate: data.issueDate, 
        details: detailsPayload, 
      };

      const response = await billApi.create(payload);
      toast.success(response.message || "Tạo phiếu thành công")
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      toast.error(
        error.response?.data?.error?.message || "Có lỗi xảy ra khi tạo đơn"
      );
    }
  };
  const totalMoney = items.reduce((sum, i) => sum + i.amount, 0);
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-800 tracking-tight">
          Lập phiếu xuất hàng
        </h1>
        <div className="rounded-3xl bg-white p-8 shadow-xl shadow-gray-200/50">
          <form onSubmit={handleSubmit(onSubmitInvoice)} className="space-y-10">
            <div>
              <h2 className="mb-6 text-xl font-bold text-gray-800 border-b border-gray-100 pb-2">
                Thông tin chung
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Controller
                  name="agentId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Đại lý nhận hàng"
                      placeholder="-- Chọn đại lý --"
                      options={agencies}
                      error={errors.agentId}
                      {...field}
                    />
                  )}
                />
                <Input
                  label="Ngày xuất phiếu"
                  type="date"
                  {...register("issueDate")}
                  error={errors.issueDate}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-end mb-4 border-b border-gray-100 pb-2">
                <h2 className="text-xl font-bold text-gray-800">
                  Chi tiết hàng hóa
                </h2>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {items.length} mặt hàng
                </span>
              </div>

              <div className="rounded-2xl bg-slate-50 p-6 border border-slate-100 relative">
                {itemError && (
                  <div className="absolute top-2 left-6 text-red-500 text-sm font-medium">
                    * {itemError}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-12 items-start mt-2">
                
                  <div className="md:col-span-4">
                    <Select
                      label="Sản phẩm"
                      placeholder="-- Chọn sản phẩm --"
                      options={products} 
                      value={currentItem.productId}
                      onChange={handleProductChange} 
                      className="bg-white"
                    />
                  </div>

                 
                  <div className="md:col-span-2">
                    <Select
                      label="ĐVT"
                      placeholder="-- ĐVT --"
                      options={units} 
                      value={currentItem.unitId}
                      onChange={handleUnitChange}
                      className="bg-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Input
                      label="Số lượng"
                      type="number"
                      className="bg-white"
                      value={currentItem.quantity || 1}
                      onChange={(e) =>
                        setCurrentItem({
                          ...currentItem,
                          quantity: e.target.value,
                        })
                      }
                      placeholder="0"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <div className="flex flex-col w-full">
                      <label className="mb-1 font-medium text-gray-700">
                        Đơn giá
                      </label>
                      <div className="w-full p-4 rounded-xl bg-gray-200 text-gray-600 border border-gray-300 cursor-not-allowed">
                        {currentItem.price
                          ? Number(currentItem.price).toLocaleString()
                          : "0"}
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-1 flex items-start pt-[29px]">
                    <button
                      type="button"
                      onClick={handleAddItem}
                      className="h-[58px] w-full rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition shadow-lg shadow-gray-300/50 flex items-center justify-center"
                    >
                      <span className="text-xl">+</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-gray-100 shadow-sm">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Mặt hàng
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      ĐVT
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                      SL
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Đơn giá
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-700">
                      Thành tiền
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {items.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-10 text-center text-gray-400 italic"
                      >
                        Chưa có dữ liệu. Vui lòng thêm mặt hàng.
                      </td>
                    </tr>
                  ) : (
                    items.map((i, idx) => (
                      <tr
                        key={idx}
                        className="group hover:bg-blue-50/50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {i.productName}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {i.unitName}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 text-right">
                          {i.quantity}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 text-right">
                          {i.price.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-gray-900 text-right">
                          {i.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            type="button"
                            onClick={() =>
                              setItems(
                                items.filter((_, index) => index !== idx)
                              )
                            }
                            className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition opacity-0 group-hover:opacity-100"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col md:flex-row justify-end items-center gap-6 pt-6 border-t border-gray-100">
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">
                  Tổng giá trị đơn hàng
                </p>
                <p className="text-4xl font-bold text-gray-900">
                  {totalMoney.toLocaleString()}{" "}
                  <span className="text-xl text-gray-400 font-medium">VNĐ</span>
                </p>
              </div>

              <button
                type="submit"
                className="w-full md:w-auto h-14 px-8 rounded-xl bg-cyan-500 text-white font-bold text-lg hover:bg-cyan-600 shadow-lg shadow-cyan-200 transition-all transform active:scale-95"
              >
                Hoàn tất đơn hàng
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ExportInvoicePage;
