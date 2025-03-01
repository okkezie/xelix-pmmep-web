'use server'
import { post } from "@/utils/Api"
import { Constants } from "@/utils/Constants"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { isNullOrEmptyString } from "@/utils/helpers"
import { failedResponse } from "@/actions/actionUtils"

export const authenticate = async (prevState, formData) => {
    const email = formData.get('email')
    const password = formData.get('password')
    const rememberMe = formData.get('rememberMe')
    
    // Validate form data
    let state = { error: false, errors: {}}
    if (isNullOrEmptyString(email)) {
        state.error = "Validation Error"
        state.errors.email = "Email is required"
    }
    if (isNullOrEmptyString(password)) {
        state.error = "Validation Error"
        state.errors.password = "Password is required"
    }
    if (state.error) {
        return state
    }
    // end validation

    const data = {
        email: email,
        password: password,
        rememberMe: !!rememberMe
    }
    const response = await post(Constants.ApiPaths.SignIn, data)
    if (!response?.success) {
        return failedResponse(response)
    }

    await login(response, !!rememberMe)
    return redirect(Constants.Paths.Dashboard)
}

const login = async (response, rememberMe) => {
    const { token, user } = response?.result || {}
    if (!token || !user) {
        throw new Error("Invalid response from server")
    }
    const cookieStore = await cookies()
    cookieStore.set(Constants.Cookies.TOKEN, token);
    cookieStore.set(Constants.Cookies.USER, JSON.stringify(user));
    cookieStore.set(Constants.Cookies.IS_AUTHENTICATED, "true");
    if (rememberMe) { 
        cookieStore.set(Constants.Cookies.REMEMBER_ME, "true");
    }
}


