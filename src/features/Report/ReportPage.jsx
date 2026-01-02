import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { reportSchema } from "./schema/schemaReport";

const agencies = [
  { id: 1, name: "Đại lý A" },
  { id: 2, name: "Đại lý B" },
];

function ReportListPage() {
  const [reports, setReports] = useState([
    {
      id: 1,
      title: "Báo cáo công nợ - Đại lý A - Tháng 10/2025",
      total: 10000000,
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(reportSchema),
  });

  const onSubmit = (data) => {
    const agent = agencies.find(
      (a) => a.id === Number(data.agentId)
    );

    const monthText =
      data.month.split("-")[1] +
      "/" +
      data.month.split("-")[0];

    const newReport = {
      id: Date.now(),
      title: `${data.type === "DEBT"
        ? "Báo cáo công nợ"
        : "Báo cáo doanh số"
        } - ${agent.name} - Tháng ${monthText}`,
      total: Math.floor(Math.random() * 20000000) + 5000000,
    };

    setReports((prev) => [newReport, ...prev]);
    reset();
    setShowForm(false);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <h1 className="text-3xl font-bold mb-6">
        Báo cáo hàng tháng
      </h1>

      {/* Danh sách báo cáo */}
      <div className="space-y-4 mb-8 w-full">
        {reports.map((r) => (
          <div
            key={r.id}
            className="flex justify-between items-center bg-white shadow p-4 rounded-xl"
          >
            <div>
              <p className="font-semibold">{r.title}</p>
              <p className="text-sm text-gray-600">
                Tổng tiền: {r.total.toLocaleString()} VNĐ
              </p>
            </div>
            <button className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white cursor-pointer">
              Chi tiết
            </button>
          </div>
        ))}
      </div>

      {/* Nút mở form */}
      <div className="flex justify-end w-full mb-4">
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold cursor-pointer"
        >
          Lập báo cáo
        </button>
      </div>

      {/* Form lập báo cáo */}
      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 bg-white p-6 rounded-2xl shadow space-y-5 max-w-xl mx-auto"
        >
          <h2 className="text-lg font-bold">Lập báo cáo</h2>

          {/* Đại lý */}
          <div>
            <label className="font-medium">Đại lý</label>
            <Controller
              name="agentId"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full mt-1 p-3 border rounded-xl"
                >
                  <option value="">-- Chọn đại lý --</option>
                  {agencies.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              )}
            />
            <p className="text-red-500 text-sm">
              {errors.agentId?.message}
            </p>
          </div>

          {/* Tháng */}
          <div>
            <label className="font-medium">Tháng</label>
            <Controller
              name="month"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="month"
                  className="w-full mt-1 p-3 border rounded-xl"
                />
              )}
            />
            <p className="text-red-500 text-sm">
              {errors.month?.message}
            </p>
          </div>

          {/* Loại báo cáo */}
          <div>
            <label className="font-medium">Loại báo cáo</label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full mt-1 p-3 border rounded-xl"
                >
                  <option value="">-- Chọn loại --</option>
                  <option value="DEBT">Báo cáo công nợ</option>
                  <option value="REVENUE">Báo cáo doanh số</option>
                </select>
              )}
            />
            <p className="text-red-500 text-sm">
              {errors.type?.message}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-5 py-2 hover:bg-gray-100 rounded-xl border cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-semibold cursor-pointer"
            >
              Lập báo cáo
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ReportListPage;
