import Link from "next/link"

const ButtonLink = ({
    children,
    size = "md",
    variant = "primary",
    startIcon,
    endIcon,
    href,
    disabled,
    className = "",
  }) => {
    // Size Classes
    const sizeClasses = {
      sm: "px-3 py-2 text-sm",
      md: "px-5 py-3.5 text-sm",
    };
  
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
      <Link
        className={`inline-flex items-center justify-center font-medium gap-2 rounded-lg transition ${className} ${
          sizeClasses[size]
        } ${variantClasses[variant]} ${
          disabled ? "cursor-not-allowed opacity-50" : ""
        }`}
        href={disabled ? '#' : href}
      >
        {startIcon && <span className="flex items-center">{startIcon}</span>}
        {children}
        {endIcon && <span className="flex items-center">{endIcon}</span>}
      </Link>
    )
  }
  
  export default ButtonLink
  