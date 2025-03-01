'use server'

import { Constants } from "@/utils/Constants"
import { token } from "@/actions/actionUtils"

export const get = async(path, auth = false) => {
    return await sendRequest(path, Constants.ApiMethods.GET, null, auth)
}

export const post = async (path, data, auth = false) => {
    return await sendRequest(path, Constants.ApiMethods.POST, data, auth)
}

export const put = async (path, data, auth = false) => {
    return await sendRequest(path, Constants.ApiMethods.PUT, data, auth)
}

export const patch = async (path, data, auth = false) => {
    return await sendRequest(path, Constants.ApiMethods.PATCH, data, auth)
}

export const deleteRequest = async (path, auth = false) => {
    return await sendRequest(path, Constants.ApiMethods.DELETE, null, auth)
}

const sendRequest = async (path, method, data, auth = false) => {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL
        const authToken = auth ? await token() : null
        const request = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                ...(auth ? { 'Authorization': `Bearer ${authToken}` } : {}),
            },
            body: data ? JSON.stringify(data) : null,
        }
        
        const response = await fetch(`${apiUrl}${path}`, request)
        if (!response.ok) {
            let responseObj = await response.text()
            if (responseObj) {
                try {
                    responseObj = JSON.parse(responseObj)
                }
                catch (error){
                    console.log(error)
                    console.log("Response text: ", responseObj)
                }
            }
            else if (response.status === 403) {
                responseObj = {
                    error: "Unauthorized",
                    code: response.status
                }
            }

            return {
                success: false,
                message: responseObj?.error || `${responseObj?.title} - ${responseObj?.detail}`,
                code: responseObj?.code ?? responseObj?.status ?? response.sttus,
                errors: responseObj?.errors,
                result: responseObj?.result
            }
        }
        if (response.status === 204) {
            return {
                success: true,
                message: "Request successful"
            }
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

