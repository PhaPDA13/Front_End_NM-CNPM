import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Input from "../../../components/Input";
import Select from "../../../components/Select";
import { ruleTwoSchema } from "../schema/schemaRuleTwo";

export default function RuleTwoEditModal({
  rule,
  onClose,
  onSave,
}) {
  if (!rule || rule.id !== 2) return null;

  const loaiDaiLy = rule.values.loaiDaiLy || [];
  const [selectedLoai, setSelectedLoai] = useState(
    loaiDaiLy[0]?.id
  );

  const schema = useMemo(
    () => ruleTwoSchema(loaiDaiLy),
    [loaiDaiLy]
  );

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      soMatHang: rule.values.soMatHang,
      soDonViTinh: rule.values.soDonViTinh,
      tienNo: loaiDaiLy.reduce((acc, loai) => {
        acc[loai.id] = loai.tienNoToiDa;
        return acc;
      }, {}),
    },
  });

  useEffect(() => {
    reset();
  }, [rule, reset]);

  const onSubmit = (data) => {
    onSave({
      ...rule,
      values: {
        soMatHang: data.soMatHang,
        soDonViTinh: data.soDonViTinh,
        loaiDaiLy: loaiDaiLy.map((loai) => ({
          ...loai,
          tienNoToiDa: data.tienNo[loai.id],
        })),
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[480px] p-6">
        <h2 className="text-lg font-semibold mb-4">
          Chỉnh sửa Quy định 2
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Số mặt hàng"
            type="number"
            {...register("soMatHang")}
            error={errors.soMatHang}
          />

          <Input
            label="Số đơn vị tính"
            type="number"
            {...register("soDonViTinh")}
            error={errors.soDonViTinh}
          />

          <Select
            label="Loại đại lý"
            value={selectedLoai}
            onChange={(e) =>
              setSelectedLoai(Number(e.target.value))
            }
            options={loaiDaiLy.map((l) => ({
              id: l.id,
              name: l.ten,
            }))}
          />

          {selectedLoai && (
            <Input
              label="Tiền nợ tối đa"
              type="number"
              {...register(`tienNo.${selectedLoai}`)}
              error={errors.tienNo?.[selectedLoai]}
            />
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 hover:bg-gray-50 border rounded-lg cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              onClick={onClose}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg cursor-pointer"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
