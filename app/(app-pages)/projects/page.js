'use client'
import ProjectsPage from "@/components/pages/Projects/Projects"
import { get } from "@/utils/Api"
import { Constants } from "@/utils/Constants"
import { useEffect, useState } from "react"
import ProjectsLoading from "./loading"

export default function Projects() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const data = await get(Constants.ApiPaths.Projects, true)
            setProjects(data?.result ?? [])
            setLoading(false)
        }
        fetchData()
    }, [])

    return (
        loading ? <ProjectsLoading /> :
        <ProjectsPage projects={projects} />
    )
}
