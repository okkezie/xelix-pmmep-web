

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

export const toTitleCase = (text) => {
    return text?.charAt(0)?.toUpperCase() + text?.slice(1)
}

export const unpluralize = (text) => {
    return text?.charAt(text?.length - 1)?.toLowerCase() === 's' 
        ? text.slice(0, text.length - 1) 
        : text
}

export const downloadPage = () => {
    window.print()
}