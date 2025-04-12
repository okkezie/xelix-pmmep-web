"use server"
import { Constants } from "@/utils/Constants"
import { deleteRequest, patch, post, put } from "@/utils/Api"
import { failedResponse, validate } from "@/actions/actionUtils"
import { isNullOrEmptyString } from "@/utils/helpers"

const fields = [
    'id',
    'name',
    'address',
    'phone',
    'email',
    'website',
    'industry',
    'about',
    'size',
    'contactPersonName',
    'contactPersonPhone',
    'contactPersonEmail',
    'contactPersonDesignation',
    'contactPersonRole',
    'certifications',
    'references',
    'services',
]

const validated = [
    'name',
    'address',
    'phone',
    'email',
    'website',
    'industry',
    'about',
    'contactPersonName',
    'contactPersonPhone',
    'contactPersonEmail',
]

export const saveContractor = async (_, formData) => {
    let data = {}
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

    const id = data.id
    delete data.id

    let response
    if (isNullOrEmptyString(id)) {
        response = await post(Constants.ApiPaths.Contractors, data, true)
    }
    else {
        const path = Constants.ApiPaths.ContractorById.replace(':contractorId', id)
        response = await put(path, data, true)
    }
    
    if (!response?.success) {
        return failedResponse(response, state)
    }
    
    return { success: true, message: response?.message, result: response?.result }
}

export const deleteContractor = async (id) => {
    const path = Constants.ApiPaths.ContractorById.replace(':contractorId', id)
    const response = await deleteRequest(path, true)
    if (!response?.success) {
        return failedResponse(response)
    }
    return { success: true, message: response?.message, result: response?.result }
}

export const approveContractor = async (id) => {
    const path = Constants.ApiPaths.ContractorById.replace(':contractorId', id) + '/approve'
    const response = await patch(path, {}, true)
    if (!response?.success) {
        return failedResponse(response)
    }
    return { success: true, message: response?.message, result: response?.result }
}

export const rejectContractor = async (id) => {
    const path = Constants.ApiPaths.ContractorById.replace(':contractorId', id) + '/reject'
    const response = await patch(path, {}, true)
    if (!response?.success) {
        return failedResponse(response)
    }
    return { success: true, message: response?.message, result: response?.result }
}
