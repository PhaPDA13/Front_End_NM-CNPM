import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../../components/Input";
import { schema } from "../schema/schemaSignUp";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const naviagate = useNavigate()
  const onSubmit = (data) => {
    localStorage.setItem("accessToken", true)
    console.log(data)
    naviagate("/")

  };

  return (
    <div className="flex h-screen w-full font-sans">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full">
          <h2 className="text-4xl font-bold text-cyan-700 mb-8">Đăng ký</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 flex flex-col"
          >
            <Input
              label="Họ tên"
              placeholder="Nguyễn Văn A"
              {...register("name")}
              error={errors.name}
            />

            <Input
              label="Email"
              placeholder="email@gmail.com"
              {...register("email")}
              error={errors.email}
            />

            <Input
              label="Mật khẩu"
              type="password"
              {...register("password")}
              error={errors.password}
            />

            <Input
              label="Xác nhận mật khẩu"
              type="password"
              {...register("confirmPassword")}
              error={errors.confirmPassword}
            />

            <Button type="submit" size="full">
              Đăng ký
            </Button>
          </form>
        </div>
      </div>

      <div className="hidden lg:w-1/2 lg:flex items-center justify-center p-8 bg-cyan-500 text-white">
        <div className="text-center max-w-sm">
          <h2 className="text-4xl font-bold mb-6">Đã có tài khoản?</h2>

          <p className="text-lg mb-8">Hãy đăng nhập để sử dụng dịch vụ</p>

          <Link to="/signin">
            <Button
              variant="secondary"
              size="large"
              className="rounded-full px-12!" 
            >
              Đăng nhập
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
