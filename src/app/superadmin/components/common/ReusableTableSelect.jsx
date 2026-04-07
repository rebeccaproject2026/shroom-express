import React from 'react';
import { Icon } from '@iconify/react';

const ReusableTableSelect = ({ value, onChange, options, placeholder, borderclass, className = "" }) => (
  <div className={`relative ${className}`}>
    <select
      value={value}
      onChange={onChange}
      className={`appearance-none pl-4 pr-10 py-2 bg-white ${borderclass || "border-2 border-[#E8E8E8] "} rounded-sm text-sm font-medium focus:outline-none cursor-pointer hover:bg-gray-50 transition-all w-full text-[#181211] ${className}`}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt, idx) => (
        <option key={idx} value={opt.value}>{opt.label}</option>
      ))}
    </select>
    <Icon
      icon="lucide:chevron-down"
      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#181211] pointer-events-none"
      width="16"
    />
  </div>
);

export default ReusableTableSelect;
