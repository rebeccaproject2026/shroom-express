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
  rightIcon,
  className = "",
  containerClassName = "",
  labelClassName = "",
  ...rest
}) => {
  const borderClass = error ? "border-red-500" : "border-[#D1D5DB]";

  const inputClass = `w-full border ${borderClass} rounded-md px-4 py-3 text-sm text-[#181211] bg-white outline-none focus:border-[#E93E2B] placeholder:text-[#BDBDBD] transition-colors ${rightIcon ? "pr-10" : ""} ${className}`.trim();

  return (
    <div className={`w-full ${containerClassName}`.trim()}>
      {label && (
        <label
          htmlFor={id}
          className={`text-sm font-semibold text-[#181211] mb-1.5 block ${labelClassName}`.trim()}
        >
          {label}
          {required && <span className="text-[#E93E2B] ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
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
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 flex items-center">
            {rightIcon}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
