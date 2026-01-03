import * as yup from "yup";

export const unitSchema = yup.object({
  name: yup.string().required("Vui lòng nhập tên đơn vị tính"),
});