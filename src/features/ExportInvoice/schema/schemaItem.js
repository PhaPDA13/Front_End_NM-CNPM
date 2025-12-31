import * as yup from "yup";

export const exportItemSchema = yup.object({
  product: yup.string().required("Chưa chọn mặt hàng"),
  unit: yup.string().required("Chưa có đơn vị tính"),
  quantity: yup
    .number()
    .typeError("Số lượng phải là số")
    .positive("Số lượng phải > 0")
    .required("Chưa nhập số lượng"),
  price: yup
    .number()
    .typeError("Đơn giá phải là số")
    .positive("Đơn giá phải > 0")
    .required("Chưa nhập đơn giá"),
});
