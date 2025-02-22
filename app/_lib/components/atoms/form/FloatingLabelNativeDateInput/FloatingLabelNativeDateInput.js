import { clsx } from 'clsx'
import { useFormContext } from 'react-hook-form'
import Icon from '@/components/atoms/Icon/Icon'
import styles from './FloatingLabelNativeDateInput.module.css'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import AppUtils from '@/app/_lib/utils/AppUtils'

const FloatingLabelNativeDateInput = ({
    className,
    placeholder,
    name,
    defaultValue,
    maxDate,
    minDate,
    child,
    handleInputChange,
    onChange,
    showIcon = true,
    inputType = 'date',
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext()

    const dateFormat =
        (inputType === 'datetime-local' || inputType === 'datetime') ? "yyyy-MM-dd'T'HH:mm" : 'yyyy-MM-dd'
    defaultValue = isNaN(new Date(defaultValue))
        ? null
        : format(defaultValue, dateFormat)
    minDate = isNaN(new Date(minDate)) ? null : format(minDate, dateFormat)
    maxDate = isNaN(new Date(maxDate)) ? null : format(maxDate, dateFormat)

    const classNameValue = clsx(
        className,
        styles.underline,
        'w-full !h-[50px] rounded-[10px] bg-gray-100 relative',
        { '!pl-9 xs-sm:!pl-10': showIcon },
    )

    const [textColorStyle, setTextColorStyle] = useState('!text-gray-100')
    useEffect(() => {
        if(defaultValue != null) {
            setTextColorStyle('!text-black')
        }
    }, [defaultValue])

    return (
    <div className='w-full py-[6px]'>
        <div className={classNameValue}>
            <div className={clsx(styles.floating, 'relative items-center')}>
                {showIcon && (
                <Icon
                    name="calendar"
                    iconStyle={clsx(
                        'absolute top-1/2 transform -translate-y-1/2 left-3',
                        'input-icon',
                    )}
                />
                )}
                {child}
                <input
                    type={inputType}
                    className={clsx(
                        showIcon ? styles['float-input-w-icon'] : styles['float-input'],
                        { '!pl-9 xs-sm:!pl-10': showIcon },
                        className,
                        styles['input-datepicker'],
                        textColorStyle,
                    )}
                    defaultValue={defaultValue}
                    name={name}
                    id={name}
                    autoComplete="off"
                    {...register(name, {
                        required: true,
                        onChange: (e) => {
                            onChange?.(e)
                            handleInputChange?.(name, e.target.value)
                        },
                    })}
                    onFocus={(e) => {
                        try {
                            setTextColorStyle('!text-black')
                            e.target.showPicker?.()
                        } catch {}
                    }}
                    onClick={(e) => {
                        try {
                            e.target.showPicker?.()
                        } catch {}
                    }}
                    onBlur={(e) => {
                        if(AppUtils.isEmptyString(e.target.value)) {
                            setTextColorStyle('!text-gray-100')
                        } else {
                            setTextColorStyle('!text-black')
                        }
                    }}
                    min={minDate}
                    max={maxDate}
                    required
                />
                <label htmlFor={name}>{placeholder}</label>
            </div>
        </div>
        <p className="text-[12px] text-red mt-[2px]">
            {errors[name]?.message}
        </p>
    </div>
    )
}

export default FloatingLabelNativeDateInput