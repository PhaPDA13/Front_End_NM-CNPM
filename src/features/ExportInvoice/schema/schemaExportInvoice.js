import * as yup from "yup";

export const exportInvoiceSchema = yup.object({
  agentId: yup
    .string()
    .required("Vui lòng chọn đại lý"),

  issueDate: yup
    .string()
    .required("Vui lòng chọn ngày lập phiếu"),
});
