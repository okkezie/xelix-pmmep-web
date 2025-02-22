import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Controller, useFormContext } from 'react-hook-form'
import ReactDatePicker from 'react-datepicker'
import Icon from '@/components/atoms/Icon/Icon'
import styles from './DateInput.module.css'
import 'react-datepicker/dist/react-datepicker.css'

export const DateInput = ({
    placeholder,
    className,
    name,
    maxDate,
    minDate,
    iconName,
    iconClassName,
    containerClassName,
    defaultValue,
    changeHandler = () => {},
}) => {
    const {
        formState: { errors },
    } = useFormContext()
    
    const dateFormat = "yyyy-MM-dd"
    defaultValue = isNaN(new Date(defaultValue)) ? null : new Date(defaultValue)

    return (
        <div className={twMerge('mb-2 relative', containerClassName)}>
            {iconName && (
                <Icon
                    name={iconName}
                    iconStyle={clsx(
                        'absolute top-1/2 transform -translate-y-1/2 left-3 z-[99]',
                        iconClassName,
                    )}
                />
            )}
            {ReactDatePicker.sub}
            <Controller
                name={name}
                render={({ field: { onChange, value } }) => (
                    <ReactDatePicker
                        placeholderText={ placeholder }
                        dateFormat={dateFormat}
                        isClearable
                        className={clsx(className, styles.input, {
                            '!pl-9 xs-sm:!pl-10': iconName,
                        })}
                        selected={value ?? defaultValue}
                        onChange={(date) => {
                            onChange(date)
                            changeHandler(name, date)
                        }}
                        maxDate={maxDate}
                        minDate={minDate}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="scroll"
                    />
                )}
            />
            <p className="text-[12px] text-red mt-[2px]">
                {errors[name]?.message}
            </p>
        </div>
    )
}
