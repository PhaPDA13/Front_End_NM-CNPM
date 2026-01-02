import { useState } from "react";

const initialRules = [
  {
    id: 1,
    name: "Quy định 1",
    description:
      "Do 2 đại lý ở 2 quận khác nhau. Tổng mức nợ của đại lý ≤ 20 triệu.",
  },
  {
    id: 2,
    name: "Quy định 2",
    description:
      "Có 5 mặt hàng, 3 đơn vị tính. Số lượng tồn kho ≥ 100.",
  },
];

function EditRulesPage() {
  const [rules, setRules] = useState(initialRules);
  const [selectedRule, setSelectedRule] = useState(null);

  /* ===== MỞ POPUP ===== */
  const handleOpenModal = (rule) => {
    setSelectedRule({ ...rule });
  };

  /* ===== ĐÓNG POPUP ===== */
  const handleCloseModal = () => {
    setSelectedRule(null);
  };

  /* ===== LƯU QUY ĐỊNH ===== */
  const handleSave = () => {
    setRules((prev) =>
      prev.map((r) =>
        r.id === selectedRule.id ? selectedRule : r
      )
    );
    handleCloseModal();
  };

  return (
    <div className="p-6 bg-gray-50 space-y-6 min-h-full">
      <h1 className="text-3xl font-bold text-gray-800">
        Thay đổi quy định
      </h1>

      <p className="text-gray-500">
        Danh sách quy định có thể thay đổi
      </p>

      {/* ===== DANH SÁCH QUY ĐỊNH ===== */}
      <div className="space-y-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="flex items-center justify-between bg-white shadow p-4 rounded-xl"
          >
            <div>
              <h3 className="font-semibold">
                {rule.name}
              </h3>
              <p className="text-sm text-gray-700">
                {rule.description}
              </p>
            </div>

            <button
              onClick={() => handleOpenModal(rule)}
              className="px-4 py-2 bg-cyan-500 text-white rounded-lg"
            >
              Thay đổi
            </button>
          </div>
        ))}
      </div>

      {/* ===== POPUP ===== */}
      {selectedRule && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[500px] p-6">
            <h2 className="text-lg font-semibold mb-4">
              Chỉnh sửa quy định
            </h2>

            <div className="space-y-4">
              {/* Tên quy định */}
              <div>
                <label className="block font-medium mb-1">
                  Tên quy định
                </label>
                <input
                  value={selectedRule.name}
                  onChange={(e) =>
                    setSelectedRule({
                      ...selectedRule,
                      name: e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded-lg"
                />
              </div>

              {/* Nội dung */}
              <div>
                <label className="block font-medium mb-1">
                  Nội dung quy định
                </label>
                <textarea
                  rows={4}
                  value={selectedRule.description}
                  onChange={(e) =>
                    setSelectedRule({
                      ...selectedRule,
                      description: e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded-lg"
                />
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 border rounded-lg"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-cyan-500 text-white rounded-lg"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditRulesPage;
