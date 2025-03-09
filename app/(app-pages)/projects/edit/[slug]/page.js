'use client'
import CreateProject from "@/components/pages/Projects/CreateProject";
import { get } from "@/utils/Api"
import { Constants } from "@/utils/Constants"
import { useEffect, useState } from "react"
import LoadingProjecEdit from "./loading";

export default function EditProjectPage({ params }) {
    const [project, setProject] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            const id = (await params).slug
            const result = await get(`${Constants.ApiPaths.Projects}/${id}`, true)
            setProject(result?.result)
            setLoading(false)
        }
        fetch()
    }, [params])

    return ( 
        loading ? <LoadingProjecEdit /> :
        <CreateProject project={project} />
    )
}