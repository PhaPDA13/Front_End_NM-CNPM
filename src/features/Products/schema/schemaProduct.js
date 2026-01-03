import * as yup from "yup";

export const productSchema = yup.object({
  name: yup.string().required("Vui lòng nhập tên sản phẩm"),
  price: yup
    .number()
    .typeError("Giá không hợp lệ")
    .positive("Giá phải > 0")
    .required("Vui lòng nhập giá"),
});