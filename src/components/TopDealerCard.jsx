import React from "react";

function TopDealerCard({ dealer, index }) {
  console.log(dealer)
  return (
    <div
      className={`
        flex justify-between items-center p-4 rounded-xl transition duration-200
        ${dealer.isTop
          ? "bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500"
          : "bg-gray-50 dark:bg-gray-700"}
      `}
    >
      {/* Thông tin đại lý */}
      <div className="flex items-center">
        <span
          className={`
            text-xl font-bold mr-4
            ${dealer.isTop ? "text-yellow-700 dark:text-yellow-400" : "text-gray-500 dark:text-gray-400"}
          `}
        >
          {index + 1}
        </span>

        <div>
          <p className="text-base font-semibold text-gray-900 dark:text-white">
            {dealer.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {dealer.location}
          </p>
          {dealer.orderCount !== undefined && (
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              {dealer.orderCount} đơn hàng
            </p>
          )}
        </div>
      </div>

      {/* Doanh số & công nợ */}
      <div className="text-right">
        <p className="text-lg font-bold text-green-600 dark:text-green-400">
          {dealer.doanhSo}
        </p>
        <p className="text-xs text-red-500 dark:text-red-400">
          Nợ: {dealer.congNo}
        </p>
      </div>
    </div>
  );
}

export default TopDealerCard;
