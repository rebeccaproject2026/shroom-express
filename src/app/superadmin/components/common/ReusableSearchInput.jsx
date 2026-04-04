import React from 'react';
import { Icon } from '@iconify/react';

const ReusableSearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  inputClass = ""
}) => (
  <div className={`relative ${className}`}>
    <Icon
      icon="basil:search-outline"
      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569]"
      width="18"
    />
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`pl-10 pr-4 py-2 bg-transparent border-2 border-[#E8E8E8] rounded-md placeholder:text-[#475569] text-sm transition-all focus:outline-none w-full ${inputClass}`}
    />
  </div>
);

export default ReusableSearchInput;
