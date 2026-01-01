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

  debtAmount: yup
    .number()
    .typeError("Công nợ phải là số")
    .nullable()
    .transform((value, originalValue) => (String(originalValue).trim() === "" ? null : value)), 

  address: yup.string().required("Địa chỉ không được để trống"),

  agentTypeId: yup.string().required("Chọn loại đại lý"),

  districtId: yup.string().required("Chọn quận"),
});
