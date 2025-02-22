import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import Image from 'next/image'
import styles from './SelectPhotoInput.module.css'
import CoveredCheckbox from '@/svgs/covered-checkbox.svg'
import AppUtils from '@/utils/AppUtils'
import { forwardRef } from 'react'

const SelectPhotoInput = ({
    name,
    id,
    data,
    alt = '',
    imageWrapperStyle,
    selectCallback,
    selected=false,
}, ref) => {
    const { register } = useFormContext()
    if (AppUtils.isEmptyString(alt) && data?.user) {
        alt = `Image by ${data?.user.name}`
    }
    return (
        <div
            className='relative h-[180px]'
            ref={ref}
        >
            <input
                type="radio"
                name={name}
                id={id}
                className={styles['radio-image-input']}
                value={JSON.stringify(data?.urls)}
                {...register(name)}
                onClick={() => selectCallback?.(data)}
                checked={selected}
            />
            <label htmlFor={id} className={styles.label}>
                <div className={imageWrapperStyle}>
                    <Image
                        src={data?.urls?.iconUrl}
                        alt={alt}
                        className={clsx(
                            'cursor-pointer',
                            '!relative object-cover',
                        )}
                        fill
                        sizes="100%"
                        loading="lazy"
                    />
                    {data?.user?.name && 
                    <p className='absolute bottom-0 left-0 text-white bg-[linear-gradient(0deg,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.00)_100%)]'>
                        <small className='text-[10px]'>
                            Credit: <a href={data?.user?.url} target='_blank'>{AppUtils.truncateText(data?.user?.name, 10)}</a>
                        </small>
                    </p>
                    }
                </div>

                <span className={styles['cover-checkbox']}>
                    <CoveredCheckbox />
                </span>
            </label>
        </div>
    )
}

export default forwardRef(SelectPhotoInput)
