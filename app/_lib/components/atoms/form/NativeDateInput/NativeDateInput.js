import { clsx } from 'clsx'
import { useFormContext } from 'react-hook-form'
import Icon from '@/components/atoms/Icon/Icon'
import styles from './NativeDateInput.module.css'
import { format } from 'date-fns'

export const NativeDateInput = ({
    className,
    inputContainerClassName,
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

    const dateFormat = inputType === 'datetime-local' ? "yyyy-MM-dd'T'HH:mm" : 'yyyy-MM-dd'
    defaultValue = isNaN(new Date(defaultValue)) ? undefined : format(defaultValue, dateFormat)
    minDate = isNaN(new Date(minDate)) ? null : format(minDate, dateFormat)
    maxDate = isNaN(new Date(maxDate)) ? null : format(maxDate, dateFormat)

    return (
        <div className={clsx('mb-2 w-full', inputContainerClassName)}>
            <div className="relative items-center w-full">
                { showIcon && (
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
                        { '!pl-9 xs-sm:!pl-10': showIcon },
                        className,
                        styles['input-datepicker'],
                        '!w-full',
                    )}
                    value={defaultValue}
                    name={name}
                    placeholder={placeholder}
                    autoComplete="off"
                    {...register(name, {
                        required: true,
                        onChange: (e) => {
                            onChange?.(e)
                            handleInputChange?.(name, e.target.value)
                        },
                    })}
                    onFocus={(e) => {
                        try { e.target.showPicker() } catch {} 
                    }}
                    onClick={(e) => {
                        try { e.target.showPicker() } catch {}
                    }}
                    min={minDate}
                    max={maxDate}
                />
            </div>
            <p className="text-[12px] text-red mt-[2px] md:ml-4">
                {errors[name]?.message}
            </p>
        </div>
    )
}
