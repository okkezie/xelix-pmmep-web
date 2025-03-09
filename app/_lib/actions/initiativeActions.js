'use server'
import { deleteRequest, patch, post, put } from "@/utils/Api"
import { Constants } from "@/utils/Constants"
import { validate, failedResponse } from "@/actions/actionUtils"
import { isNullOrEmptyString } from "@/utils/helpers"
import { redirect } from "next/navigation"

const validated = [
    "name",
    "description",
    "beneficiaries",
    "objectives",
    'startDate',
    'endDate',
]

const fields = [
    "name",
    "description",
    "beneficiaries",
    "objectives",
    'startDate',
    'endDate',
    'project',
    'roadmap',
    'mda',
    'id'
]

export const createInitiative = async (prevState, formData) => {
    const data = {}
    const action = formData.get('action')
    const isSubmit = action === Constants.FormAction.Submit
    const isSave = action === Constants.FormAction.Save

    for(const pair of formData.entries()) {
        if(fields.includes(pair[0])) {
            data[pair[0]] = pair[1]
        } 
    }

    let state = {
        errors: {},
        prev: data
    }

    // validate
    if (isNullOrEmptyString(formData.get('name'))) {
        state['error'] = "You must provide a name for your initiative before saving."
        state['errors'] = {name: "Name is required."}
        return state
    }

    if (isSubmit) {
        state = validate(formData, validated, state)
        if (state['error']) {
            return state
        }
    }
    // end validate

    if (isSave) {
        data['isDraft'] = true
    }
    else if (isSubmit) {
        data['isDraft'] = false
    }

    let response
    if (data.id) {
        response = await put(`${Constants.ApiPaths.Initiatives}/${data.id}`, data, true)
    } else {
        response = await post(Constants.ApiPaths.Initiatives, data, true)
    }
    
    if (!response?.success) {
        return failedResponse(response, state)
    }
    
    return redirect(Constants.Paths.Initiatives.replace(Constants.Slug, response?.result?.id))
}

export const deleteInitiative = async (id) => {
    return await deleteRequest(`${Constants.ApiPaths.Initiatives}/${id}`, true)
}

export const approveInitiative = async (id, reason) => {
    let data = {
        comment: reason
    }
    return await patch(Constants.ApiPaths.InitiativesApprove.replace(Constants.Slug, id), data, true)
}

export const rejectInitiative = async (id, reason) => {
    let data = {
        comment: reason
    }
    return await patch(Constants.ApiPaths.InitiativesReject.replace(Constants.Slug, id), data, true)
}