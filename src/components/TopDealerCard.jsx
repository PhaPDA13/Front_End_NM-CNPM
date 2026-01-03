import React from "react";

function TopDealerCard({ dealer, index }) {
  return (
    <div
      className={`
        flex justify-between items-center p-4 rounded-xl transition duration-200
        ${dealer.isTop
          ? "bg-yellow-100 border-l-4 border-yellow-500"
          : "bg-gray-50"}
      `}
    >
      {/* Thông tin đại lý */}
      <div className="flex items-center">
        <span
          className={`
            text-xl font-bold mr-4
            ${dealer.isTop ? "text-yellow-700" : "text-gray-500"}
          `}
        >
          {index + 1}
        </span>

        <div>
          <p className="text-base font-semibold text-gray-900">
            {dealer.name}
          </p>
          <p className="text-sm text-gray-500">
            {dealer.location}
          </p>
        </div>
      </div>

      {/* Doanh số & công nợ */}
      <div className="text-right">
        <p className="text-lg font-bold text-green-600">
          {dealer.doanhSo}
        </p>
        <p className="text-xs text-red-500">
          Nợ: {dealer.congNo}
        </p>
      </div>
    </div>
  );
}

export default TopDealerCard;
