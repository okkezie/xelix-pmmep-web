import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import styles from './TextAreaInput.module.css'

const TextAreaInput = ({
    type,
    name,
    placeholder,
    children,
    rows,
    className,
    defaultValue,
    maxLength = 1000,
    handleInputChange,
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext()

    return (
        <>
            <textarea
                type={type}
                {...register(name, {
                    onChange: handleInputChange,
                })}
                className={twMerge(styles.textarea, className)}
                placeholder={placeholder}
                rows={rows}
                defaultValue={defaultValue}
                maxLength={maxLength}
            >
                {children}
            </textarea>
            <p className="text-[12px] text-red mt-[2px]">
                {errors[name]?.message}
            </p>
        </>
    )
}

export default TextAreaInput
