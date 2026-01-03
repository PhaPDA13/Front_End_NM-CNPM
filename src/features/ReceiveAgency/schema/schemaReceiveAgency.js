import * as yup from "yup";

export const receiveAgentSchema = yup.object({
  name: yup
    .string()
    .required("Vui lòng nhập tên đại lý"),

  agentTypeId: yup
    .string()
    .required("Vui lòng chọn loại đại lý"),

  phone: yup
    .string()
    .required("Vui lòng nhập số điện thoại")
    .matches(/^[0-9]{9,11}$/, "Số điện thoại không hợp lệ"),

  districtId: yup
    .string()
    .required("Vui lòng chọn quận"),

  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),

  address: yup
    .string()
    .required("Vui lòng nhập địa chỉ")
});
