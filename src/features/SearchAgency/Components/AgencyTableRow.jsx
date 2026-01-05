import { FaEdit, FaTrashAlt } from "react-icons/fa";

const AgencyTableRow = ({ agency, onEdit, onDelete }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const getBadgeColor = (typeName) => {
    return typeName === "Loại 2"
      ? "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-800"
      : "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-100 dark:border-green-800"; 
  };
  return (
    <tr className="hover:bg-cyan-50/30 dark:hover:bg-cyan-900/20 transition-colors group border-b border-gray-100 dark:border-gray-700">
      <td className="p-4 font-mono text-gray-500 dark:text-gray-400">#{agency.id}</td>
      <td className="p-4 font-medium text-gray-800 dark:text-white">{agency.name}</td>
      <td className="p-4">
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getBadgeColor(
            agency.agentType?.name
          )}`}
        >
          {agency.agentType?.name || "N/A"}
        </span>
      </td>
      
      <td className="p-4 text-gray-600 dark:text-gray-300">
        <div className="flex flex-col gap-0.5 text-xs">
          <span className="flex items-center gap-1">📞 {agency.phone}</span>
          <span className="flex items-center gap-1 text-gray-400 dark:text-gray-500">
            📧 {agency.email}
          </span>
        </div>
      </td>
       <td className="p-4">
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold border bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800">
          {agency.district?.name || "N/A"}
        </span>
      </td>
      <td
        className="p-4 text-gray-600 dark:text-gray-300 max-w-xs truncate"
        title={agency.address}
      >
        {agency.address}
      </td>
     
      <td className="p-4 font-bold text-red-500 dark:text-red-400">
        {formatCurrency(agency.debtAmount)}
      </td>
      <td className="p-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => onEdit(agency)}
            className="p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 rounded-lg hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all shadow-sm"
            title="Cập nhật"
          >
            <FaEdit />
          </button>

          <button
            onClick={() => onDelete(agency.id)} 
            className="p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-red-500 dark:text-red-400 rounded-lg hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-sm"
            title="Xoá đại lý"
          >
            <FaTrashAlt />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AgencyTableRow;
