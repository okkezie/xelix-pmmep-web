const Button = ({
  children,
  size = "md",
  variant = "primary",
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false,
  name,
  isLoading = false
}) => {
  // Size Classes
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-3.5 text-sm",
  }

  // Variant Classes
  const variantClasses = {
    primary:
      "bg-brand-800 text-white shadow-theme-xs hover:bg-green-900 disabled:bg-gray-300",
    outline:
      "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300",
    outline_primary:
      "bg-white text-brand-800 ring-1 ring-inset ring-brand-700 hover:bg-brand-800 hover:text-white dark:bg-gray-800 dark:text-brand-50 dark:ring-brand-700 dark:hover:bg-brand-700",
    danger:
      "bg-red-800 text-white shadow-theme-xs hover:bg-red-900 disabled:bg-red-300",
    outline_danger:
      "bg-white text-red-600 ring-1 ring-inset ring-red-700 hover:bg-red-800 hover:text-red-50 dark:bg-gray-800 dark:text-red-50 dark:ring-red-700 dark:hover:bg-red-700",
    
  }

  return (
    <button
      className={`inline-flex items-center justify-center font-medium gap-2 rounded-lg transition ${className} ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      onClick={onClick}
      disabled={disabled || isLoading}
      name={name}
    >
      {
        isLoading ? <>
          <Spinner variant={variant}/> Please wait...
        </> : <>
          {startIcon && <span className="flex items-center">{startIcon}</span>}
          {children}
          {endIcon && <span className="flex items-center">{endIcon}</span>}
        </>
      }
    </button>
  );
};

export const ButtonSpinnerDark = () => {
  return (
    <span className="animate-spin mr-2">
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        opacity="0.5"
        cx="10"
        cy="10"
        r="8.75"
        stroke="white"
        strokeWidth="2.5"
      />
      <mask id="path-2-inside-1_3755_26472" fill="white">
        <path
          d="M18.2372 12.9506C18.8873 13.1835 19.6113 12.846 19.7613 12.1719C20.0138 11.0369 20.0672 9.86319 19.9156 8.70384C19.7099 7.12996 19.1325 5.62766 18.2311 4.32117C17.3297 3.01467 16.1303 1.94151 14.7319 1.19042C13.7019 0.637155 12.5858 0.270357 11.435 0.103491C10.7516 0.00440265 10.179 0.561473 10.1659 1.25187V1.25187C10.1528 1.94226 10.7059 2.50202 11.3845 2.6295C12.1384 2.77112 12.8686 3.02803 13.5487 3.39333C14.5973 3.95661 15.4968 4.76141 16.1728 5.74121C16.8488 6.721 17.2819 7.84764 17.4361 9.02796C17.5362 9.79345 17.5172 10.5673 17.3819 11.3223C17.2602 12.002 17.5871 12.7178 18.2372 12.9506V12.9506Z"
        />
      </mask>
      <path
        d="M18.2372 12.9506C18.8873 13.1835 19.6113 12.846 19.7613 12.1719C20.0138 11.0369 20.0672 9.86319 19.9156 8.70384C19.7099 7.12996 19.1325 5.62766 18.2311 4.32117C17.3297 3.01467 16.1303 1.94151 14.7319 1.19042C13.7019 0.637155 12.5858 0.270357 11.435 0.103491C10.7516 0.00440265 10.179 0.561473 10.1659 1.25187V1.25187C10.1528 1.94226 10.7059 2.50202 11.3845 2.6295C12.1384 2.77112 12.8686 3.02803 13.5487 3.39333C14.5973 3.95661 15.4968 4.76141 16.1728 5.74121C16.8488 6.721 17.2819 7.84764 17.4361 9.02796C17.5362 9.79345 17.5172 10.5673 17.3819 11.3223C17.2602 12.002 17.5871 12.7178 18.2372 12.9506V12.9506Z"
        stroke="white"
        strokeWidth="4"
        mask="url(#path-2-inside-1_3755_26472)"
      />
    </svg>
  </span>
  )
}

export const ButtonSpinnerLight = () => {
  return (
    <span className="animate-spin stroke-brand-500 text-gray-200 dark:text-gray-800 mr-2">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="10" cy="10" r="8.75" stroke="currentColor" strokeWidth="2.5" />
        <mask id="path-2-inside-1_3755_26477" fill="white">
          <path
            d="M18.2372 12.9506C18.8873 13.1835 19.6113 12.846 19.7613 12.1719C20.0138 11.0369 20.0672 9.86319 19.9156 8.70384C19.7099 7.12996 19.1325 5.62766 18.2311 4.32117C17.3297 3.01467 16.1303 1.94151 14.7319 1.19042C13.7019 0.637155 12.5858 0.270357 11.435 0.103491C10.7516 0.00440265 10.179 0.561473 10.1659 1.25187C10.1528 1.94226 10.7059 2.50202 11.3845 2.6295C12.1384 2.77112 12.8686 3.02803 13.5487 3.39333C14.5973 3.95661 15.4968 4.76141 16.1728 5.74121C16.8488 6.721 17.2819 7.84764 17.4361 9.02796C17.5362 9.79345 17.5172 10.5673 17.3819 11.3223C17.2602 12.002 17.5871 12.7178 18.2372 12.9506Z"
          />
        </mask>
        <path
          d="M18.2372 12.9506C18.8873 13.1835 19.6113 12.846 19.7613 12.1719C20.0138 11.0369 20.0672 9.86319 19.9156 8.70384C19.7099 7.12996 19.1325 5.62766 18.2311 4.32117C17.3297 3.01467 16.1303 1.94151 14.7319 1.19042C13.7019 0.637155 12.5858 0.270357 11.435 0.103491C10.7516 0.00440265 10.179 0.561473 10.1659 1.25187C10.1528 1.94226 10.7059 2.50202 11.3845 2.6295C12.1384 2.77112 12.8686 3.02803 13.5487 3.39333C14.5973 3.95661 15.4968 4.76141 16.1728 5.74121C16.8488 6.721 17.2819 7.84764 17.4361 9.02796C17.5362 9.79345 17.5172 10.5673 17.3819 11.3223C17.2602 12.002 17.5871 12.7178 18.2372 12.9506Z"
          stroke="currentStroke"
          strokeWidth="4"
          mask="url(#path-2-inside-1_3755_26477)"
        />
      </svg>
    </span>
  )
}

const Spinner = ({variant}) => variant === 'primary' ? <ButtonSpinnerDark /> : <ButtonSpinnerLight />

export default Button;
