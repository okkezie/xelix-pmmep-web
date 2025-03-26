'use client'
import { get } from "@/utils/Api"
import { Constants } from "@/utils/Constants"
import { useEffect, useState } from "react"
import CreateInitiative from "@/components/pages/Initiatives/CreateInitiative";
import { useAuthContext } from "@/contexts/AuthContext"
import { getPromiseResult } from "@/utils/helpers"
import InitiativesLoading from "../loading";

export default function CreateInitiativePage() {
    const { userMda } = useAuthContext()
    const [loading, setLoading] = useState(true)
    const [roadmaps, setRoadmaps] = useState([])
    const [projects, setProjects] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const mdaId = userMda?.id
            const roadmapsPromise = get(Constants.ApiPaths.RoadmapByMda.replace(Constants.Slug, mdaId), true)
            const projectsPromise = get(Constants.ApiPaths.ProjectsByMda.replace(Constants.Slug, mdaId), true)
            const [roadmaps, projects] = await Promise.allSettled([roadmapsPromise, projectsPromise])
            setRoadmaps(getPromiseResult(roadmaps))
            setProjects(getPromiseResult(projects))
            setLoading(false)
        }
        fetchData()
    }, [userMda?.id])

    return (
        loading ? <InitiativesLoading /> :
        <CreateInitiative roadmaps={roadmaps} projects={projects} />
    )
}