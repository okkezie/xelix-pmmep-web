'use server'

import { Constants } from "@/utils/Constants"
import { rememberMe, token } from "@/actions/actionUtils"
import { redirect } from "next/navigation"

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

export const upload = async (data) => {
    try {
        const response = await send(
            Constants.ApiPaths.FileUpload, 
            Constants.ApiMethods.POST,
            data,
            true,
            Constants.ApiContentTypes.FormData)
        if (!response.ok) {
            return await handleErrorResponse(response)
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

const sendRequest = async (path, method, data, auth = false) => {
    try {
        const response = await send(path, method, data, auth)
        if (!response.ok) {
            return await handleErrorResponse(response)
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

const send = async (path, method, data, auth = false, contentType = Constants.ApiContentTypes.Json) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    const authToken = auth ? await token() : null
    const request = {
        method: method,
        headers: {
            ...(contentType !== Constants.ApiContentTypes.FormData ? {'Content-Type': contentType} : {}),
            ...(auth ? { 'Authorization': `Bearer ${authToken}` } : {}),
        },
        body: data && contentType === Constants.ApiContentTypes.Json ? JSON.stringify(data) : data,
    }
    return await fetch(`${apiUrl}${path}`, request)
}

const handleErrorResponse = async (response) => {
    if (response.status === 401) {
        const remember = await rememberMe()
        if (remember) {
            return await refreshToken()
        }
        else {
            return redirect(Constants.Paths.Logout)
        }        
    }

    let responseTxt = await response.text()
    let responseObj;
    if (responseTxt) {
        try {
            responseObj = JSON.parse(responseTxt)
        }
        catch (error){
            console.log(error)
            console.log("Response text: ", responseTxt)
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
        message: responseObj ? responseObj?.error ?? `${responseObj?.title} - ${responseObj?.detail}` : responseTxt,
        code: responseObj?.code ?? responseObj?.status ?? response.sttus,
        errors: responseObj?.errors,
        result: responseObj?.result
    }
}

const refreshToken = async () => {
    // refresh token...
}