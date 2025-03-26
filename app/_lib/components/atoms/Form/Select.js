import { useState } from "react"

const Select = ({
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  defaultValue = "",
  id,
  name,
  disabled = false,
  readOnly = false,
  success = false,
  error = false,
  hint,
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue)
  const handleChange = (e) => {
    const value = e.target.value
    setSelectedValue(value)
    onChange?.(value)
  }

  let inputClasses = ''
  if (disabled) {
    inputClasses = ` text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
  } else if (error) {
    inputClasses = ` text-red-800 border-red-500 focus:ring focus:ring-red-500/10  dark:text-red-400 dark:border-red-500`;
  } else if (success) {
    inputClasses = ` text-green-800 border-green-500 focus:ring-green-500/10 focus:border-green-300  dark:text-green-400 dark:border-green-500`;
  }

  let hintClasses = "text-gray-500"
  if (error) hintClasses = "text-red-500"
  else if (success) hintClasses = "text-green-500"

  return (
    <div className="relative">
      <select
        className={
          `h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 `
          + ` py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 `
          + ` focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 `
          + ` dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 `
          + ` text-gray-800 dark:text-white/90 ${className} ${inputClasses}`
        }
        value={selectedValue}
        onChange={handleChange}
        id={id}
        name={name}
        disabled={disabled}
        readOnly={readOnly}
      >
        <option
          value=""
          disabled
          className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
        >
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
          >
            {option.label}
          </option>
        ))}
      </select>

      {hint && (
        <p
          className={`mt-1.5 text-xs ${hintClasses}`}
        >
          {hint}
        </p>
      )}
    </div>
  )
}

export default Select