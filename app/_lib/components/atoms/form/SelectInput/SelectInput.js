import clsx from 'clsx'
import { twJoin } from 'tailwind-merge'
import Select from 'react-select'
import { useController, useFormContext } from 'react-hook-form'
import Icon from '@/components/atoms/Icon/Icon'

export const SelectInput = ({
    options,
    placeholder,
    className,
    name,
    styles,
    defaultValue = '',
    selectInputContainer,
    iconName,
    iconClassName,
}) => {
    const {
        control,
        formState: { errors },
    } = useFormContext()

    const { field } = useController({
        name,
        defaultValue: defaultValue,
        control: control,
    })

    let {
        value: selectedValue,
        onChange: selectOnChange,
        ...restOfField
    } = field

    return (
        <div className={twJoin('mb-2 outline-1', selectInputContainer)}>
            <div className={clsx({ 'relative': iconName })}>
                {iconName && (
                    <Icon
                        name={iconName}
                        iconStyle={clsx(
                            'absolute top-1/2 transform -translate-y-1/2 left-3 z-[999]',
                            iconClassName,
                        )}
                    />
                )}
                <Select
                    id="react-select"
                    options={options}
                    classNamePrefix="react-select"
                    placeholder={placeholder} 
                    className={className}
                    instanceId
                    isSearchable={true}
                    name={name}
                    value={
                        selectedValue
                            ? options.find(
                                  (option) => option.value === selectedValue,
                              )
                            : selectedValue
                    }
                    onChange={(option) =>
                        selectOnChange(option ? option.value : option)
                    }
                    styles={styles}
                    {...restOfField}
                />
            </div>
            <p className="text-[12px] text-red mt-[2px] md:ml-4">
                {errors[name]?.message}
            </p>
        </div>
    )
}