// StatCard.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const StatCard = ({ title, value, detail, type = 'user', trend = 'up' }) => {
  // Xác định màu sắc cho trend (tăng/giảm)
  const trendColor = trend === 'up' ? 'text-green-500' : 'text-red-500';
  const TrendIcon = trend === 'up' ? faArrowUp : faArrowDown;

  // Xác định icon chính
  let MainIcon = faUser;
  if (title.includes('nợ')) {
    // Thay đổi icon dựa trên tiêu đề nếu cần
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        {/* Icon nhỏ bên phải */}
        <div className="text-cyan-500 dark:text-cyan-400 text-xl">
          <FontAwesomeIcon icon={MainIcon} /> 
        </div>
      </div>

      <div className="mt-4">
        <p className="text-4xl font-bold text-gray-900 dark:text-white">{value}</p>
      </div>

      <div className="mt-2 flex items-center">
        {/* Trend Indicator */}
        {detail && (
          <>
            <FontAwesomeIcon icon={TrendIcon} className={`${trendColor} text-sm mr-2`} />
            <span className={`${trendColor} text-sm font-medium`}>{detail}</span>
          </>
        )}
        {/* Chi tiết thêm (nếu có) */}
        {title.includes('nợ') && !detail && (
           <span className="text-red-500 text-sm font-medium">Cần thu hồi</span>
        )}
      </div>
    </div>
  );
};

export default StatCard;