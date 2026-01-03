import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "./schema/schemaProduct";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { toast } from "react-toastify";
import productsApi from "../../services/productsApi";
import unitsApi from "../../services/unitsApi";
import LoadingBar from "react-top-loading-bar";
import { useRef, useState, useEffect } from "react";


function CreateProductPage() {
  const navigate = useNavigate();
  const loadingBarRef = useRef(null);
  const [units, setUnits] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    try {
      const res = await unitsApi.getAll();
      setUnits(res.data || []);
    } catch (error) {
      console.error("Lỗi tải danh sách đơn vị", error);
    }
  };

  const onSubmit = async (data) => {
    console.log(data)
    try {
      loadingBarRef.current?.continuousStart();
      await productsApi.create(data);
      toast.success("Thêm sản phẩm thành công!");
      
    } catch (error) {
      console.error("Lỗi thêm sản phẩm", error);
      toast.error("Lỗi thêm sản phẩm!");
    } finally {
      loadingBarRef.current?.complete();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <LoadingBar color="#06b6d4" ref={loadingBarRef} height={3} />

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Thêm sản phẩm</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Tên sản phẩm"
            {...register("name")}
            error={errors.name?.message}
          />

          <Input
            label="Giá"
            type="number"
            {...register("price")}
            error={errors.price?.message}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Đơn vị tính
            </label>
            <select
              {...register("unitId")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">-- Chọn đơn vị --</option>
              {units.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/list-products")}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600"
            >
              Thêm sản phẩm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProductPage;