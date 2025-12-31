// DashboardPage.jsx
import React from 'react';
import StatCard from '../../components/StatCard'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

// Dữ liệu mock cho các thẻ thống kê
const statData = [
  { title: 'Tổng đại lý', value: '156', detail: '+12 tháng này', trend: 'up' },
  { title: 'Doanh số tháng', value: '2B', detail: '+18.5%', trend: 'up' },
  { title: 'Tổng Công Nợ', value: '485M', detail: null, trend: 'down' }, // Cần thu hồi
  { title: 'Phiếu xuất tháng', value: '342', detail: '+18.5%', trend: 'up' },
];

// Dữ liệu mock cho bảng xếp hạng TOP 5
const topDealers = [
  { name: 'Đại Lý Minh Anh', location: 'Loại 1 - TP-HCM', doanhSo: '250M VNĐ', congNo: '15M', isTop: true },
  { name: 'Đại Lý Minh Anh', location: 'Loại 1 - TP-HCM', doanhSo: '180M VNĐ', congNo: '15M', isTop: false },
  { name: 'Đại Lý Minh Anh', location: 'Loại 1 - TP-HCM', doanhSo: '165M VNĐ', congNo: '15M', isTop: false },
  { name: 'Đại Lý Minh Anh', location: 'Loại 1 - TP-HCM', doanhSo: '142M VNĐ', congNo: '15M', isTop: false },
  { name: 'Đại Lý Minh Anh', location: 'Loại 1 - TP-HCM', doanhSo: '128M VNĐ', congNo: '15M', isTop: false },
];

const DashboardPage = () => {
  return (
    <div className="flex-1 h-full bg-gray-50 overflow-y-auto">
      
      {/* Khu vực Nội dung chính */}
      <main className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Tổng quan hệ thống</h1>

        {/* 1. Hàng Thống Kê Tổng Quan (Stat Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statData.map((data, index) => (
            <StatCard 
              key={index}
              title={data.title}
              value={data.value}
              detail={data.detail}
              trend={data.trend}
            />
          ))}
        </div>

        {/* 2. Bảng Xếp Hạng TOP 5 */}
        <div className="mt-10 bg-white p-6 rounded-2xl shadow-lg">
          
          {/* Tiêu đề */}
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-2" />
            TOP 5 ĐẠI LÝ THEO DOANH SỐ
          </h2>
          
          {/* Danh sách Xếp Hạng */}
          <div className="space-y-4">
            {topDealers.map((dealer, index) => (
              <div 
                key={index}
                className={`flex justify-between items-center p-4 rounded-xl transition duration-200 
                          ${dealer.isTop ? 'bg-yellow-100 border-l-4 border-yellow-500' : 'bg-gray-50'}`}
              >
                
                {/* Thông tin Đại lý */}
                <div className="flex items-center">
                  <span className={`text-xl font-bold mr-4 ${dealer.isTop ? 'text-yellow-700' : 'text-gray-500'}`}>
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-base font-semibold text-gray-900">{dealer.name}</p>
                    <p className="text-sm text-gray-500">{dealer.location}</p>
                  </div>
                </div>

                {/* Doanh số và Công nợ */}
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">{dealer.doanhSo}</p>
                  <p className="text-xs text-red-500">Nợ: {dealer.congNo}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
        
      </main>
    </div>
  );
};

export default DashboardPage;