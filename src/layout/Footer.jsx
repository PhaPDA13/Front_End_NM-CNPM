import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Giả sử bạn đã cài đặt các icon này
import { 
  faCube, 
  faTags, 
} from '@fortawesome/free-solid-svg-icons'; 
import { 
  faInstagram, 
  faTwitter, 
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    // Toàn bộ footer: Màu nền xanh (cyan), padding, vị trí tương đối
    <footer className="bg-cyan-500 pt-20 pb-4 text-white relative overflow-hidden">
      
      {/* Mô phỏng hiệu ứng sóng/đường cong phức tạp bằng cách sử dụng một hình dạng CSS 
        hoặc một SVG ở đây nếu cần, nhưng chúng ta sẽ bỏ qua để giữ sự đơn giản của Tailwind. 
        Màu nền đã cung cấp hiệu ứng cơ bản.
      */}

      {/* Container chính: Đặt ở giữa, phân chia 4 cột (logo, nav, social, bottom) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start">
        
        {/* Cột Logo */}
        <div className="flex-1 mb-8 md:mb-0">
          <div className="bg-white p-3 rounded shadow-lg inline-block">
            {/* Logo myDMS và icon xoay */}
            <div className="flex items-center text-cyan-500 text-3xl font-bold">
              <span className="text-4xl mr-2 animate-spin-slow">↻</span>
              <span className="mt-1">myDMS</span>
            </div>
          </div>
        </div>

        {/* Cột Navigation Links */}
        <div className="flex-1 flex justify-start pl-0 md:pl-20 mb-8 md:mb-0">
          <ul className="list-none p-0 m-0 space-y-2 text-base">
            <li>
              <a href="/about" className="hover:underline">Về chúng tôi</a>
            </li>
            <li>
              <a href="/features" className="hover:underline">Tính năng</a>
            </li>
            <li>
              <a href="/pricing" className="hover:underline">Giá cả</a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">Liên hệ</a>
            </li>
          </ul>
        </div>

        {/* Cột Social Icons (Đơn giản hóa, sử dụng flex column) */}
        <div className="space-y-4 text-xl">
            {/* Icon 1 - Thay thế cho icon cây (hoặc bất kỳ icon nào khác) */}
            <a href="#" className="block hover:text-cyan-200" aria-label="Feature 1">
              <FontAwesomeIcon icon={faCube} />
            </a>
            {/* Icon 2 - Thay thế cho icon tag */}
            <a href="#" className="block hover:text-cyan-200" aria-label="Feature 2">
              <FontAwesomeIcon icon={faTags} />
            </a>
            {/* Icon Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="block hover:text-cyan-200" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            {/* Icon Twitter */}
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="block hover:text-cyan-200" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
        </div>
      </div>

      {/* --- Horizontal Rule để tách phần dưới cùng --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <hr className="border-t border-cyan-400 opacity-50" />
      </div>

      {/* Thanh Bottom Bar (Copyright và Policies) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 flex flex-col md:flex-row justify-between items-center text-sm">
        
        {/* Copyright */}
        <div className="mb-2 md:mb-0">
          © 2025 All Rights Reserved
        </div>
        
        {/* Links Policy */}
        <div className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-8">
          <a href="/privacy" className="hover:underline">Chính sách bảo mật</a>
          <a href="/terms" className="hover:underline">Quy định</a>
          <a href="/faq" className="hover:underline">Q&A</a>
        </div>
        
        {/* Số điện thoại */}
        <div className="mt-2 md:mt-0">
          0987654321
        </div>
      </div>
    </footer>
  );
};

export default Footer;