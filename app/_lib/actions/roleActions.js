"use server"
import { Constants } from "@/utils/Constants"
import { deleteRequest, get, post, put } from "@/utils/Api"
import { failedResponse, validate } from "@/actions/actionUtils"
import { isNullOrEmptyString } from "@/utils/helpers"

const fields = [
    'id',
    'name',
    'description',
    'audience'
]

const validated = [
    'name',
    'description',
    'audience'
]

export const saveRole = async (_, formData) => {
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

    const id = data.id
    delete data.id
    let response
    if (isNullOrEmptyString(id)) {
        response = await post(Constants.ApiPaths.Roles, data, true)
    } else {
        response = await put(`${Constants.ApiPaths.Roles}/${id}`, data, true)
    }
    
    if (!response?.success) {
        return failedResponse(response, state)
    }
    
    return { success: true, message: response?.message, result: response?.result }
}

export const deleteRole = async (id) => {
    const response = await deleteRequest(`${Constants.ApiPaths.Roles}/${id}`, true)
    if (!response?.success) {
        return failedResponse(response)
    }
    return { success: true, message: response?.message, result: response?.result }
}

export const addPermissionToRole = async (roleId, permissionId) => {
    const path = Constants.ApiPaths.AssignSinglePermissionToRole
        .replace(":roleId", roleId)
        .replace(":permissionId", permissionId)
    const response = await put(path, null, true)
    if (!response?.success) {
        return failedResponse(response)
    }
    return { success: true, message: response?.message, result: response?.result }
}

export const removePermissionFromRole = async (roleId, permissionId) => {
    const path = Constants.ApiPaths.RemoveSinglePermissionFromRole
            .replace(":roleId", roleId)
            .replace(":permissionId", permissionId)
    const response = await deleteRequest(path, true)
    if (!response?.success) {
        return failedResponse(response)
    }
    return { success: true, message: response?.message, result: response?.result }
}

export const getRolePermissions = async (roleId) => {
    const path = Constants.ApiPaths.GetRolePermissions.replace(":roleId", roleId)
    const response = await get(path, true)
    if (!response?.success) {   
        return failedResponse(response)
    }
    return response?.result ?? []
}
