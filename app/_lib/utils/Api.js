'use server'

import { Constants } from "@/utils/Constants"
import { login, logout, refreshToken, rememberMe, token } from "@/actions/actionUtils"
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
    let response = {}
    try {
        response = await send(
            Constants.ApiPaths.FileUpload, 
            Constants.ApiMethods.POST,
            data,
            true,
            Constants.ApiContentTypes.FormData)
    }
    catch (error) {
        return errorResponse(error)
    }
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

const sendRequest = async (path, method, data, auth = false, repeat = true) => {
    let response = {}
    try {
        response = await send(path, method, data, auth)
    }
    catch (error) {
        return errorResponse(error)
    }
    if (!response.ok && repeat) {
        return await handleErrorResponse(response, {path, method, data, auth, repeat: false})
    }
    if (response.status === 204) {
        return {
            success: true,
            message: "Request successful"
        }
    }
    return await response.json()
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

const errorResponse = (error) => {
    console.error("Error sending request:", {error})
    return {
        success: false,
        message: error.message,
        code: error.status
    }
}

const handleErrorResponse = async (response, request = null) => {
    if (response.status === 401 && response.headers?.get('www-authenticate')?.includes('Jwt expired')) {
        return handleTokenExpired(request)
    }
    let responseObj, responseText
    if (response.status === 403) {
        responseObj = {
            error: "Unauthorized",
            code: response.status
        }
    }
    else {
        try {
            responseObj = await response.json()
            responseText = await response.text()
        } catch {
            console.log("Invalid response body")
        }
        if (!responseObj && responseText) {
            try {
                responseObj = JSON.parse(responseText)
            }
            catch (error){
                console.log(error)
                console.log("Response text: ", responseText)
            }
        }
    }

    return {
        success: false,
        message: responseObj ? (responseObj?.message ?? responseObj?.error) ?? `${responseObj?.title} - ${responseObj?.detail}` : responseText,
        code: responseObj?.code ?? responseObj?.status ?? response.status,
        errors: responseObj?.errors,
        result: responseObj?.result
    }
}

const refreshAccessToken = async (request) => {
    const jwt = await token()
    const refresh = await refreshToken()
    if (token && refreshToken) {
        const response = await send(
            Constants.ApiPaths.RefreshAccessToken,
            Constants.ApiMethods.POST, 
            {
                'jwt': jwt, 
                'refreshToken': refresh
            }
        )
        if (response?.ok) {
            const result = await response.json()
            await logout()
            await login(result, true)
            if (request) {
                return sendRequest(request?.path, request?.method, request?.data, request?.auth, request?.repeat)
            }
            return(Constants.Paths.Dashboard)
        }
    }
    await logout()
    return redirect(Constants.Paths.SignIn)
}

const handleTokenExpired = async (request) => {
    console.log('Token expired...................')
    const remember = await rememberMe()
    if (remember) {
        console.log("Remember me set. Refreshing token...")
        return await refreshAccessToken(request)
    }
    else {
        console.log("Logging out...")
        await logout()
        return redirect(Constants.Paths.SignIn)
    }
}
