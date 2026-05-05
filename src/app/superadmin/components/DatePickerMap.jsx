import { useState, useRef, useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";

/**
 * Get start of day in ISO string
 */
const startOfDay = (d) => {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  return date.toISOString();
};

/**
 * Get end of day in ISO string
 */
const endOfDay = (d) => {
  const date = new Date(d);
  date.setHours(23, 59, 59, 999);
  return date.toISOString();
};

/**
 * Get start of month
 */
const startOfMonth = (d) => {
  const date = new Date(d);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date.toISOString();
};

/**
 * Get end of month
 */
const endOfMonth = (d) => {
  const date = new Date(d);
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  date.setHours(23, 59, 59, 999);
  return date.toISOString();
};

/**
 * Build date range options (same as Vue DatePickerMap)
 */
const getDateRangeOptions = () => {
  const now = new Date();
  const todayEnd = endOfDay(now);

  const lastWeekStart = new Date(now);
  lastWeekStart.setDate(lastWeekStart.getDate() - 7);

  const lastMonthStart = startOfMonth(new Date(now.getFullYear(), now.getMonth() - 1));
  const lastMonthEnd = endOfMonth(new Date(now.getFullYear(), now.getMonth() - 1));

  const last3MonthsStart = new Date(now.getFullYear(), now.getMonth() - 3, 1);
  const last6MonthsStart = new Date(now.getFullYear(), now.getMonth() - 6, 1);
  const lastYearStart = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

  return [
    {
      title: "Last Week",
      value: { start: startOfDay(lastWeekStart), end: todayEnd },
    },
    {
      title: "Last Month",
      value: { start: lastMonthStart, end: lastMonthEnd },
    },
    {
      title: "Last 3 Months",
      value: { start: startOfDay(last3MonthsStart), end: todayEnd },
    },
    {
      title: "Last 6 Months",
      value: { start: startOfDay(last6MonthsStart), end: todayEnd },
    },
    {
      title: "Last Year",
      value: { start: startOfDay(lastYearStart), end: todayEnd },
    },
  ];
};

const DatePickerMap = ({
  defaultItem = 1,
  onUpdate,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const containerRef = useRef(null);
  const hasNotifiedMount = useRef(false);

  const options = useMemo(() => getDateRangeOptions(), []);

  useEffect(() => {
    const initial = options[defaultItem] ?? options[1];
    setSelected(initial);
  }, [defaultItem, options]);

  useEffect(() => {
    if (hasNotifiedMount.current || !selected) return;
    hasNotifiedMount.current = true;
    onUpdate?.({
      start: selected.value.start,
      end: selected.value.end,
      showDriver: selected.showDriver,
    });
  }, [selected, onUpdate]);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onUpdate?.({
      start: option.value.start,
      end: option.value.end,
      showDriver: option.showDriver,
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-3 bg-white border border-[#E8E8E8] px-4 py-2.5 rounded-[12px] shadow-sm text-[16px] font-semibold text-[#181211] hover:bg-gray-50 transition-all justify-between min-w-[160px] ${className}`}
      >
        <div className="flex items-center gap-2">
          <Icon icon="solar:calendar-linear" width="22" className="text-[#181211]" />
          <span className="text-[#181211] font-medium">{selected?.title || "Sort By..."}</span>
        </div>
        <Icon icon="lucide:chevron-down" width="20" className={`text-[#181211] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-full min-w-[200px] bg-white rounded-[16px] shadow-[0px_10px_40px_rgba(0,0,0,0.12)] border border-[#F1F5F9] overflow-hidden z-[9999] animate-in fade-in zoom-in duration-200">
          <div className="py-2">
            {options.map((option, index) => {
              const isSelected = selected?.title === option.title;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`w-full flex items-center justify-between px-5 py-3.5 text-[15px] font-medium transition-all ${isSelected
                    ? "bg-[#FFEDEB] text-[#181211]"
                    : "text-[#181211] hover:bg-gray-50"
                    }`}
                >
                  <span>{option.title}</span>
                  {isSelected && (
                    <Icon icon="lucide:check" width="18" className="text-[#475569]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePickerMap;
