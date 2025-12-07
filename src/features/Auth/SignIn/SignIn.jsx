import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

// Import các component đã tạo
import Button from '../../../components/Button'; 
import Input from '../../../components/Input';

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: 'nguyenvana@gmail.com', // Giá trị mặc định theo ảnh
    password: '*************',     // Giá trị mặc định theo ảnh
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login form submitted:', formData);
    // Thêm logic xử lý đăng nhập tại đây
  };

  return (
    // Toàn bộ trang: full màn hình, chia thành 2 cột chính
    <div className="flex h-screen w-full font-sans">
      
      {/* 1. Cột Trái: Chuyển sang Đăng ký (Nền xanh ngọc) */}
      <div className="hidden lg:w-1/2 lg:flex items-center justify-center p-8 bg-cyan-500 text-white">
        <div className="text-center max-w-sm">
          
          {/* Tiêu đề Xin chào */}
          <h2 className="text-5xl font-bold mb-4">
            Xin chào
          </h2>
          
          <p className="text-lg mb-10">
            Hãy đăng ký nếu bạn chưa có tài khoản
          </p>
          
          {/* Nút Đăng ký (Nút trắng) */}
          <Link to="/signup">
            <Button 
                variant="secondary" 
                size="large"
                className="rounded-full px-12!" // Ghi đè bo góc để tạo hình viên thuốc
            >
              Đăng ký
            </Button>
          </Link>
          
        </div>
      </div>

      {/* 2. Cột Phải: Form Đăng nhập (Nền trắng) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full">
          
          {/* Tiêu đề Đăng nhập */}
          <h2 className="text-4xl font-bold text-cyan-700 mb-8 text-center lg:text-left">
            Đăng nhập
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Input: Email */}
            <Input
              type="email"
              name="email"
              placeholder="nguyenvana@gmail.com" 
              value={formData.email}
              onChange={handleChange}
              required
            />
            
            {/* Input: Mật khẩu */}
            <Input
              type="password"
              name="password"
              placeholder="**********"
              value={formData.password}
              onChange={handleChange}
              required
            />
            
            {/* Quên mật khẩu? */}
            <div className="text-right pt-2">
                <Link to="/forgot-password" className="text-gray-600 hover:text-cyan-600 transition duration-150 text-base font-medium">
                    Quên mật khẩu?
                </Link>
            </div>

            {/* Nút Đăng nhập */}
            <Button
              type="submit"
              size="large" 
              className="w-full mt-4" // Làm nút Đăng nhập full width hơn
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