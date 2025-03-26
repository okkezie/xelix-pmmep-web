'use server'
import { post } from "@/utils/Api"
import { Constants } from "@/utils/Constants"
import { redirect } from "next/navigation"
import { isNullOrEmptyString } from "@/utils/helpers"
import { failedResponse, login } from "@/actions/actionUtils"

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

