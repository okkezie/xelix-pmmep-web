"use server"
import { Constants } from "@/utils/Constants"
import { deleteRequest, post, put } from "@/utils/Api"
import { failedResponse, validate } from "@/actions/actionUtils"
import { isNullOrEmptyString } from "@/utils/helpers"

const fields = [
    'id',
    'name',
    'email',
    'phone',
    'gender',
    'mda',
    'userType'
]

const validated = [
    'name',
    'email',
    'phone',
    'gender',
    'mda',
    'userType'
]

export const saveUser = async (_, formData) => {
    const data = {}
    for(const pair of formData.entries()) {
        if(fields.includes(pair[0])) {
            data[pair[0]] = pair[1]
        } 
    }
    let state = { errors: {}, prev: data }

    // validate
    state = validate(formData, validated, state)
    if (state['error']) {
        return state
    }
    // end validate
    data.mda = JSON.parse(data.mda)

    let response
    if (isNullOrEmptyString(data.id)) {
        response = await post(Constants.ApiPaths.Users, data, true)
    } else {
        response = await put(`${Constants.ApiPaths.Users}/${data.id}`, data, true)
    }
    
    if (!response?.success) {
        return failedResponse(response, state)
    }
    
    return { success: true, message: response?.message, result: response?.result }
}

export const deleteUser = async (id) => {
    const response = await deleteRequest(`${Constants.ApiPaths.Users}/${id}`, true)
    if (!response?.success) {
        return failedResponse(response)
    }
    return { success: true, message: response?.message, result: response?.result }
}
