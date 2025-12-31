import * as yup from "yup";

export const agencySchema = yup.object({
  name: yup.string().required("Tên đại lý không được để trống"),

  phone: yup
    .string()
    .required("Số điện thoại không được để trống")
    .matches(/^[0-9]{9,11}$/, "Số điện thoại không hợp lệ"),

  email: yup
    .string()
    .required("Email không được để trống")
    .email("Email không hợp lệ"),

  address: yup.string().required("Địa chỉ không được để trống"),

  receiveDate: yup.string().required("Chọn ngày tiếp nhận"),

  type: yup.string().required("Chọn loại đại lý"),

  district: yup.string().required("Chọn quận"),
});
