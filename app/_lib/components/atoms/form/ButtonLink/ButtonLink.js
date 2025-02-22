import clsx from 'clsx'
import Link from 'next/link'

export const ButtonLink = ({
    label,
    href,
    bgColor = 'bg-purple-500',
    className,
    textColor = 'text-white',
    size = 'lg',
    children,
}) => {
    let height = 'h-[30px]'
    if (size === 'lg') {
        height = 'h-[50px]';
    } else if (size === 'md') {
        height = 'h-[40px]';
    }
    
    return (
        <Link
            href={href}
            className={clsx(
                className,
                bgColor,
                textColor,
                height,
                'flex justify-center items-center w-full rounded-[5px]',
            )}
        >
            {children}
            {label}
        </Link>
    )
}
