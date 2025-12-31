import * as yup from "yup";

export const exportInvoiceSchema = yup.object({
  agencyId: yup
    .string()
    .required("Vui lòng chọn đại lý"),

  createdDate: yup
    .string()
    .required("Vui lòng chọn ngày lập phiếu"),
});
