import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../../components/Input";
import { ruleOneSchema } from "../schema/schemaRuleOne";

export default function RuleOneEditModal({
  rule,
  onClose,
  onSave,
}) {
  if (!rule || rule.id !== 1) return null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(ruleOneSchema),
    defaultValues: rule.values,
  });

  /* Khi mở popup → sync dữ liệu rule vào form */
  useEffect(() => {
    reset(rule.values);
  }, [rule, reset]);

  const onSubmit = (data) => {
    onSave({
      ...rule,
      values: {
        ...rule.values,
        ...data,
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[420px] p-6">
        <h2 className="text-lg font-semibold mb-4">
          Chỉnh sửa Quy định 1
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Số loại đại lý"
            type="number"
            {...register("soLoaiDaiLy")}
            error={errors.soLoaiDaiLy}
          />

          <Input
            label="Số đại lý mỗi quận"
            type="number"
            {...register("soDaiLyMoiQuan")}
            error={errors.soDaiLyMoiQuan}
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Hủy
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg disabled:opacity-50"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
