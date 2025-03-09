'use server'
import { deleteRequest, patch, post, put, upload } from "@/utils/Api"
import { Constants } from "@/utils/Constants"
import { validate, failedResponse } from "@/actions/actionUtils"
import { isNullOrEmptyString } from "@/utils/helpers"
import { redirect } from "next/navigation"

const validated = [
    "name",
    "description",
    "startDate",
    "endDate",
]

const fields = [
    "name",
    "description",
    "startDate",
    "endDate",
    'mda',
    'milestones',
    'roadmap',
    'id'
]

export const createProject = async (prevState, formData) => {
    const data = {}
    const action = formData.get('action')
    const isSubmit = action === Constants.FormAction.Submit
    const isSave = action === Constants.FormAction.Save

    for(const pair of formData.entries()) {
        if(fields.includes(pair[0])) {
            data[pair[0]] = pair[1]
        } 
    }

    if (data.milestones) {
        const milestones = JSON.parse(data.milestones)
        data.milestones = milestones
    }

    let state = {
        errors: {},
        prev: data
    }

    console.log({data})

    // validate
    if (isNullOrEmptyString(formData.get('name'))) {
        state['error'] = "You must provide a name for your project before saving."
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

    console.log({data})

    let response
    if (data.id) {
        response = await put(`${Constants.ApiPaths.Projects}/${data.id}`, data, true)
    } else {
        response = await post(Constants.ApiPaths.Projects, data, true)
    }
    
    if (!response?.success) {
        return failedResponse(response, state)
    }
    
    return redirect(Constants.Paths.ProjectsView.replace(Constants.Slug, response?.result?.id))
    
}

export const deleteProject = async (id) => {
    return await deleteRequest(`${Constants.ApiPaths.Projects}/${id}`, true)
}

export const approveProject = async (id, reason) => {
    let data = {
        comment: reason
    }
    return await patch(Constants.ApiPaths.ProjectsApprove.replace(Constants.Slug, id), data, true)
}

export const rejectProject = async (id, reason) => {
    let data = {
        comment: reason
    }
    return await patch(Constants.ApiPaths.ProjectsReject.replace(Constants.Slug, id), data, true)
}

export const uploadProjectFiles = async (formData) => {
    console.log({formData})
    // let files = formData.get('files')
    // console.log({files})
    // const data = new FormData()
    // for (const file of files) {
    //     data.append('files[]', file)
    // }
    formData.append('metadata', JSON.stringify({name: 'file-name is here', type:'fileType', size: 'file size is huge'}))
    const response = await upload(formData)
    console.log({response})
}