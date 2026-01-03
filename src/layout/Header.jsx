import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { toggleTheme } from '../features/Theme/themeSlice';
import { logout } from '../features/Auth/authSlice';
import { toast } from 'react-toastify';
import axiosClient from '../services/axiosClient';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mode } = useSelector((state) => state.theme);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleLogout = async () => {
    try {
      // Call logout API to clear refresh token cookie
      await axiosClient.post('/user/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local state regardless of API result
      dispatch(logout());
      toast.success('Đăng xuất thành công!');
      navigate('/signin');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center justify-end h-16 px-6 gap-4">
        {/* Theme Toggle Button */}
        <button
          onClick={handleToggleTheme}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          title={mode === 'dark' ? 'Chế độ sáng' : 'Chế độ tối'}
        >
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-linear-to-r from-yellow-400 to-orange-500 dark:from-indigo-500 dark:to-purple-600 text-white">
            <FontAwesomeIcon icon={mode === 'dark' ? faSun : faMoon} />
          </div>
          <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-300">
            {mode === 'dark' ? 'Chế độ sáng' : 'Chế độ tối'}
          </span>
        </button>

        {/* User Info */}
        <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <div className="w-9 h-9 rounded-full bg-cyan-500 text-white flex items-center justify-center">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Nguyễn Văn A</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
          title="Đăng xuất"
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span className="hidden md:inline text-sm font-semibold">Đăng xuất</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
