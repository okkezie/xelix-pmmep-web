// import clsx from 'clsx'
import { useController, useFormContext } from 'react-hook-form'
import styles from '@/components/atoms/form/ToggleSwitch/ToggleSwitch.module.css'

export const ToggleSwitch = ({ label, name, defaultValue, description }) => {
    const { control } = useFormContext()
    const { field } = useController({
        name,
        control,
        defaultValue: defaultValue,
    })
    const {
        value: checkedValue,
        onChange: selectOnChange,
        ...restOfField
    } = field

    return (
        <label
            className="mt-4 w-full flex flex-row justify-between p-2 gap-3 items-center"
            htmlFor={name}
        >
            <div className={styles['switch']}>
                <input
                    type="checkbox"
                    defaultChecked={checkedValue}
                    name={name}
                    id={name}
                    onChange={({ target }) => selectOnChange(target.checked)}
                    {...restOfField}
                />
                <span className={styles['slider']}></span>
            </div>
            <div className="flex-grow">
                <span className="font-bold">{label}</span> <br />
                <span>{description}</span>
            </div>
        </label>
    )
}
