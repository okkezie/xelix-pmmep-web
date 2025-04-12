import { isNullOrEmptyString, toTitleCase } from "@/utils/helpers"
import { cookies } from "next/headers"
import { Constants } from "@/utils/Constants"

export const validate = (formData, fields, state) => {
    for (let field of fields) {
        if (isNullOrEmptyString(formData.get(field))) {
            state['errors'][field] = `${toTitleCase(field)} is required`
            state['error'] = "Validation error"
        }
    }
    return state
}

export const failedResponse = (response, state) => {
    if (!state) {
        state = {}
    }
    state['error'] = response?.message

    if (response?.errors && response?.errors?.length > 0) {
        state['errors'] = {}
        response?.errors?.forEach(error => {
            state['errors'][error?.field] = error?.message
        })
    }
    return state
}

export const token = async () => (await cookies()).get(Constants.Cookies.TOKEN)?.value

export const rememberMe = async () => (await cookies()).get(Constants.Cookies.REMEMBER_ME)?.value

export const refreshToken = async () => (await cookies()).get(Constants.Cookies.REFRESH_TOKEN)?.value

export const refreshTokenExpiry = async () => (await cookies()).get(Constants.Cookies.REFRESH_TOKEN_EXPIRY)?.value

export const login = async (response, rememberMe) => {
    const { token, user, refreshToken, refreshTokenExpiry } = response?.result ?? {}
    if (!token || !user) {
        throw new Error("Invalid response from server")
    }
    const cookieStore = await cookies()
    cookieStore.set(Constants.Cookies.TOKEN, token)
    cookieStore.set(Constants.Cookies.USER, JSON.stringify(user))
    cookieStore.set(Constants.Cookies.IS_AUTHENTICATED, "true")
    if (rememberMe) {
        cookieStore.set(Constants.Cookies.REFRESH_TOKEN_EXPIRY, refreshTokenExpiry)
        cookieStore.set(Constants.Cookies.REFRESH_TOKEN, refreshToken)
        cookieStore.set(Constants.Cookies.REMEMBER_ME, "true")
    }
}

export const logout = async () => {
    const cookieStore = await cookies()
    cookieStore.delete(Constants.Cookies.TOKEN)
    cookieStore.delete(Constants.Cookies.USER)
    cookieStore.delete(Constants.Cookies.USER_ID)
    cookieStore.delete(Constants.Cookies.DO_TOKEN_REFRESH)
    cookieStore.delete(Constants.Cookies.REFRESH_TOKEN)
    cookieStore.delete(Constants.Cookies.REFRESH_TOKEN_EXPIRY)
    cookieStore.delete(Constants.Cookies.CLIENT_IP_ADDRESS)
    cookieStore.delete(Constants.Cookies.REMEMBER_ME)
    cookieStore.delete(Constants.Cookies.IS_AUTHENTICATED)
}