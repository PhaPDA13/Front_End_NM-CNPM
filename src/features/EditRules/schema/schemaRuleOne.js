import * as yup from "yup";

export const ruleOneSchema = yup.object({
  soLoaiDaiLy: yup
    .number()
    .typeError("Phải là số")
    .required("Bắt buộc nhập")
    .min(1, "Ít nhất 1 loại đại lý"),

  soDaiLyMoiQuan: yup
    .number()
    .typeError("Phải là số")
    .required("Bắt buộc nhập")
    .min(1, "Ít nhất 1 đại lý / quận"),
});
