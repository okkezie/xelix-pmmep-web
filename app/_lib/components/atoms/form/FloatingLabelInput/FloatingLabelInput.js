import { clsx } from 'clsx'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import Icon from '@/components/atoms/Icon/Icon'
import Eye from '@/svgs/eye.svg'
import Eyeslash from '@/svgs/eyeslash.svg'

import styles from './FloatingLabelInput.module.css'

export const FloatingLabelInput = ({
    type,
    className,
    placeholder,
    name,
    defaultValue,
    iconName,
    iconClassName,
    child,
    handleInputChange,
}) => {

    const {
        register,
        formState: { errors },
    } = useFormContext()
    const [visible, setVisible] = useState(false)

    const isPasswordType = type === 'password'
    const inputType = isPasswordType ? (visible ? 'text' : 'password') : type

    const classNameValue = clsx(
        className,
        styles.underline,
        'w-full rounded-[10px] bg-gray-100 relative',
        { '!pl-9 xs-sm:!pl-10': iconName },
    )

    return (
    <div className='w-full py-[6px]'>
        <div className={classNameValue}>
            <div className={clsx(styles.floating, 'relative items-center')}>
                {iconName && (
                    <Icon
                        name={iconName}
                        iconStyle={clsx(
                            'absolute top-1/2 transform -translate-y-1/2 -left-8',
                            iconClassName,
                        )}
                    />
                )}
                {child}
                <input
                    id={name}
                    type={inputType}
                    name={name}
                    className={iconName ? styles['float-input-w-icon'] : styles['float-input']}
                    required
                    defaultValue={defaultValue}
                    autoComplete="off"
                    {...register(name, {
                        onChange: handleInputChange,
                    })}
                />
                <label htmlFor={name}>{placeholder}</label>
                {isPasswordType && (
                    <span
                        className="absolute right-[5%] top-[36%] cursor-pointer"
                        onClick={() => setVisible(!visible)}
                    >
                        {visible ? (
                            <Eye className="w-[16px] h-[16px]" />
                        ) : (
                            <Eyeslash className="w-[16px] h-[16px]" />
                        )}
                    </span>
                )}
            </div>
            
        </div>
        <p className="text-[12px] text-red mt-[2px]">
            {errors[name]?.message}
        </p>
    </div>
    )
}
