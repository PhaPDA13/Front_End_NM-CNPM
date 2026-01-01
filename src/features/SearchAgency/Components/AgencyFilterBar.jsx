import { FaSearch, FaFilter } from "react-icons/fa";

const AgencyFilterBar = ({ filters, onChange, onReset }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="col-span-1 md:col-span-1">
          <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">
            Tìm kiếm
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FaSearch />
            </span>
            <input
              name="keyword"
              value={filters.keyword} 
              onChange={onChange}     
              placeholder="Tên, Mã, Địa chỉ"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 outline-none transition-all text-sm"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">
            Loại đại lý
          </label>
          <div className="relative">
            <select
              name="type"
              value={filters.type}
              onChange={onChange}
              className="w-full pl-4 pr-8 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 outline-none appearance-none text-sm cursor-pointer"
            >
              <option value="ALL">Tất cả loại</option>
              <option value="Loại 1">Loại 1</option>
              <option value="Loại 2">Loại 2</option>
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 pointer-events-none">
              <FaFilter size={12} />
            </span>
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">
            Khu vực
          </label>
          <div className="relative">
            <select
              name="district"
              value={filters.district}
              onChange={onChange}
              className="w-full pl-4 pr-8 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 outline-none appearance-none text-sm cursor-pointer"
            >
              <option value="ALL">Tất cả quận</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={`Quận ${i + 1}`}>
                  Quận {i + 1}
                </option>
              ))}
              <option value="Thủ Đức">Thủ Đức</option>
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 pointer-events-none">
              <FaFilter size={12} />
            </span>
          </div>
        </div>
        <div>
          <button
            onClick={onReset}
            className="w-full py-2.5 px-4 rounded-lg bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition-colors text-sm"
          >
            Đặt lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgencyFilterBar;