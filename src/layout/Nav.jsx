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
} from '@fortawesome/free-solid-svg-icons';

const navItems = [
  { icon: faHome, label: 'Dashboard', to: '/dashboard' },
  { icon: faUserPlus, label: 'Tiếp nhận đại lý', to: '/receive-agency' },
  { icon: faSearch, label: 'Tra cứu đại lý', to: '/search-agency' },
  { icon: faFileAlt, label: 'Quản lý xuất hàng', to: '/list-export' },
  { icon: faFileInvoiceDollar, label: 'Quản lý thu tiền', to: '/list-invoice' },
  { icon: faChartPie, label: 'Báo cáo', to: '/reports' },
  { icon: faEdit, label: 'Thay đổi quy định', to: '/edit-rules' },
];

const Sidebar = () => {
  const navClass = ({ isActive }) =>
    `group flex items-center gap-4 p-3 rounded-xl transition-all
     ${isActive 
       ? 'bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300 font-semibold' 
       : 'text-gray-700 dark:text-gray-300 hover:bg-cyan-100 dark:hover:bg-gray-700'}`;

  return (
    <aside
      className="
        fixed top-0 left-0 h-screen
        bg-white dark:bg-gray-800 shadow-xl
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
          <span className="text-cyan-500 dark:text-cyan-400 text-3xl font-bold">↻</span>
          <span className="ml-2 text-xl font-bold text-cyan-500 dark:text-cyan-400 hidden lg:inline group-hover:inline">
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
    </aside>
  );
};

export default Sidebar;
