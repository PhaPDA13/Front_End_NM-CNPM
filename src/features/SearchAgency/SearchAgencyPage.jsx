import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { agencySchema } from "./schema/schemaSearchAgency";


function SearchAgencyPage() {
  const agencies = [
    {
      id: "001",
      name: "Đại lý Hoàng Long",
      type: "Loại 2",
      phone: "0987654321",
      email: "hoanglong@example.com",
      address: "456 Lê Lợi, Quận 3, TP.HCM",
      debt: 8000000,
    },
    {
      id: "002",
      name: "Đại lý Hoàng Long",
      type: "Loại 1",
      phone: "0987654321",
      email: "hoanglong@example.com",
      address: "456 Lê Lợi, Quận 3, TP.HCM",
      debt: 8000000,
    },
    {
      id: "003",
      name: "Đại lý Hoàng Long",
      type: "Loại 2",
      phone: "0987654321",
      email: "hoanglong@example.com",
      address: "456 Lê Lợi, Quận 3, TP.HCM",
      debt: 8000000,
    },
  ];

  const [open, setOpen] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState(null);

  return (
    <div className="p-6">
      {/* Title */}
      <h1 className="text-xl font-semibold mb-6">
        Tra cứu đại lý
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap items-end gap-4">
        <input
          placeholder="🔍 Tìm kiếm"
          className="h-14 w-64 px-4 rounded-xl bg-gray-100 border border-gray-300 outline-0"
        />

        <select className="h-14 px-4 rounded-xl bg-gray-100 border border-gray-300">
          <option>Tất cả</option>
          <option>Loại 1</option>
          <option>Loại 2</option>
        </select>

        <select className="h-14 px-4 rounded-xl bg-gray-100 border border-gray-300">
          <option>Tất cả</option>
          {Array.from({ length: 20 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              Quận {i + 1}
            </option>
          ))}
        </select>

        <button className="h-14 px-6 rounded-xl bg-cyan-500 text-white font-medium hover:bg-cyan-600">
          Lọc
        </button>
      </div>

      {/* Table */}
      <div className="mt-6 bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="p-4 text-left">MÃ</th>
              <th className="p-4 text-left">TÊN ĐẠI LÝ</th>
              <th className="p-4 text-left">LOẠI</th>
              <th className="p-4 text-left">THÔNG TIN LIÊN HỆ</th>
              <th className="p-4 text-left">ĐỊA CHỈ</th>
              <th className="p-4 text-left">CÔNG NỢ</th>
              <th className="p-4"></th>
            </tr>
          </thead>

          <tbody>
            {agencies.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="p-4">{a.id}</td>

                <td className="p-4 font-medium">{a.name}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                      ${a.type === "Loại 2"
                        ? "bg-green-100 text-green-600"
                        : "bg-purple-100 text-purple-600"
                      }`}
                  >
                    {a.type}
                  </span>
                </td>

                <td className="p-4 text-gray-600">
                  <div>📞 {a.phone}</div>
                  <div>✉️ {a.email}</div>
                </td>

                <td className="p-4 text-gray-600">
                  {a.address}
                </td>

                <td className="p-4 text-red-600 font-semibold">
                  {a.debt.toLocaleString()} đ
                </td>

                <td className="p-4">
                  <button onClick={() => {
                    setSelectedAgency(a);
                    setOpen(true);
                  }}
                    className="px-4 py-1 bg-cyan-500 text-white rounded-lg text-sm">
                    Cập nhật
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-end items-center gap-2 p-4">
          <button className="px-3 py-1">Trước</button>
          <button className="px-3 py-1 bg-cyan-500 text-white rounded">
            1
          </button>
          <button className="px-3 py-1">2</button>
          <button className="px-3 py-1">3</button>
          <button className="px-3 py-1">Sau</button>
        </div>
      </div>
      <UpdateAgencyModal
        open={open}
        agency={selectedAgency}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

function UpdateAgencyModal({ open, onClose, agency }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(agencySchema),
    defaultValues: agency,
  });

  useEffect(() => {
    if (agency) {
      reset(agency);
    }
  }, [agency, reset]);

  if (!open || !agency) return null;

  const onSubmit = (data) => {
    console.log("DATA UPDATE:", data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[800px] p-6">
        <h2 className="text-xl font-semibold mb-6">
          Cập nhật đại lý
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          {/* Tên đại lý */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Tên đại lý
            </label>
            <input
              {...register("name")}
              className="border p-3 rounded-lg w-full"
              placeholder="Nhập tên đại lý"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Ngày tiếp nhận */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Ngày tiếp nhận
            </label>
            <input
              type="date"
              {...register("receiveDate")}
              className="border p-3 rounded-lg w-full"
            />
            {errors.receiveDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.receiveDate.message}
              </p>
            )}
          </div>

          {/* Điện thoại */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Số điện thoại
            </label>
            <input
              {...register("phone")}
              className="border p-3 rounded-lg w-full"
              placeholder="Nhập số điện thoại"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              {...register("email")}
              className="border p-3 rounded-lg w-full"
              placeholder="example@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Loại đại lý */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Loại đại lý
            </label>
            <select
              {...register("type")}
              className="border p-3 rounded-lg w-full bg-white"
            >
              <option value="">-- Chọn loại --</option>
              <option value="Loại 1">Loại 1</option>
              <option value="Loại 2">Loại 2</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">
                {errors.type.message}
              </p>
            )}
          </div>

          {/* Quận */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Quận
            </label>
            <select
              {...register("district")}
              className="border p-3 rounded-lg w-full bg-white"
            >
              <option value="">-- Chọn quận --</option>
              {Array.from({ length: 20 }, (_, i) => (
                <option key={i + 1} value={`Quận ${i + 1}`}>
                  Quận {i + 1}
                </option>
              ))}
            </select>
            {errors.district && (
              <p className="text-red-500 text-sm mt-1">
                {errors.district.message}
              </p>
            )}
          </div>

          {/* Địa chỉ */}
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">
              Địa chỉ
            </label>
            <input
              {...register("address")}
              className="border p-3 rounded-lg w-full"
              placeholder="Nhập địa chỉ đại lý"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border rounded-lg"
            >
              Hủy
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-cyan-500 text-white rounded-lg"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default SearchAgencyPage;