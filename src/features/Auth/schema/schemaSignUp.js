import * as yup from "yup";

export const schema = yup.object({
  fullName: yup
    .string()
    .trim()
    .required("Vui lòng nhập tên")
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .max(100, "Tên quá dài"),

  username: yup
    .string()
    .trim()
    .required("Vui lòng nhập username"),

  email: yup
    .string()
    .trim()
    .required("Vui lòng nhập email")
    .email("Email không hợp lệ"),

  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(8, "Mật khẩu có ít nhất 8 kí tự"),

  confirmPassword: yup
    .string()
    .required("Vui lòng xác nhận mật khẩu")
    .oneOf([yup.ref("password"), null], "Xác nhận mật khẩu không khớp"),
});
