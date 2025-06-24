import React, { useState } from "react";

const availableCoupons = [
  { code: "FREESHIP", label: "Freeship cho đơn từ 1.500.000đ" },
  { code: "SALE10", label: "Giảm 10% cho đơn từ 1.000.000đ" },
];

const DiscountCodeBox = ({ onApply }) => {
  const [selectedCode, setSelectedCode] = useState("");

  const handleApply = () => {
    if (onApply && selectedCode) {
      onApply(selectedCode);
    }
  };

  return (
    <div className="border p-4 rounded shadow-sm">
      <h3 className="font-semibold mb-2">🎁 Mã giảm giá</h3>
      <select
        value={selectedCode}
        onChange={(e) => setSelectedCode(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-2"
      >
        <option value="">-- Chọn mã giảm giá --</option>
        {availableCoupons.map((coupon) => (
          <option key={coupon.code} value={coupon.code}>
            {coupon.label}
          </option>
        ))}
      </select>
      <button
        onClick={handleApply}
        disabled={!selectedCode}
        className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Áp dụng
      </button>
    </div>
  );
};

export default DiscountCodeBox;
