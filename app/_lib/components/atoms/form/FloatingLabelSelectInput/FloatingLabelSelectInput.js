import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import Icon from '@/components/atoms/Icon/Icon'
import styles from './FloatingLabelSelectInput.module.css'

export const FloatingLabelSelectInput = ({
    options,
    placeholder,
    className,
    name,
    defaultValue = false,
    iconName,
    iconClassName,
    onChange,
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext()
    const DEFAULT = null

    if (!defaultValue || !(options.some(o => o.value === defaultValue))) {
        defaultValue = DEFAULT
    }

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
                            'absolute top-1/2 transform -translate-y-1/2 left-3 z-50',
                            iconClassName,
                        )}
                    />
                )}
                <select
                    name={name}
                    id={name}
                    className={iconName ? styles['float-input-w-icon'] : styles['float-input']}
                    required
                    defaultValue={defaultValue}
                    {...register(name, {
                        onChange: onChange,
                        value: defaultValue,
                    })}
                >
                    <option disabled value={DEFAULT}></option>
                    { options.map( option => 
                    <option 
                        key={option.value} 
                        value={option.value}
                    >
                        {option.label}
                    </option>
                    )}
                </select>
                <label htmlFor={name}>{placeholder}</label>
            </div>
        </div>
        <p className="text-[12px] text-red mt-[2px]">
            {errors[name]?.message}
        </p>
    </div>
    )
}
