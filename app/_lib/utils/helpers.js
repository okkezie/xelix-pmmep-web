import Badge from "@/components/atoms/Badge/Badge"
import { Constants } from "@/utils/Constants"
import { format } from "date-fns"


export const getPromiseResult = (promise) => {
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

export const toLowerCase = (text) => {
    return text?.toLowerCase()
}

export const unpluralize = (text) => {
    return text?.charAt(text?.length - 1)?.toLowerCase() === 's' 
        ? text.slice(0, text.length - 1) 
        : text
}

export const downloadPage = () => {
    window.print()
}

export const printPage = () => {
    window.print()
}

export const getDraftBadge = (isDraft) => {
    if (!isDraft) return <></>
    const icon = <svg
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.0911 3.53206C16.2124 2.65338 14.7878 2.65338 13.9091 3.53206L5.6074 11.8337C5.29899 12.1421 5.08687 12.5335 4.99684 12.9603L4.26177 16.445C4.20943 16.6931 4.286 16.9508 4.46529 17.1301C4.64458 17.3094 4.90232 17.3859 5.15042 17.3336L8.63507 16.5985C9.06184 16.5085 9.45324 16.2964 9.76165 15.988L18.0633 7.68631C18.942 6.80763 18.942 5.38301 18.0633 4.50433L17.0911 3.53206ZM14.9697 4.59272C15.2626 4.29982 15.7375 4.29982 16.0304 4.59272L17.0027 5.56499C17.2956 5.85788 17.2956 6.33276 17.0027 6.62565L16.1043 7.52402L14.0714 5.49109L14.9697 4.59272ZM13.0107 6.55175L6.66806 12.8944C6.56526 12.9972 6.49455 13.1277 6.46454 13.2699L5.96704 15.6283L8.32547 15.1308C8.46772 15.1008 8.59819 15.0301 8.70099 14.9273L15.0436 8.58468L13.0107 6.55175Z"
            fill="currentColor"
        />
    </svg>
    return <Badge variant="solid" color="light" startIcon={icon}><em>Draft</em></Badge>
}

export const getStatusBadge = (status) => {
    let color = ''
    if (status === Constants.ApprovalStatus.APPROVED) color = 'success'
    if (status === Constants.ApprovalStatus.PENDING) color = 'warning'
    if (status === Constants.ApprovalStatus.REJECTED) color = 'error'
    return <Badge variant="light" color={color}>{status}</Badge>
}

export const parseDateToMonthYear = (date) => {
    if(!date) return ''
    const d = new Date(date)
    // const months = ["January", "February", "March", "April", "May", "June", "July",
    //     "August", "September", "October", "November", "December"]
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `${months[d.getUTCMonth()]} ${d.getFullYear()}`
}

export const formatFullDate = (date) => {
    if (!date) {
        return ''
    }
    return format(date, "do MMMM yyyy")
}

export const formatShortDate = (date) => {
    if (!date || isNaN(new Date(date))) {
        return ''
    }
    return format(date, "do MMM yyyy")
}

export const formatShortNumericDate = (date) => {
    if (!date) {
        return ''
    }
    return format(date, "d/MM/yy")
}

export const formatFullNumericDate = (date) => {
    if (!date || isNaN(new Date(date))) {
        return ''
    }
    return format(date, "dd/MM/yyyy")
}

export const formatBytes = (bytes, decimals = 2) => {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}