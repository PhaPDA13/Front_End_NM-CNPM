import React from 'react';
// Cần import NavLink từ React Router DOM
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUserPlus,
  faSearch,
  faFileAlt,
  faFileInvoiceDollar,
  faChartPie,
  faEdit,
  faUser,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

// Dữ liệu cho các mục menu
const navItems = [
  { icon: faHome, label: 'Dashboard', to: '/dashboard' },
  { icon: faUserPlus, label: 'Tiếp nhận đại lý', to: '/receive-agency' },
  { icon: faSearch, label: 'Tra cứu đại lý', to: '/search-agency' },
  { icon: faFileAlt, label: 'Lập phiếu xuất hàng', to: '/create-delivery' },
  { icon: faFileInvoiceDollar, label: 'Lập hóa phiếu thu tiền', to: '/create-receipt' },
  { icon: faChartPie, label: 'Báo cáo', to: '/reports' },
  { icon: faEdit, label: 'Thay đổi quy định', to: '/edit-rules' },
];

const Sidebar = () => {
  // Hàm này xác định các class cho mục đang active và không active
  const getNavLinkClass = ({ isActive }) =>
    `group flex items-center p-3 rounded-xl transition-colors duration-200 
     ${isActive
      ? 'bg-cyan-100 text-cyan-700 font-semibold' // Active state styles
      : 'text-gray-700 hover:bg-cyan-100' // Inactive state styles
    }`;

  // Hàm này xác định màu nền cho icon của mục đang active
  const getIconBgClass = ({ isActive }) =>
    `text-2xl w-8 h-8 flex items-center justify-center text-white rounded-lg transition-colors duration-200 
     ${isActive
      ? 'bg-cyan-600' // Active icon background
      : 'bg-cyan-400 group-hover:bg-cyan-500' // Inactive icon background
    }`;


  return (
    <div className="w-64 h-screen bg-white shadow-xl flex flex-col justify-between">

      {/* Phần Trên: Logo và Navigation Links */}
      <div>
        <div className="flex flex-col items-center py-8">
          {/* Thay đổi: Sử dụng Link hoặc NavLink cho logo nếu nó trỏ về trang chủ */}
          <NavLink to="/" className="flex items-center text-cyan-500 text-3xl font-bold">
            <span className="text-4xl mr-1">↻</span>
            <span className="text-xl">myDMS</span>
          </NavLink>
        </div>

        {/* Navigation Items - Sử dụng NavLink */}
        <nav className="space-y-4 px-4">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.to} // Sử dụng 'to' thay vì 'href'
              className={getNavLinkClass} // Sử dụng hàm để xác định class dựa trên isActive
            >
              {/* Icon */}
              <div className={getIconBgClass}>
                <FontAwesomeIcon icon={item.icon} />
              </div>
              {/* Label */}
              <span className="ml-4 text-base">
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Phần Dưới: Thông tin người dùng và nút Đăng xuất */}
      <div className="p-4">
        <div className="bg-gray-100 p-3 rounded-xl flex items-center justify-between">
          <div className="flex items-center">
            {/* User Icon */}
            <div className="text-3xl w-10 h-10 flex items-center justify-center bg-cyan-400 text-white rounded-full">
              <FontAwesomeIcon icon={faUser} />
            </div>
            {/* User Info */}
            <div className="ml-3">
              <p className="text-sm font-semibold text-gray-900 leading-none">
                Nguyễn Văn A
              </p>
              <p className="text-xs text-gray-500">
                Nhân viên
              </p>
            </div>
          </div>

          {/* Logout Button (Có thể dùng Link nếu đăng xuất là một route, hoặc button nếu là hàm) */}
          <button
            onClick={() => console.log('Xử lý Đăng xuất')}
            className="text-red-500 hover:text-red-700 text-xl p-1"
            aria-label="Đăng xuất"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;