import * as yup from "yup";

export const schema = yup.object({
  email: yup
    .string()
    .trim()
    .required("Vui lòng nhập email")
    .email("Email không hợp lệ"),

  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(8, "Mật khẩu có ít nhất 8 kí tự"),

});
