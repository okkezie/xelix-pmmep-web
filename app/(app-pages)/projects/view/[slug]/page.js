'use client'

import ViewProject from "@/components/pages/Projects/ViewProject"
import { get } from "@/utils/Api"
import { Constants } from "@/utils/Constants"
import { useEffect, useState } from "react"
import LoadingProjectPage from "./loading"

export default function ViewProjectPage({ params }) {

    const [project, setProject] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const id = (await params).slug
            const result = await get(`${Constants.ApiPaths.Projects}/${id}`, true)
            setProject(result?.result)
            setLoading(false)
        }
        fetchData()
    }, [params])

    return (
        loading ? <LoadingProjectPage /> :
        <ViewProject project={project} />
    )
}