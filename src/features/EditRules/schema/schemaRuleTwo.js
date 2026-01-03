import * as yup from "yup";

export const ruleTwoSchema = (loaiDaiLy = []) =>
  yup.object({
    soMatHang: yup.number().typeError("Phải là số").required().min(1),

    soDonViTinh: yup.number().typeError("Phải là số").required().min(1),

    tienNo: yup.object(
      loaiDaiLy.reduce((acc, loai) => {
        acc[loai.id] = yup
          .number()
          .typeError("Phải là số")
          .required("Bắt buộc nhập")
          .min(0, "Không được âm");
        return acc;
      }, {})
    ),
  });
