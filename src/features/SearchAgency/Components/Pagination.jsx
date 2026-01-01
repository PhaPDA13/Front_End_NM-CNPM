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
    <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white rounded-b-xl">
      <span className="text-xs text-gray-500">
        Hiển thị <b>{currentCount}</b> trên tổng <b>{totalItems}</b> kết quả
      </span>
      <div className="flex items-center gap-1">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="p-2 rounded border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <FaChevronLeft size={12} />
        </button>
        {Array.from({ length: totalPages }, (_, i) => {
          const pageNumber = i + 1;
          const isActive = currentPage === pageNumber;
          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-all
                ${isActive
                  ? "bg-cyan-500 text-white shadow-md shadow-cyan-200 border border-cyan-500"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="p-2 rounded border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <FaChevronRight size={12} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;