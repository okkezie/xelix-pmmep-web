import { clsx } from 'clsx'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import Icon from '@/components/atoms/Icon/Icon'
import Eye from '@/svgs/eye.svg'
import Eyeslash from '@/svgs/eyeslash.svg'
import styles from './TextInput.module.css'

export const TextInput = ({
    type,
    className,
    inputContainerClassName,
    placeholder,
    action,
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

    let inputType = type
    const isPasswordType = type === 'password'
    if (isPasswordType) {
        inputType = visible ? 'text' : 'password'
    }
    
    const classNameValue = clsx(
        { '!pl-9 xs-sm:!pl-10': iconName },
        (action === 'signup') ? styles.signUpInput : styles.loginInput,
        styles.input, 
        className,
    )

    return (
        <div className={clsx('mb-2 w-full', inputContainerClassName)}>
            <div className="relative items-center">
                {iconName && (
                <Icon
                    name={iconName}
                    iconStyle={clsx(
                        'absolute top-1/2 transform -translate-y-1/2 left-3',
                        iconClassName,
                    )}
                />
                )}
                {child}
                <input
                    type={inputType}
                    className={classNameValue}
                    defaultValue={defaultValue}
                    name={name}
                    placeholder={placeholder}
                    autoComplete="off"
                    {...register(name, {
                        onChange: handleInputChange,
                    })}
                />
                {isPasswordType && (
                <button
                    className="absolute right-[5%] top-[36%] cursor-pointer"
                    onClick={() => {
                        setVisible(!visible)
                    }}
                    onKeyUp={e => {
                        if (e.code === 'Space' || e.code === 'Enter') {
                            setVisible(!visible)
                        }
                    }}
                    type='button'
                >
                    {visible ? (
                        <Eye className="w-[16px] h-[16px]" />
                    ) : (
                        <Eyeslash className="w-[16px] h-[16px]" />
                    )}
                </button>
                )}
            </div>
            <p className="text-[12px] text-red mt-[2px] md:ml-4">
                {errors[name]?.message}
            </p>
        </div>
    )
}
