import { useState } from "react";
import RuleOneEditModal from "./ModalPopup/RuleOneEditModal";
import RuleTwoEditModal from "./ModalPopup/RuleTwoEditModal";

/**
 * Giả lập data từ API
 */
const initialRules = [
  {
    id: 1,
    name: "Quy định 1",
    values: {
      soLoaiDaiLy: 2,
      soDaiLyMoiQuan: 4,
    },
    description: "",
  },
  {
    id: 2,
    name: "Quy định 2",
    values: {
      soMatHang: 5,
      soDonViTinh: 3,
      loaiDaiLy: [
        { id: 1, ten: "Đại lý loại 1", tienNoToiDa: 20000000 },
        { id: 2, ten: "Đại lý loại 2", tienNoToiDa: 50000000 },
      ],
    },
    description: "",
  },
];

function buildRuleDescription(rule) {
  switch (rule.id) {
    case 1: {
      const { soLoaiDaiLy, soDaiLyMoiQuan } = rule.values;
      return `Có ${soLoaiDaiLy} loại đại lý.
Trong mỗi quận có tối đa ${soDaiLyMoiQuan} đại lý.`;
    }

    case 2: {
      const { soMatHang, soDonViTinh, loaiDaiLy } = rule.values;

      const debtText = loaiDaiLy
        .map(
          (l) =>
            `${l.ten} có tiền nợ tối đa ${l.tienNoToiDa.toLocaleString()} VNĐ`
        )
        .join(".\n");

      return `Có ${soMatHang} mặt hàng, ${soDonViTinh} đơn vị tính.
${debtText}.`;
    }

    default:
      return "";
  }
}

function EditRulesPage() {
  const [rules, setRules] = useState(
    initialRules.map((r) => ({
      ...r,
      description: buildRuleDescription(r),
    }))
  );

  const [selectedRule, setSelectedRule] = useState(null);

  const handleChangeValue = (key, value) => {
    setSelectedRule((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [key]: value,
      },
    }));
  };

  const handleSave = () => {
    const updatedRule = {
      ...selectedRule,
      description: buildRuleDescription(selectedRule),
    };

    setRules((prev) =>
      prev.map((r) =>
        r.id === updatedRule.id ? updatedRule : r
      )
    );

    setSelectedRule(null);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Thay đổi quy định</h1>

      <div className="space-y-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="flex justify-between bg-white p-4 rounded-xl shadow"
          >
            <div>
              <h3 className="font-semibold">{rule.name}</h3>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {rule.description}
              </p>
            </div>

            <div className="flex items-center">
              <button
                onClick={() =>
                  setSelectedRule(
                    JSON.parse(JSON.stringify(rule))
                  )
                }
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg cursor-pointer"
              >
                Thay đổi
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ===== POPUPS ===== */}
      {selectedRule?.id === 1 && (
        <RuleOneEditModal
          rule={selectedRule}
          onClose={() => setSelectedRule(null)}
          onSave={handleSave}
          onChange={handleChangeValue}
        />
      )}

      {selectedRule?.id === 2 && (
        <RuleTwoEditModal
          rule={selectedRule}
          onClose={() => setSelectedRule(null)}
          onSave={handleSave}
          onChange={handleChangeValue}
        />
      )}
    </div>
  );
}

export default EditRulesPage;
