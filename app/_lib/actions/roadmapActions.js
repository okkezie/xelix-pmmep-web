'use server'
import { deleteRequest, patch, post, put } from "@/utils/Api"
import { Constants } from "@/utils/Constants"
import { validate, failedResponse } from "@/actions/actionUtils"
import { isNullOrEmptyString } from "@/utils/helpers"
import { redirect } from "next/navigation"

const validated = [
    "title",
    "goals",
    "financialRequirements",
    "nonFinancialRequirements",
    "foreseenChallenges",
    "assumptions",
    "proposedProjects",
    "proposedInitiatives",
    "dependencies",
    "projectedImpacts",
    'period',
    'periodType',
    'startDate',
    'endDate',
    'mda'
]

export const createRoadmap = async (prevState, formData) => {
    const data = {}
    const action = formData.get('action')

    console.log({prevState})
    console.log({formData})
    console.log({action})

    const isSubmit = action === Constants.FormAction.Submit
    const isSave = action === Constants.FormAction.Save
    const id = formData.get('id')

    console.log({id})
    console.log({isSave})
    console.log({isSubmit})

    for(const pair of formData.entries()) {
        if(validated.includes(pair[0])) {
            data[pair[0]] = pair[1]
        } 
    }

    let state = {
        errors: {},
        prev: data
    }

    // validate
    if (isNullOrEmptyString(formData.get('title'))) {
        state['error'] = "You must provide a title for your roadmap before saving."
        state['errors'] = {Title: "Title is required."}
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
    if (id) {
        response = await put(`${Constants.ApiPaths.Roadmaps}/${id}`, data, true)
    } else {
        response = await post(Constants.ApiPaths.Roadmaps, data, true)
    }
    
    if (!response?.success) {
        return failedResponse(response, state)
    }
    
    return redirect(Constants.Paths.RoadmapsView.replace(Constants.Slug, response?.result?.id))
}

export const deleteRoadMapAction = async (id) => {
    return await deleteRequest(`${Constants.ApiPaths.Roadmaps}/${id}`, true)
}

export const approveRoadmap = async (id, reason) => {
    let data = {
        comment: reason
    }
    return await patch(Constants.ApiPaths.RoadmapsApprove.replace(Constants.Slug, id), data, true)
}

export const rejectRoadmap = async (id, reason) => {
    let data = {
        comment: reason
    }
    return await patch(Constants.ApiPaths.RoadmapsReject.replace(Constants.Slug, id), data, true)
}