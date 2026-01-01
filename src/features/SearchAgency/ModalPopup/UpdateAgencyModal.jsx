import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { agencySchema } from "../schema/schemaSearchAgency";
import { useEffect } from "react";
import { X } from "lucide-react";
import Input from "../../../components/Input";
import agencyApi from "../../../services/agencyApi";
import { toast } from "react-toastify";

const Select = ({ label, error, children, ...props }) => (
  <div className="flex flex-col w-full">
    {label && <label className="mb-1 font-medium text-gray-700">{label}</label>}
    <div className="relative">
      <select
        className={`w-full p-4 rounded-xl bg-gray-100 text-gray-800 appearance-none
          border transition duration-150 outline-none focus:ring-2 focus:ring-cyan-500/20
          ${
            error ? "border-red-500" : "border-gray-300 hover:border-cyan-400"
          }`}
        {...props}
      >
        {children}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);


export default function UpdateAgencyModal({ open, onClose, agency, onReload }) {
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

  const onSubmit = async (data) => {
    try {
      const {name, email, address,phone, debtAmount, districtId, agentTypeId} = data
      const payload = {
        name, email, address, phone, debtAmount, districtId, agentTypeId
      }
      await agencyApi.update(agency.id, payload);
      toast.success("Cập nhật đại lý thành công!");
      if (onReload) {
        onReload(); 
      }
      onClose(); 
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      toast.error(
        error.response?.data?.error?.message || "Có lỗi xảy ra khi cập nhật"
      );
    }
  };
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity">
      <div className="bg-white rounded-3xl w-[850px] max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Cập nhật đại lý
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Chỉnh sửa thông tin chi tiết của đại lý
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-400 hover:text-gray-600" />
          </button>
        </div>
        <div className="p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="md:col-span-2">
              <Input
                label="Tên đại lý"
                placeholder="Nhập tên đại lý đầy đủ"
                error={errors.name}
                {...register("name")}
              />
            </div>

            <Input
              label="Email"
              type="email"
              placeholder="example@email.com"
              error={errors.email}
              {...register("email")}
            />
            <Input
              label="Số điện thoại"
              placeholder="0912 xxx xxx"
              error={errors.phone}
              {...register("phone")}
            />

            <Input
              label="Công nợ hiện tại (VNĐ)"
              type="number"
              placeholder="0"
              error={errors.debtAmount} 
              className="font-medium text-cyan-600" 
              {...register("debtAmount")}
            />
            <Select
              label="Loại đại lý"
              error={errors.agentTypeId}
              {...register("agentTypeId")}
            >
              <option value="" disabled>
                -- Chọn loại --
              </option>
              <option value="1">Loại 1</option>
              <option value="2">Loại 2</option>
            </Select>
            <Select
              label="Khu vực (Quận)"
              error={errors.districtId}
              {...register("districtId")}
            >
              <option value="" disabled>
                -- Chọn quận --
              </option>
              {Array.from({ length: 20 }, (_, i) => (
                <option key={i + 1} value={`${i + 1}`}>
                  Quận {i + 1}
                </option>
              ))}
            </Select>
            <div className="md:col-span-2">
              <Input
                label="Địa chỉ chi tiết"
                placeholder="Số nhà, tên đường, phường..."
                error={errors.address}
                {...register("address")}
              />
            </div>
            <div className="md:col-span-2 flex justify-end gap-4 mt-6 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all active:scale-95"
              >
                Hủy bỏ
              </button>

              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 text-white font-bold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:to-blue-600 transition-all active:scale-95"
              >
                Lưu thay đổi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
