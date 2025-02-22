import { clsx } from 'clsx'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import Icon from '@/components/atoms/Icon/Icon'
import styles from './CurrencyInput.module.css'

export const CurrencyInput = ({
    inputContainerClassName,
    className,
    placeholder,
    name,
    defaultValue,
    child,
    handleInputChange,
}) => {
    const {
        register,
        getValues,
        setValue,
        formState: { errors },
    } = useFormContext()

    useEffect(() => {
        register(name)
    }, [name, register])
    
    const [currentValue, setCurrentValue] = useState(!isNaN(getValues()[name]) ? Number(getValues()[name]).toLocaleString() : '')
    const classNameValue = clsx(className, styles['currency-input'])
    const handleFormatting = (value) => {
        const oldValue = getValues()[name]
        value = value.replaceAll(",", "");
        if(isNaN(value)) {
            if(oldValue) {
                setCurrentValue(Number(oldValue).toLocaleString())
                setValue(name, oldValue)
            }
        }
        else{
            setCurrentValue(Number(value).toLocaleString())
            setValue(name, Number(value))
        }
    }

    return (
        <div className={clsx('mb-2 w-full', inputContainerClassName)}>
            <div className="relative items-center">
                <Icon
                    name='moneys'
                    iconStyle='absolute top-1/2 transform -translate-y-1/2 left-3'
                />
                {child}
                <input
                    type='text'
                    className={classNameValue}
                    defaultValue={defaultValue}
                    name={name}
                    placeholder={placeholder}
                    autoComplete="off"
                    value={currentValue}
                    onChange={(e) => {
                        handleFormatting(e.target.value)
                        handleInputChange && handleInputChange(e)
                    }}
                />
            </div>
            <p className="text-[12px] text-red mt-[2px]">
                {errors[name]?.message}
            </p>
        </div>
    )
}
