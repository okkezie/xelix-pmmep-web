'use client'
import { get } from "@/utils/Api"
import { Constants } from "@/utils/Constants"
import { useEffect, useState } from "react"
import CreateInitiative from "@/components/pages/Initiatives/CreateInitiative"
import LoadingInitiativeEdit from "./loading"
import { getPromiseResult } from "@/utils/helpers"
import { useAuthContext } from "@/contexts/AuthContext"

export default function EditProjectPage({ params }) {
    const { userMda } = useAuthContext()
    const [initiative, setInitiative] = useState()
    const [roadmaps, setRoadmaps] = useState([])
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            const id = (await params).slug
            const mdaId = userMda?.id
            const initiativePromise = get(`${Constants.ApiPaths.Initiatives}/${id}`, true)
            const roadmapsPromise = get(Constants.ApiPaths.RoadmapByMda.replace(Constants.Slug, mdaId), true)
            const projectsPromise = get(Constants.ApiPaths.ProjectsByMda.replace(Constants.Slug, mdaId), true)
            const [initiative, roadmaps, projects] = await Promise.allSettled([initiativePromise, roadmapsPromise, projectsPromise])
            setInitiative(getPromiseResult(initiative))
            setRoadmaps(getPromiseResult(roadmaps))
            setProjects(getPromiseResult(projects))
            setLoading(false)
        }
        fetch()
    }, [params, userMda?.id])

    return ( 
        loading ? <LoadingInitiativeEdit /> :
        <CreateInitiative initiative={initiative} roadmaps={roadmaps} projects={projects} />
    )
}