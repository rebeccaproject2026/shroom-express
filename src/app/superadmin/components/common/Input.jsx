const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  name,
  id,
  disabled = false,
  error = false,
  required = false,
  leftIcon,
  rightIcon,
  className = "",
  containerClassName = "",
  labelClassName = "",
  ...rest
}) => {
  const borderStyle = error ? { border: '1.13px solid #EF4444' } : { border: '1.25px solid #E2E8F0' };

  const inputClass = `w-full rounded-sm ${leftIcon ? "pl-11" : "px-4"} ${rightIcon ? "pr-11" : "px-4"} py-3.5 text-sm text-[#181211] bg-white outline-none focus:border-[#E93E2B] focus:ring-1 focus:ring-[#E93E2B]/10 placeholder:text-[#94A3B8] transition-all ${className}`.trim();

  return (
    <div className={`w-full ${containerClassName}`.trim()}>
      {label && (
        <label
          htmlFor={id}
          className={`text-base font-semibold text-[#334155] mb-1.5 block ${labelClassName}`.trim()}
        >
          {label}
          {required && <span className="text-[#E93E2B] ml-0.5">*</span>}
        </label>
      )}
      <div className="relative group">
        {leftIcon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E93E2B] flex items-center transition-colors">
            {leftIcon}
          </span>
        )}
        <input
          type={type}
          style={borderStyle}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          id={id}
          disabled={disabled}
          className={inputClass}
          {...rest}
        />
        {rightIcon && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 flex items-center">
            {rightIcon}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
