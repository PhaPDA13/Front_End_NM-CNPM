import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { invoiceSchema } from "./schema/schemaInvoice";
import { useState } from "react";

const MOCK_EXPORTS = [
  { id: 1, code: "PX001", date: "2025-10-05", total: 5000000 },
  { id: 2, code: "PX002", date: "2025-10-10", total: 3000000 },
  { id: 3, code: "PX003", date: "2025-10-15", total: 2000000 },
];

function InvoicePage() {
  const [selected, setSelected] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(invoiceSchema),
    defaultValues: {
      exportIds: [],
    },
  });

  const toggleExport = (id) => {
    setSelected((prev) => {
      const newSelected = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];

      // 🔥 QUAN TRỌNG
      setValue("exportIds", newSelected, { shouldValidate: true });

      return newSelected;
    });
  };


  const totalMoney = MOCK_EXPORTS
    .filter((x) => selected.includes(x.id))
    .reduce((sum, x) => sum + x.total, 0);

  const onSubmit = (data) => {
    const payload = {
      ...data,
      exportIds: selected,
      total: totalMoney,
    };

    console.log("HOÁ ĐƠN:", payload);
    alert("Lập hoá đơn thành công (xem console)");
  };

  return (
    <div className="p-6 mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Lập hoá đơn thu tiền</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >
        {/* ==== THÔNG TIN ==== */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label>Đại lý</label>
            <select
              {...register("agencyId")}
              className="w-full border p-2 rounded"
            >
              <option value="">-- Chọn đại lý --</option>
              <option value="A">Đại lý A</option>
              <option value="B">Đại lý B</option>
            </select>
            <p className="text-red-500 text-sm">{errors.agencyId?.message}</p>
          </div>

          <div>
            <label>Tháng thu</label>
            <input
              type="month"
              {...register("month")}
              className="w-full border p-2 rounded"
            />
            <p className="text-red-500 text-sm">{errors.month?.message}</p>
          </div>

          <div>
            <label>Ngày lập</label>
            <input
              type="date"
              {...register("createdDate")}
              className="w-full border p-2 rounded"
            />
            <p className="text-red-500 text-sm">
              {errors.createdDate?.message}
            </p>
          </div>
        </div>

        {/* ==== PHIẾU XUẤT ==== */}
        <table className="w-full border mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th></th>
              <th>Mã phiếu</th>
              <th>Ngày xuất</th>
              <th className="text-right">Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_EXPORTS.map((x) => (
              <tr key={x.id}>
                <td className="border p-2 text-center">
                  <input
                    type="checkbox"
                    checked={selected.includes(x.id)}
                    onChange={() => toggleExport(x.id)}
                  />
                </td>
                <td className="border p-2">{x.code}</td>
                <td className="border p-2">{x.date}</td>
                <td className="border p-2 text-right">
                  {x.total.toLocaleString()} đ
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="text-red-500 text-sm">
          {errors.exportIds?.message}
        </p>

        {/* ==== TỔNG ==== */}
        <div className="text-right font-semibold text-lg">
          Tổng thu: {totalMoney.toLocaleString()} đ
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-cyan-500 text-white rounded-lg"
          >
            Lập hoá đơn
          </button>
        </div>
      </form>
    </div>
  );
}

export default InvoicePage;
