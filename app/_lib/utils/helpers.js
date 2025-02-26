

export const getPromiseData = (promise) => {
    return promise?.value?.success ? promise?.value?.result ?? [] : []
}

export const getPromiseError = (promise) => {
    return promise?.value?.message ?? ""
}

export const getDefaultUserAvatar = (seed) => {
    const useDicebar = process.env.NEXT_PUBLIC_USE_DICEBAR === "true"
    if (useDicebar) {
        return `https://api.dicebear.com/9.x/initials/svg?seed=${seed}`
    }
    return `https://ui-avatars.com/api/?name=${seed}`
}

export const isNullOrEmptyString = (value) => {
    return value === null || value === undefined || value === ""
}
