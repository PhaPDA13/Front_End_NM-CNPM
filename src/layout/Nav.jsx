import React from 'react';
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
  faBox,
  faBalanceScale,
} from '@fortawesome/free-solid-svg-icons';

const navItems = [
  { icon: faHome, label: 'Dashboard', to: '/dashboard' },
  { icon: faUserPlus, label: 'Tiếp nhận đại lý', to: '/receive-agency' },
  { icon: faSearch, label: 'Tra cứu đại lý', to: '/search-agency' },
  { icon: faFileAlt, label: 'Quản lý xuất hàng', to: '/list-export' },
  { icon: faFileInvoiceDollar, label: 'Quản lý thu tiền', to: '/list-invoice' },
  { icon: faBox, label: 'Quản lý sản phẩm', to: '/list-products' },
  { icon: faBalanceScale, label: 'Đơn vị tính', to: '/list-units' },
  { icon: faChartPie, label: 'Báo cáo', to: '/reports' },
  { icon: faEdit, label: 'Thay đổi quy định', to: '/edit-rules' },
];

const Sidebar = () => {
  const navClass = ({ isActive }) =>
    `group flex items-center gap-4 p-3 rounded-xl transition-all
     ${isActive ? 'bg-cyan-100 text-cyan-700 font-semibold' : 'text-gray-700 hover:bg-cyan-100'}`;

  return (
    <aside
      className="
        fixed top-0 left-0 h-screen
        bg-white shadow-xl
        flex flex-col justify-between
        z-50
        w-20 lg:w-64
        hover:w-64
        transition-all duration-300
        overflow-hidden
        group
      "
    >
      {/* Logo */}
      <div>
        <div className="flex items-center justify-center px-4 py-6">
          <span className="text-cyan-500 text-3xl font-bold">↻</span>
          <span className="ml-2 text-xl font-bold text-cyan-500 hidden lg:inline group-hover:inline">
            myDMS
          </span>
        </div>

        {/* Menu */}
        <nav className="space-y-3 px-2">
          {navItems.map((item, idx) => (
            <NavLink key={idx} to={item.to} className={navClass}>
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-cyan-500 text-white">
                <FontAwesomeIcon icon={item.icon} />
              </div>

              {/* Label */}
              <span className="whitespace-nowrap hidden lg:inline group-hover:inline">
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* User */}
      <div className="p-3">
        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cyan-500 text-white flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} />
            </div>

            <div className="hidden lg:block group-hover:block">
              <p className="text-sm font-semibold">Nguyễn Văn A</p>
              <p className="text-xs text-gray-500">Nhân viên</p>
            </div>
          </div>

          <button className="text-red-500 hover:text-red-700 hidden lg:block group-hover:block">
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
