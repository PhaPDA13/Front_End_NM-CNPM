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
    <footer className="bg-cyan-500 dark:bg-gray-800 pt-4 pb-3 text-white relative overflow-hidden">
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