import { useForm, Controller } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { invoiceSchema } from "./schema/schemaInvoice";
import { useNavigate } from "react-router-dom";
import Select from "../../components/Select";
import Input from "../../components/Input";
import agencyApi from "../../services/agencyApi";
import { toast } from "react-toastify";
import formatCurrency from "../../helper/formatCurrenry";
import receiptApi from "../../services/receiptApi";
import LoadingBar from "react-top-loading-bar";

function CreateReceiptPage() {
  const navigate = useNavigate();
  const [agencies, setAgencies] = useState([]);
  const [debt, setDebt] = useState(0);
  const [loadingDebt, setLoadingDebt] = useState(false);

  const loadingBarRef = useRef(null);

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(invoiceSchema),
  });

  const agentId = watch("agentId");
  const amount = watch("amount");

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    agencyApi.getAll().then((res) => setAgencies(res.data));
  }, []);

  useEffect(() => {
    if (!agentId) {
      setDebt(0);
      setValue("amount", "");
      return;
    }

    const fetchAgentDetail = async () => {
      try {
        setLoadingDebt(true);
        loadingBarRef.current?.continuousStart();
        const res = await agencyApi.get(agentId);
        const currentDebt = res.data.debtAmount || 0;
        setDebt(currentDebt);
      } catch (error) {
        console.error("Lỗi lấy chi tiết đại lý:", error);
        toast.error("Không lấy được thông tin công nợ đại lý");
        setDebt(0);
      } finally {
        loadingBarRef.current.complete();
        setLoadingDebt(false);
      }
    };

    fetchAgentDetail();
  }, [agentId, setValue]);

  /* ================= VALIDATE AMOUNT ================= */
  useEffect(() => {
    if (!amount || !debt) return;

    if (Number(amount) > debt) {
      setError("amount", {
        message: "Số tiền thu không được vượt quá công nợ",
      });
    } else {
      clearErrors("amount");
    }
  }, [amount, debt, setError, clearErrors]);

  /* ================= SUBMIT ================= */
  const onSubmit = async (data) => {
    try {
      loadingBarRef.current?.continuousStart();
      const response = await receiptApi.create(data);
      console.log(response);
      toast.success(response.message || "Lập phiếu thu thành công");
      reset();
    } catch {
      toast.error("Có lỗi khi lập phiếu thu");
    }
    finally {
      loadingBarRef.current.complete();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 md:p-10 font-sans">
      <LoadingBar
        color="#06b6d4"
        ref={loadingBarRef}
        height={3}
        shadow={true}
      />
      <div className="mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-gray-800 dark:text-white tracking-tight">
          Lập phiếu thu tiền
        </h1>

        <div className="rounded-3xl bg-white dark:bg-gray-800 p-8">
          <form
            onSubmit={handleSubmit(onSubmit, (errors) =>
              console.log("LỖI VALIDATE:", errors)
            )}
            className="space-y-10"
          >
            {/* ===== THÔNG TIN CHUNG ===== */}
            <div>
              <h2 className="mb-6 text-xl font-bold text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-600 pb-2">
                Thông tin phiếu thu
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Controller
                  name="agentId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Đại lý"
                      placeholder="-- Chọn đại lý --"
                      options={agencies}
                      error={errors.agentId}
                      {...field}
                    />
                  )}
                />

                <Input
                  type="date"
                  label="Ngày thu tiền"
                  {...register("payDate")}
                  error={errors.payDate}
                />
              </div>
            </div>

            {/* ===== CÔNG NỢ ===== */}
            <div>
              <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-600 pb-2">
                Công nợ đại lý
              </h2>

              <div className="rounded-2xl bg-slate-50 dark:bg-gray-700 p-6 border border-slate-100 dark:border-gray-600">
                <p className="text-sm text-gray-500 dark:text-gray-50 mb-2">Công nợ hiện tại</p>

                <p className="text-4xl font-bold text-gray-900 dark:text-white">
                  {loadingDebt
                    ? "Đang tải..."
                    : formatCurrency(debt.toLocaleString())}
                  <span className="ml-2 text-xl text-gray-400 font-medium"></span>
                </p>
              </div>
            </div>

            {/* ===== NHẬP TIỀN THU ===== */}
            <div>
              <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-600 pb-2">
                Số tiền thu
              </h2>

              <Input
                type="number"
                label="Số tiền muốn thu"
                placeholder="Nhập số tiền"
                {...register("amount")}
                error={errors.amount}
              />

              <p className="mt-2 text-sm text-gray-500">
                Số tiền tối đa có thể thu:{" "}
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {debt.toLocaleString()} VNĐ
                </span>
              </p>
            </div>

            {/* ===== ACTION ===== */}
            <div className="flex flex-col md:flex-row justify-end items-center gap-6 pt-6 border-t border-gray-100 dark:border-gray-600">
              <button
                type="button"
                onClick={() => navigate("/list-invoice")}
                className="w-full md:w-auto h-14 px-6 rounded-xl
                border border-gray-300 dark:border-gray-900 dark:bg-white text-gray-700 font-semibold
                hover:bg-gray-100 dark:hover:bg-gray-900 dark:hover:text-white transition-all"
              >
                Quay lại
              </button>

              <button
                type="submit"
                disabled={!agentId || debt <= 0}
                className="w-full md:w-auto h-14 px-10 rounded-xl
                bg-cyan-500 text-white font-bold text-lg
                hover:bg-cyan-600
                transition-all transform active:scale-95
                disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Hoàn tất thu tiền
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateReceiptPage;
