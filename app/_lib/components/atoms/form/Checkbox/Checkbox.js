import clsx from 'clsx'
import { useController, useFormContext } from 'react-hook-form'
import styles from './Checkbox.module.css'

export const Checkbox = ({
    label,
    className,
    name,
    id,
    type = 'solid',
    changeHandler,
    checked = false,
}) => {
    const { control } = useFormContext()
    const { field } = useController({
        name,
        control,
        defaultValue: checked,
    })
    const {
        value: checkedValue,
        onChange: selectOnChange,
        ...restOfField
    } = field

    return (
        <label className={clsx(className, styles.container)}>
            <input
                type="checkbox"
                id={id}
                className="mr-1"
                value={checkedValue}
                name={name}
                onChange={({ target }) => {
                    changeHandler(target)
                    selectOnChange(target.checked)
                }}
                checked={checked}
                {...restOfField}
            />
            {label}
            <span
                className={clsx(
                    styles.checkmark,
                    type === 'transparent' && styles.customCheckbox,
                )}
            ></span>
        </label>
    )
}
