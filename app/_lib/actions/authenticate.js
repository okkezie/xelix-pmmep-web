'use server'
import { post } from "@/utils/Api"
import { Constants } from "@/utils/Constants"
import { redirect } from "next/navigation"
import { setCookie } from 'cookies-next/server'

export const authenticate = async (prevState, formData) => {
    const email = formData.get('email')
    const password = formData.get('password')
    const rememberMe = formData.get('rememberMe')
    
    // Validate form data

    const data = {
        email: email,
        password: password,
        rememberMe: !!rememberMe
    }
    const response = await post(Constants.ApiPaths.SignIn, data)
    console.log("Response: ", response)
    if (!response?.success) {
        let state = {
            error: response.message,
        }
        if (response.errors && response.errors.length > 0) {
            state['errors'] = {}
            response.errors.forEach(error => {
                state['errors'][error.field] = error.message
            })
        }
        return state
    }

    await login(response, !!rememberMe)
    return redirect(Constants.Paths.Dashboard)
}

const login = async (response, rememberMe) => {
    const { token, user } = response?.result || {}
    if (!token || !user) {
        throw new Error("Invalid response from server")
    }
    await setCookie(Constants.Cookies.TOKEN, token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    await setCookie(Constants.Cookies.USER, JSON.stringify(user), { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    await setCookie(Constants.Cookies.IS_AUTHENTICATED, "true", { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    if (rememberMe) {
        await setCookie(Constants.Cookies.REMEMBER_ME, "true", { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    }
}


