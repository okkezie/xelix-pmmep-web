const UploadPhotoInput = ({
    containerStyle,
    name,
    className,
    label,
    onChange,
}) => {
    return (
        <div className={containerStyle}>
            <input
                type="file"
                id="photo-upload"
                className="hidden"
                accept=".png, .jpg, .jpeg, .webp, .heic, .heif"
                name={name}
                onChange={onChange}
            />

            <label
                id="file-input-label"
                htmlFor="photo-upload"
                className={className}
            >
                {label}
            </label>
        </div>
    )
}

export default UploadPhotoInput
