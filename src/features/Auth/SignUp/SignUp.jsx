// SignUpPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

// Import các component đã tạo
import Button from '../../../components/button'; // Giả sử Button.jsx nằm cùng thư mục hoặc đã được setup
import Input from '../../../components/input';   // Component Input vừa tạo

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Thêm logic xử lý đăng ký tại đây (ví dụ: gửi API)
  };

  return (
    <div className="flex h-screen w-full font-sans">
      
      {/* Cột Trái: Form Đăng ký */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full">
          
          <h2 className="text-4xl font-bold text-cyan-700 mb-8">
            Đăng ký
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Sử dụng Component Input */}
            <Input
              name="name"
              placeholder="Nguyễn Văn A" 
              value={formData.name}
              onChange={handleChange}
              required
            />
            
            <Input
              type="email"
              name="email"
              placeholder="nguyenvana@gmail.com" 
              value={formData.email}
              onChange={handleChange}
              required
            />
            
            <Input
              type="password"
              name="password"
              placeholder="**********"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Input
              type="password"
              name="confirmPassword"
              placeholder="**********"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            
            {/* Sử dụng Component Button */}
            <Button
              type="submit"
              size="full" // Kích thước full width đã định nghĩa trong Button.jsx
              className="mt-8"
            >
              Đăng ký
            </Button>
          </form>

        </div>
      </div>

      {/* Cột Phải: Chuyển sang Đăng nhập */}
      <div className="hidden lg:w-1/2 lg:flex items-center justify-center p-8 bg-cyan-500 text-white">
        <div className="text-center max-w-sm">
          
          <h2 className="text-4xl font-bold mb-6">
            Đã có tài khoản?
          </h2>
          
          <p className="text-lg mb-8">
            Hãy đăng nhập để sử dụng dịch vụ
          </p>
          
          {/* Sử dụng Component Button với variant Secondary */}
          <Link to="/login">
            <Button 
                variant="secondary" 
                size="large"
                className="rounded-full px-12!" // Ghi đè chỉ bo góc để tạo hình viên thuốc
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