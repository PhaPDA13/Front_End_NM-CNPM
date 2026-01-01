
import { Link, useNavigate } from 'react-router-dom'; 

import Button from '../../../components/Button'; 
import Input from '../../../components/Input';
import { useForm } from 'react-hook-form';
import { schema } from '../schema/schemaSignIn';
import { yupResolver } from '@hookform/resolvers/yup';

import {userLogin} from '../../Auth/authSlice'
import { useDispatch, useSelector } from 'react-redux';

const SignInPage = () => {

  const {register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(schema)})

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    try {
      await dispatch(userLogin(data)).unwrap();
      navigate("/");
    } catch (err) {
      
    }
  };

  return (
    <div className="flex h-screen w-full font-sans">
      <div className="hidden lg:w-1/2 lg:flex items-center justify-center p-8 bg-cyan-500 text-white">
        <div className="text-center max-w-sm">
          <h2 className="text-5xl font-bold mb-4">
            Xin chào
          </h2>
          
          <p className="text-lg mb-10">
            Hãy đăng ký nếu bạn chưa có tài khoản
          </p>
          
          <Link to="/signup">
            <Button 
                variant="secondary" 
                size="large"
                className="rounded-full px-12!" 
            >
              Đăng ký
            </Button>
          </Link>
          
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full">
          
          <h2 className="text-4xl font-bold text-cyan-700 mb-8 text-center lg:text-left">
            Đăng nhập
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
              label="Username"
              placeholder="username"
              {...register("username")}
              error={errors.username}
            />
            <Input
              label="Password"
              type="password"
              placeholder="*********"
              {...register("password")}
              error={errors.password}
            />
            
            <div className="text-right pt-2">
                <Link to="/forgot-password" className="text-gray-600 hover:text-cyan-600 transition duration-150 text-base font-medium">
                    Quên mật khẩu?
                </Link>
            </div>

            <Button
              type="submit"           
              className="w-full mt-4" 
            >
              Đăng nhập
            </Button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default SignInPage;