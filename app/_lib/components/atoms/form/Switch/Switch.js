import styles from '@/components/atoms/form/ToggleSwitch/ToggleSwitch.module.css'

export const Switch = ({ value, name, onSwitch, preventDefault }) => {
    const handleClick = (event) => {
        if (preventDefault) {
            event.preventDefault()
        }
        if (onSwitch) {
            onSwitch()
        }
    }

    return (
        <label htmlFor={name}>
            <div className={styles['switch']} onClick={handleClick}>
                <input
                    type="checkbox"
                    checked={value}
                    readOnly
                    name={name}
                    id={name}
                />
                <span className={styles['slider']}></span>
            </div>
        </label>
    )
}
