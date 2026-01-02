import * as yup from "yup";

export const invoiceSchema = yup.object({
  agentId: yup.string().required("Vui lòng chọn đại lý"),
  payDate: yup.date().required("Vui lòng chọn ngày lập phiếu"),
  amount: yup
    .number()
    .typeError("Số tiền không hợp lệ")
    .positive("Số tiền phải > 0")
    .required("Vui lòng nhập số tiền"),
});
