import React, { useState } from "react";

const DeliveryTimePicker = ({ onChange }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleChange = () => {
    if (onChange) {
      onChange({ date, time });
    }
  };

  return (
    <div className="border p-4 rounded shadow-sm">
      <h3 className="font-semibold mb-2">⏰ Chọn thời gian giao hàng</h3>

      <label className="block mb-2">
        Ngày:
        <input
          type="date"
          className="w-full border px-3 py-2 rounded mt-1"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>

      <label className="block mb-4">
        Giờ:
        <select
          className="w-full border px-3 py-2 rounded mt-1"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          <option value="">-- Chọn giờ --</option>
          <option value="Sáng (8h - 11h)">Sáng (8h - 11h)</option>
          <option value="Chiều (13h - 17h)">Chiều (13h - 17h)</option>
          <option value="Tối (18h - 21h)">Tối (18h - 21h)</option>
        </select>
      </label>

      <button
        onClick={handleChange}
        className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
      >
        Lưu thời gian giao
      </button>
    </div>
  );
};

export default DeliveryTimePicker;
