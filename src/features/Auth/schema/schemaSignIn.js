import * as yup from "yup";

export const schema = yup.object({
  username: yup
    .string()
    .trim()
    .required("Vui lòng nhập tên tài khoản")
    .min(4, "Nhập ít nhất 4 kí tự"),

  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(8, "Mật khẩu có ít nhất 8 kí tự"),

});
