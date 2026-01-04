import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { exportInvoiceSchema } from "./schema/schemaExportInvoice";
import Input from "../../components/Input";
import Select from "../../components/Select";
import agencyApi from "../../services/agencyApi";
import productsApi from "../../services/productsApi";
// import unitsApi from "../../services/unitsApi"; // Có thể không cần nếu load unit theo product
import billApi from "../../services/billApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import agentTypeApi from "../../services/agentTypes";

function CreateExportInvoicePage() {
  const [items, setItems] = useState([]);
  const [agencies, setAgencies] = useState([]);

  // State cho các dropdown phụ thuộc
  const [availableProducts, setAvailableProducts] = useState([]);
  const [availableUnits, setAvailableUnits] = useState([]);

  const [selectedAgency, setSelectedAgency] = useState(null);

  const [currentItem, setCurrentItem] = useState({
    productId: "",
    productName: "",
    unitId: "",
    unitName: "",
    quantity: "",
    price: "",
  });

  const loadingBarRef = useRef(null);
  const [itemError, setItemError] = useState("");

  // 1. Chỉ load danh sách Đại lý khi vào trang
  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        loadingBarRef.current?.continuousStart();
        const agencyRes = await agencyApi.getAll();
        setAgencies(agencyRes.data);
      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
        toast.error("Không thể tải danh sách đại lý");
      } finally {
        loadingBarRef.current?.complete();
      }
    };
    fetchMasterData();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(exportInvoiceSchema),
    shouldUnregister: false,
  });

  // 2. Xử lý khi chọn Đại lý (Agent) -> Load Products
  const handleAgencyChange = async (e) => {
    const selectedId = Number(e.target.value);
    const agency = agencies.find((a) => a.id === selectedId);

    setSelectedAgency(agency);

    // Reset lại sản phẩm và item hiện tại khi đổi đại lý
    setAvailableProducts([]);
    setAvailableUnits([]);
    setCurrentItem({
      productId: "",
      productName: "",
      unitId: "",
      unitName: "",
      quantity: "",
      price: "",
    });

    if (agency && agency.agentType) {
      try {
        loadingBarRef.current?.continuousStart();
        // Gọi API lấy sản phẩm dựa trên loại đại lý (agentType.id)
        // Lưu ý: Đảm bảo API trả về đúng cấu trúc (res.data hoặc res.data.products tùy BE)
        const res = await agentTypeApi.getProductsByAgentId(
          agency.agentType.id
        );

        console.log(res);
        // Kiểm tra log để xem cấu trúc data trả về nếu không hiện
        if (Array.isArray(res.data.products)) {
          const productList = res.data.products.map((item) => item.product);
          setAvailableProducts(productList);
        } else {
          setAvailableProducts([]);
        }
      } catch (error) {
        console.error("Lỗi tải sản phẩm của đại lý:", error);
        toast.error("Không thể tải danh sách sản phẩm cho đại lý này");
        setAvailableProducts([]);
      } finally {
        loadingBarRef.current?.complete();
      }
    }
  };

  // 3. Xử lý khi chọn Sản phẩm -> Load Units
  const handleProductChange = async (e) => {
    const selectedId = Number(e.target.value);
    const product = availableProducts.find((p) => p.id === selectedId);

    console.log("kkk");
    if (product) {
      // Cập nhật thông tin sản phẩm
      setCurrentItem((prev) => ({
        ...prev,
        productId: selectedId,
        productName: product.name,
        price: product.price,
        unitId: "", // Reset unit khi đổi sản phẩm
        unitName: "",
      }));

      // Gọi API lấy đơn vị tính dựa trên Product ID
      try {
        loadingBarRef.current?.continuousStart();
        const res = await productsApi.getUnitsByProductId(selectedId);
        if (res.success && Array.isArray(res.data)) {
          const unitList = res.data.map((item) => item.unit);
          setAvailableUnits(unitList);
        } else {
          setAvailableUnits([]);
        }
      } catch (error) {
        console.error("Lỗi tải đơn vị tính:", error);
        toast.error("Không thể tải đơn vị tính của sản phẩm");
        setAvailableUnits([]);
      } finally {
        loadingBarRef.current?.complete();
      }
    } else {
      // Nếu không chọn sản phẩm (value rỗng)
      setCurrentItem((prev) => ({
        ...prev,
        productId: "",
        productName: "",
        price: "",
        unitId: "",
        unitName: "",
      }));
      setAvailableUnits([]);
    }
  };

  const handleUnitChange = (e) => {
    const selectedId = Number(e.target.value);
    const unit = availableUnits.find((u) => u.id === selectedId);

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

    // Reset item input nhưng giữ lại danh sách Products của đại lý đang chọn
    // Reset Unit vì mỗi sản phẩm có unit khác nhau
    setCurrentItem({
      productId: "",
      productName: "",
      unitId: "",
      unitName: "",
      quantity: "",
      price: "",
    });
    setAvailableUnits([]); // Ẩn list unit đi chờ chọn sản phẩm mới
    setItemError("");
  };

  const onSubmitInvoice = async (data) => {
    try {
      loadingBarRef.current?.continuousStart();
      if (items.length === 0) {
        toast.warning("Phiếu xuất phải có ít nhất 1 mặt hàng");
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
      toast.success(response.message || "Tạo phiếu thành công");

      reset();
      setItems([]);
      setAvailableProducts([]); // Reset luôn list sản phẩm
      setAvailableUnits([]);
      setSelectedAgency(null);
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      toast.error(
        error.response?.data?.error?.message || "Có lỗi xảy ra khi tạo đơn"
      );
    } finally {
      loadingBarRef.current?.complete();
    }
  };

  const navigate = useNavigate();
  const totalMoney = items.reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 md:p-10 font-sans">
      <LoadingBar color="#06b6d4" ref={loadingBarRef} height={3} />
      <div className="mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-gray-800 dark:text-white tracking-tight">
          Lập phiếu xuất hàng
        </h1>
        <div className="rounded-3xl bg-white dark:bg-gray-800 p-8">
          <form onSubmit={handleSubmit(onSubmitInvoice)} className="space-y-10">
            <div>
              <h2 className="mb-6 text-xl font-bold text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">
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
                      onChange={(e) => {
                        field.onChange(e);
                        handleAgencyChange(e);
                      }}
                      value={field.value}
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
              <div className="flex justify-between items-end mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">
                <h2 className="text-xl font-bold text-gray-800">
                  Chi tiết hàng hóa
                </h2>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                  {items.length} mặt hàng
                </span>
              </div>

              <div className="rounded-2xl bg-slate-50 dark:bg-gray-800 p-6 border border-slate-100 dark:border-gray-600 relative">
                {itemError && (
                  <div className="absolute top-2 left-6 text-red-500 text-sm font-medium">
                    * {itemError}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-12 items-start mt-2">
                  <div className="md:col-span-4">
                    <Select
                      label="Sản phẩm"
                      placeholder={
                        availableProducts.length > 0
                          ? "-- Chọn sản phẩm --"
                          : "-- Vui lòng chọn đại lý trước --"
                      }
                      options={availableProducts}
                      value={currentItem.productId}
                      onChange={handleProductChange}
                      className="bg-white"
                      disabled={availableProducts.length === 0}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Select
                      label="Đơn vị tính"
                      placeholder={
                        availableUnits.length > 0
                          ? "-- Chọn đơn vị --"
                          : "-- Chọn sản phẩm trước --"
                      }
                      options={availableUnits}
                      value={currentItem.unitId}
                      onChange={handleUnitChange}
                      className="bg-white"
                      disabled={availableUnits.length === 0}
                    />
                  </div>

                  {/* Các phần còn lại giữ nguyên */}
                  <div className="md:col-span-2">
                    <Input
                      label="Số lượng"
                      type="number"
                      className="bg-white"
                      value={currentItem.quantity}
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
                      <label className="mb-1 font-medium text-gray-700 dark:text-gray-300">
                        Đơn giá
                      </label>
                      <div className="w-full p-4 rounded-xl bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-white border border-gray-300 dark:border-gray-600 cursor-not-allowed">
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
                      className="h-[58px] w-full rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold hover:bg-gray-800 dark:hover:bg-gray-900 dark:hover:text-white  transition flex items-center justify-center"
                    >
                      <span className="text-xl">+</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bảng danh sách và Footer giữ nguyên */}
            <div className="overflow-hidden rounded-xl border border-gray-100 dark:border-gray-600 shadow-sm">
              <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-300">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      Mặt hàng
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      ĐVT
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      Số lượng
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      Đơn giá
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                      Thành tiền
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-300"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-300 bg-white dark:bg-gray-800">
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
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                          {i.productName}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-white">
                          {i.unitName}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white text-right">
                          {i.quantity}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white text-right">
                          {i.price.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white text-right">
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

            <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t border-gray-100 dark:border-gray-600">
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">
                  Tổng giá trị đơn hàng
                </p>
                <p className="text-4xl font-bold text-gray-900 dark:text-white">
                  {totalMoney.toLocaleString()}{" "}
                  <span className="text-xl text-gray-400 font-medium">VNĐ</span>
                </p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => navigate("/list-export")}
                  className="w-full md:w-auto h-14 px-6 rounded-xl dark:bg-white border border-gray-300  text-gray-700 font-semibold hover:bg-gray-900  hover:text-white dark:hover:border-gray-900 transition-all mr-5"
                >
                  Quay lại
                </button>

                <button
                  type="submit"
                  className="w-full md:w-auto h-14 px-8 rounded-xl bg-cyan-500 text-white font-bold text-lg hover:bg-cyan-600 transition-all transform active:scale-95"
                >
                  Hoàn tất đơn hàng
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateExportInvoicePage;
