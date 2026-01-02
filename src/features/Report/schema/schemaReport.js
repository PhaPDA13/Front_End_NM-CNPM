import * as yup from "yup";

export const reportSchema = yup.object({
  agentId: yup.string().required("Vui lòng chọn đại lý"),

  month: yup.string().required("Vui lòng chọn tháng báo cáo"),

  type: yup.string().required("Vui lòng chọn loại báo cáo"),
});
