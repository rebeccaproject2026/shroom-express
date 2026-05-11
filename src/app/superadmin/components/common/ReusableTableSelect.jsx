import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';

const ReusableTableSelect = ({
  value,
  onChange,
  options,
  placeholder,
  borderclass,
  className = "",
  isMulti = false,
  showCheckbox = true,
  columns = 1,
  useTags = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (val) => {
    if (isMulti) {
      let newValue = Array.isArray(value) ? [...value] : [];
      if (val === "") {
        newValue = [];
      } else {
        if (newValue.includes(val)) {
          newValue = newValue.filter(item => item !== val);
        } else {
          newValue.push(val);
        }
      }
      onChange({ target: { value: newValue } });
    } else {
      onChange({ target: { value: val } });
      setIsOpen(false);
    }
  };

  const removeTag = (e, val) => {
    e.stopPropagation();
    const newValue = value.filter(item => item !== val);
    onChange({ target: { value: newValue } });
  };

  const getLabel = () => {
    if (isMulti) {
      if (!Array.isArray(value) || value.length === 0) return <span className="text-[#475569]">{placeholder}</span>;

      if (useTags) {
        return (
          <div className="flex flex-wrap gap-1.5 py-0.5">
            {value.map((val, idx) => {
              const opt = options.find(o => (typeof o === 'object' ? o.value : o) === val);
              const label = opt ? (typeof opt === 'object' ? opt.label : opt) : val;
              return (
                <div key={idx} className="flex items-center gap-1 px-2 py-0.5 bg-[#D1D1D6] rounded-sm text-[13px] font-semibold text-[#181211]">
                  {label}
                  <Icon icon="lucide:x" width="12" className="cursor-pointer hover:text-red-500" onClick={(e) => removeTag(e, val)} />
                </div>
              );
            })}
          </div>
        );
      }

      const selectedLabels = options
        .filter(opt => value.includes(typeof opt === 'object' ? opt.value : opt))
        .map(opt => (typeof opt === 'object' ? opt.label : opt));

      if (selectedLabels.length <= 2) return selectedLabels.join(", ");
      return `${selectedLabels.length} selected`;
    }

    if (!value) return <span className="text-[#475569]">{placeholder}</span>;
    const selectedOption = options.find(opt => (typeof opt === 'object' ? opt.value : opt) === value);
    return selectedOption ? (typeof selectedOption === 'object' ? selectedOption.label : selectedOption) : placeholder;
  };

  const isValSelected = (val) => {
    if (isMulti) {
      return Array.isArray(value) && value.includes(val);
    }
    return value === val;
  };

  return (
    <div className={`relative ${className} ${isOpen ? "z-[50]" : "z-[20]"} shrink-0`} ref={dropdownRef}>
      {/* Header / Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between px-4 py-2 bg-white ${borderclass || "border-2 border-[#E8E8E8]"} rounded-[8px] text-sm font-medium focus:outline-none cursor-pointer hover:bg-gray-50 transition-all w-full text-[#181211] h-full`}
      >
        <div className="flex-1 text-left">
          {getLabel()}
        </div>
        <Icon
          icon={isOpen ? "lucide:chevron-up" : "lucide:chevron-down"}
          className="text-[#181211] shrink-0 ml-2"
          width="18"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-[9999] mt-2 min-w-full w-max max-w-[450px] bg-white rounded-[12px] shadow-[0px_10px_40px_rgba(0,0,0,0.12)] border border-[#F1F5F9] overflow-hidden animate-in fade-in zoom-in duration-200">
          <div className="py-2 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
            <div className={`grid grid-cols-${columns} gap-x-2`}>
              {options.map((opt, idx) => {
                const val = typeof opt === 'object' ? opt.value : opt;
                const label = typeof opt === 'object' ? opt.label : opt;
                const isSelected = isValSelected(val);

                return (
                  <div
                    key={idx}
                    onClick={() => handleSelect(val)}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#F8FAFC] cursor-pointer transition-colors group"
                  >
                    {showCheckbox && (
                      <div className={`w-5 h-5 flex items-center justify-center transition-all duration-200 ${isMulti ? "rounded-[4px] border" : "rounded-full border-2"
                        } ${isSelected
                          ? (isMulti ? "bg-[#EA3D2A] border-[#EA3D2A]" : "border-[#EA3D2A] bg-white")
                          : "border-[#D1D1D6] bg-white group-hover:border-[#EA3D2A]"
                        }`}>
                        {isSelected && (
                          isMulti ? (
                            <Icon icon="lucide:check" className="text-white" width="14" strokeWidth={3} />
                          ) : (
                            <div className="w-2.5 h-2.5 rounded-full bg-[#EA3D2A]" />
                          )
                        )}
                      </div>
                    )}
                    <span className={`text-[14px] font-medium text-[#181211] ${!showCheckbox && isSelected ? "text-[#EA3D2A]" : ""}`}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReusableTableSelect;
