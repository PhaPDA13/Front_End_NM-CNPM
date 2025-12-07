import React from 'react';

// Định nghĩa kiểu dáng mặc định và các biến thể
const baseStyles = "font-semibold rounded-xl text-lg transition duration-200 shadow-md focus:outline-none focus:ring-4";

// Định nghĩa các biến thể (variants) của Button
const variantStyles = {
  // Mặc định: Màu xanh ngọc (Primary - Phổ biến nhất trong thiết kế của bạn)
  primary: "bg-cyan-500 text-white hover:bg-cyan-600 focus:ring-cyan-300",
  
  // Secondary: Màu trắng, thường dùng cho nút Đăng nhập bên cột xanh
  secondary: "bg-white text-cyan-500 hover:bg-gray-100 focus:ring-gray-300",
  
  // Danger: Màu đỏ, thường dùng cho Đăng xuất hoặc xóa
  danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-300",
  
  // Outline: Nền trong suốt, viền màu xanh
  outline: "bg-transparent text-cyan-500 border border-cyan-500 hover:bg-cyan-50 focus:ring-cyan-300",
};

// Định nghĩa kích thước (sizes) của Button
const sizeStyles = {
  small: "py-1 px-3 text-sm",
  medium: "py-2 px-6 text-base",
  large: "py-3 px-8 text-lg",
  full: "w-full py-3 px-4 text-lg", // Dùng cho nút full chiều rộng như Đăng ký
};

const Button = ({
  children, // Nội dung hiển thị bên trong nút (ví dụ: "Đăng ký")
  variant = 'primary', // Kiểu dáng: 'primary', 'secondary', 'danger', 'outline'
  size = 'large', // Kích thước: 'small', 'medium', 'large', 'full'
  className = '', // Thêm class tùy chỉnh nếu cần
  ...props // Các props HTML tiêu chuẩn như onClick, type, disabled
}) => {
  // Kết hợp các class styling lại với nhau
  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;