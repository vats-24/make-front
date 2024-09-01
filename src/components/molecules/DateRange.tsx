import React from "react";

interface DateRangeSelectorProps {
  selectedRange: string;
  onDateRangeChange: (range: string) => void;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ selectedRange, onDateRangeChange }) => {
  const handleRangeChange = (range: string) => {
    onDateRangeChange(range);
  };

  return (
    <div className="flex justify-center mb-4 h-10 items-center">
      <button
        className={`px-4 py-2 mx-1 h-8 rounded-md flex items-center ${
          selectedRange === "alldate" ? "bg-[#6425FE] text-white" : "bg-gray-200"
        }`}
        onClick={() => handleRangeChange("alldate")}
      >
        All Date
      </button>

      <button
        className={`px-4 py-2 mx-1 h-8 rounded-md flex items-center ${
          selectedRange === "7days" ? "bg-[#6425FE] text-white" : "bg-gray-200"
        }`}
        onClick={() => handleRangeChange("7days")}
      >
        7 Days
      </button>

      <button
        className={`px-4 py-2 mx-1 h-8 rounded-md flex items-center ${
          selectedRange === "30days" ? "bg-[#6425FE] text-white" : "bg-gray-200"
        }`}
        onClick={() => handleRangeChange("30days")}
      >
        30 Days
      </button>

      <button
        className={`px-4 py-2 mx-1 h-8 rounded-md flex items-center ${
          selectedRange === "12months" ? "bg-[#6425FE] text-white" : "bg-gray-200"
        }`}
        onClick={() => handleRangeChange("12months")}
      >
        12 Months
      </button>
    </div>
  );
};

export default DateRangeSelector;
