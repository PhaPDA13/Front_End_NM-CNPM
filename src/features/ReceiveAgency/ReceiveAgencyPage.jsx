import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/Input";
import { receiveAgentSchema } from "./schema/schemaReceiveAgency.js";
import agencyApi from "../../services/agencyApi.js";
import { toast } from "react-toastify";

function ReceiveAgentPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(receiveAgentSchema)
  });

  const onSubmit = async (data) => {
   try {
      const response = await agencyApi.create(data)
      toast.success("Create agent")
      reset()
   } catch (error) {
      toast.error(error?.response?.data?.error?.message ?? "Failed")
   }
  };
  return (
    <div className="p-8 bg-white min-h-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Tiếp nhận đại lý mới
        </h1>
        <p className="text-gray-500">
          Nhập thông tin đại lý để đăng ký vào hệ thống
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 max-w-5xl relative left-1/2 top-1/2 -translate-x-1/2">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Thông tin đại lý
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Vui lòng nhập đầy đủ thông tin bên dưới
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Tên */}
          <Input
            label="Tên"
            placeholder="Đại lý A"
            error={errors.name}
            {...register("name")}
          />

          {/* Loại đại lý */}
          <div className="flex flex-col w-full">
            <label className="mb-1 font-medium text-gray-700">
              Loại đại lý
            </label>
            <select
              {...register("agentTypeId")}
              className={`w-full p-4 rounded-xl bg-gray-100 text-gray-800
            border transition duration-150 outline-0
            ${errors.type ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="">Chọn loại</option>
              <option value="1">Loại 1</option>
              <option value="2">Loại 2</option>
            </select>
            {errors.agentTypeId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.agentTypeId.message && ""}
              </p>
            )}
          </div>

          {/* Điện thoại */}
          <Input
            label="Điện thoại"
            placeholder="0987654321"
            error={errors.phone}
            {...register("phone")}
          />

          {/* Quận */}
          <div className="flex flex-col w-full">
            <label className="mb-1 font-medium text-gray-700">
              Quận
            </label>
            <select
              defaultValue=""
              {...register("districtId")}
              className={`w-full p-4 rounded-xl bg-gray-100 text-gray-800
            border transition duration-150 outline-0
            ${errors.districtId ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="" disabled>
                Chọn Quận
              </option>
              {Array.from({ length: 20 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Quận {i + 1}
                </option>
              ))}
            </select>
            {errors.districtId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.districtId.message ?? ""}
              </p>
            )}
          </div>

          {/* Email */}
          <Input
            label="Email"
            type="email"
            placeholder="username@example.com"
            error={errors.email}
            {...register("email")}
          />

          {/* Địa chỉ */}
          <div className="md:col-span-2">
            <Input
              label="Địa chỉ"
              placeholder="456 Lê Lợi, Quận 3, TP.HCM"
              error={errors.address}
              {...register("address")}
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg font-medium shadow"
            >
              Tiếp nhận đại lý
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReceiveAgentPage;