import * as yup from "yup";

export const invoiceSchema = yup.object({
  agencyId: yup.string().required("Vui lòng chọn đại lý"),
  month: yup.string().required("Vui lòng chọn tháng"),
  createdDate: yup.date().required("Vui lòng chọn ngày lập"),
  exportIds: yup.array().min(1, "Phải chọn ít nhất 1 phiếu xuất"),
});
