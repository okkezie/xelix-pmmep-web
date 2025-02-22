import clsx from 'clsx'
import styles from './Button.module.css'

export const Button = ({
    type = 'submit',
    label,
    className,
    children,
    onClick,
    onMouseOver,
    onMouseOut,
    isSubmitting,
    iconLeft,
    iconRight,
    title,
    color = 'primary',
    disabled=false
}) => {
    const bgColor = color === 'primary' ? 'bg-purple-500' : 'bg-gray-500';
    return (
        <button
            type={type}
            className={clsx(
                className,
                bgColor,
                'flex justify-center items-center h-[40px] rounded-[5px] text-white relative w-full',
                {
                    'gap-x-2': iconRight || iconLeft,
                },
            )}
            onClick={onClick}
            onMouseOver={onMouseOver}
            onFocus={onMouseOver}
            onMouseOut={onMouseOut}
            onBlur={onMouseOut}
            title={title}
            disabled={disabled}
        >
            {iconLeft}
            {isSubmitting ? (
                <div className={styles.loader}>
                    <div className={styles['loader-inner']}></div>
                </div>
            ) : (
                <>
                    {children}
                    {label}
                </>
            )}
            {iconRight}
        </button>
    )
}
