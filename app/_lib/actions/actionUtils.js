import { isNullOrEmptyString, toTitleCase } from "@/utils/helpers"
import { cookies } from "next/headers"
import { Constants } from "../utils/Constants"

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