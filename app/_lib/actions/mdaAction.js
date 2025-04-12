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
    'website',
    'description',
    'ministries',
    'departments',
    'agencies',
    'address',
    'ministryItem',
    'departmentItem',
    'agencyItem'
]

const validated = [
    'name',
    'email',
    'phone',
    'website',
    'description',
    'address'
]

export const saveMda = async (_, formData) => {
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

    const {data: requestData, id} = processData(data)

    let response
    if (isNullOrEmptyString(id)) {
        response = await post(Constants.ApiPaths.MDAs, requestData, true)
    }
    else {
        const path = Constants.ApiPaths.MDAById.replace(':mdaId', id)
        response = await put(path, requestData, true)
    }
    
    if (!response?.success) {
        return failedResponse(response, state)
    }
    
    return { success: true, message: response?.message, result: response?.result }
}

const processData = (data) => {
    if (data?.ministries) {
        data.ministries = JSON.parse(data.ministries)
    }
    if (data?.ministryItem) {
        data.ministries = data?.ministries ? Array.from(new Set([...data.ministries, data.ministryItem])) : [data.ministryItem]
    }

    if (data?.departments) {
        data.departments = JSON.parse(data.departments)
    }
    if (data?.departmentItem) {
        data.departments = data?.departments ? Array.from(new Set([...data.departments, data.departmentItem])) : [data.departmentItem]
    }

    if (data?.agencies) {
        data.agencies = JSON.parse(data.agencies)
    }
    if (data?.agencyItem) {
        data.agencies = data?.agencies ? Array.from(new Set([...data.agencies, data.agencyItem])) : [data.agencyItem]
    }

    const id = data.id
    delete data.ministryItem
    delete data.departmentItem
    delete data.agencyItem
    delete data.id

    return { data, id }
}

export const deleteMda = async (id) => {
    const path = Constants.ApiPaths.MDAById.replace(':mdaId', id)
    const response = await deleteRequest(path, true)
    if (!response?.success) {
        return failedResponse(response)
    }
    return { success: true, message: response?.message, result: response?.result }
}
