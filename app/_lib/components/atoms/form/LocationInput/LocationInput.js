import { clsx } from 'clsx'
import { Controller, useFormContext } from 'react-hook-form'
import Autocomplete from "react-google-autocomplete"
import Icon from '@/components/atoms/Icon/Icon'
import styles from './LocationInput.module.css'

export const LocationInput = ({
    className,
    inputContainerClassName,
    placeholder,
    name,
    defaultValue,
    child,
    onPlaceSelectedCallback,
    showIcon = true,
}) => {
    const {
        formState: { errors },
    } = useFormContext()

    const classNameValue =  clsx(
        {'!pl-9 xs-sm:!pl-10': showIcon},
        className,
        styles.input,
    )
    placeholder = defaultValue ? null : placeholder
    return (
        <div className={clsx('mb-2 w-full', inputContainerClassName)}>
            <div className="relative items-center">
                { showIcon &&
                <Icon
                    name='location'
                    iconStyle={clsx(
                        'absolute top-[50%] transform -translate-y-1/2 left-3',
                    )}
                />
                }
                {child}
                <Controller
                    name={name}
                    render={({ field: { onChange } }) => (
                        <Autocomplete
                            apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}
                            style={{ width: "100%"}}
                            className={classNameValue}
                            onPlaceSelected={(place) => {
                                onChange({target:{ name: name, value: place.formatted_address}})
                                onPlaceSelectedCallback && onPlaceSelectedCallback(place)
                            }}
                            onChange={(e) => {
                                onChange(e)
                                onPlaceSelectedCallback && onPlaceSelectedCallback({formatted_address: e.target.value})
                            }}
                            placeholder={placeholder}
                            options={{
                                types: ["(regions)"]
                            }}
                            defaultValue={defaultValue}
                            autoComplete="off"
                        />
                    )}
                />
            </div>
            <p className="text-[12px] text-red mt-[2px]">
                {errors[name]?.message}
            </p>
        </div>
    )
}