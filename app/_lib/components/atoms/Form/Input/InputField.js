
const Input = ({
  type = "text",
  id,
  name,
  placeholder,
  defaultValue,
  onChange,
  className = "",
  min,
  max,
  step,
  disabled = false,
  readOnly = false,
  success = false,
  error = false,
  hint,
}) => {
  // Determine input styles based on state (disabled, success, error)
  let inputClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${className}`;

  // Add styles for the different states
  if (disabled) {
    inputClasses += ` text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
  } else if (error) {
    inputClasses += ` text-red-800 border-red-500 focus:ring focus:ring-red-500/10  dark:text-red-400 dark:border-red-500`;
  } else if (success) {
    inputClasses += ` text-green-800 border-green-500 focus:ring-green-500/10 focus:border-green-300  dark:text-green-400 dark:border-green-500`;
  } else {
    inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
  }

  let hintClasses = "text-gray-500"
  if (error) hintClasses = "text-red-500"
  else if (success) hintClasses = "text-green-500"

  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        readOnly={readOnly}
        className={inputClasses}
      />

      {hint && (
        <p
          className={`mt-1.5 text-xs ${hintClasses}`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

export default Input;
