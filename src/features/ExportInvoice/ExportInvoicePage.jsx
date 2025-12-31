import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { exportInvoiceSchema } from "./schema/schemaExportInvoice";
import { exportItemSchema } from "./schema/schemaItem";


function ExportInvoicePage() {
  const [items, setItems] = useState([]);

  /* -------- FORM LẬP PHIẾU -------- */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(exportInvoiceSchema),
  });

  /* -------- FORM THÊM HÀNG -------- */
  const {
    register: registerItem,
    handleSubmit: handleSubmitItem,
    reset: resetItem,
    formState: { errors: itemErrors },
  } = useForm({
    resolver: yupResolver(exportItemSchema),
  });

  /* -------- SUBMIT -------- */
  const onSubmitInvoice = (data) => {
    if (items.length === 0) {
      alert("Phiếu xuất phải có ít nhất 1 mặt hàng");
      return;
    }

    const payload = {
      ...data,
      items,
      total: items.reduce((sum, i) => sum + i.amount, 0),
    };

    console.log("PHIẾU XUẤT:", payload);
    alert("Lập phiếu thành công (xem console)");
  };

  const totalMoney = items.reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Lập phiếu xuất hàng</h1>

      {/* ================= FORM LẬP PHIẾU ================= */}
      <form
        onSubmit={handleSubmit(onSubmitInvoice)}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Đại lý</label>
            <input
              {...register("agencyID")}
              className="w-full border p-3 rounded-lg"
              placeholder="Tên đại lý"
            />
            <p className="text-red-500 text-sm">{errors.agencyId?.message}</p>
          </div>

          <div>
            <label className="font-medium">Ngày xuất</label>
            <input
              type="date"
              {...register("createdDate")}
              className="w-full border p-3 rounded-lg"
            />
            <p className="text-red-500 text-sm">
              {errors.createdDate?.message}
            </p>
          </div>
        </div>

        {/* ================= THÊM HÀNG ================= */}
        <div className="mt-6">
          <h2 className="font-semibold text-lg mb-2">Thêm mặt hàng</h2>

          <div className="grid grid-cols-4 gap-3 items-end">
            <div>
              <label>Mặt hàng</label>
              <input
                {...registerItem("product")}
                className="w-full border p-2 rounded"
              />
              <p className="text-red-500 text-sm">
                {itemErrors.product?.message}
              </p>
            </div>

            <div>
              <label>ĐVT</label>
              <input
                {...registerItem("unit")}
                className="w-full border p-2 rounded"
              />
              <p className="text-red-500 text-sm">
                {itemErrors.unit?.message}
              </p>
            </div>

            <div>
              <label>Số lượng</label>
              <input
                type="number"
                {...registerItem("quantity")}
                className="w-full border p-2 rounded"
              />
              <p className="text-red-500 text-sm">
                {itemErrors.quantity?.message}
              </p>
            </div>

            <div>
              <label>Đơn giá</label>
              <input
                type="number"
                {...registerItem("price")}
                className="w-full border p-2 rounded"
              />
              <p className="text-red-500 text-sm">
                {itemErrors.price?.message}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSubmitItem((data) => {
              setItems((prev) => [
                ...prev,
                {
                  ...data,
                  quantity: Number(data.quantity),
                  price: Number(data.price),
                  amount: data.quantity * data.price,
                },
              ]);
              resetItem();
            })}
            className="bg-black text-white h-10 rounded-lg w-20 mt-3"
          >
            Thêm
          </button>
        </div>


        {/* ================= BẢNG HÀNG ================= */}
        <table className="w-full border mt-5">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Mặt hàng</th>
              <th className="border p-2">ĐVT</th>
              <th className="border p-2">SL</th>
              <th className="border p-2">Đơn giá</th>
              <th className="border p-2">Thành tiền</th>
              <th className="border p-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i, idx) => (
              <tr key={idx}>
                <td className="border p-2">{i.product}</td>
                <td className="border p-2">{i.unit}</td>
                <td className="border p-2 text-right">{i.quantity}</td>
                <td className="border p-2 text-right">
                  {i.price.toLocaleString()}
                </td>
                <td className="border p-2 text-right">
                  {i.amount.toLocaleString()}
                </td>
                <td className="border p-2 text-center">
                  <button
                    type="button"
                    onClick={() =>
                      setItems(items.filter((_, index) => index !== idx))
                    }
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right font-semibold">
          Tổng tiền: {totalMoney.toLocaleString()} đ
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-cyan-500 text-white rounded-lg"
          >
            Lập phiếu
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExportInvoicePage;
