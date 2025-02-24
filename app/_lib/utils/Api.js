import { Constants } from "@/utils/Constants"
import { getCookie } from "cookies-next"

export const get = async(path, auth = false) => {
    return await sendRequest(path, Constants.ApiMethods.GET, null, auth)
}

export const post = async (path, data, auth = false) => {
    return await sendRequest(path, Constants.ApiMethods.POST, data, auth)
}

export const put = async (path, data, auth = false) => {
    return await sendRequest(path, Constants.ApiMethods.PUT, data, auth)
}

export const deleteRequest = async (path, auth = false) => {
    return await sendRequest(path, Constants.ApiMethods.DELETE, null, auth)
}

export const sendRequest = async (path, method, data, auth = false) => {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL
        const token = auth ? getAuthToken() : null
        const request = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...(auth ? { 'Authorization': `Bearer ${token}` } : {}),
            },
            body: data ? JSON.stringify(data) : null,
        }
        const response = await fetch(`${apiUrl}${path}`, request)
        if (!response.ok) {
            return JSON.parse(await response.text())
        }
        return await response.json()
    }
    catch (error) {
        console.error("Error sending request:", {error})
        return {
            success: false,
            message: error.message,
            code: error.status
        }
    }
}

const getAuthToken = () => {
    return getCookie(Constants.Cookies.TOKEN)
}

class ApiError extends Error {
    constructor(message, status, response) {
        super(message)
        this.status = status
        this.response = response
    }
}

