import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  totalItems, 
  currentCount 
}) => {
  if (totalPages <= 1) return null;
  return (
    <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between bg-white dark:bg-gray-800 rounded-b-xl">
      <span className="text-xs text-gray-500 dark:text-gray-400">
        Hiển thị <b>{currentCount}</b> trên tổng <b>{totalItems}</b> kết quả
      </span>
      <div className="flex items-center gap-1">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1.5 rounded border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-medium"
        >
          Trước
        </button>
        {(() => {
          const pages = [];
          const startPage = Math.max(1, currentPage - 1);
          const endPage = Math.min(totalPages, currentPage + 1);
          
          for (let i = startPage; i <= endPage; i++) {
            const isActive = currentPage === i;
            pages.push(
              <button
                key={i}
                onClick={() => onPageChange(i)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-all
                  ${isActive
                    ? "bg-cyan-500 text-white shadow-md shadow-cyan-200 dark:shadow-cyan-900 border border-cyan-500"
                    : "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                  }`}
              >
                {i}
              </button>
            );
          }
          return pages;
        })()}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1.5 rounded border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-medium"
        >
          Sau
        </button>
      </div>
    </div>
  );
};

export default Pagination;