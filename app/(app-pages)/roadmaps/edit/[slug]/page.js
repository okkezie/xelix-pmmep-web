'use client'
import { get } from "@/utils/Api"
import { Constants } from "@/utils/Constants"
import CreateRoadmap from "@/components/pages/Roadmap/CreateRoadmap"
import { useEffect, useState } from "react"
import LoadingRoadmapEdit from "./loading"

export default function EditRoadmapPage({ params }) {
    const [roadmap, setRoadmap] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            const id = (await params).slug
            const result = await get(`${Constants.ApiPaths.Roadmaps}/${id}`, true)
            setRoadmap(result?.result)
            setLoading(false)
        }
        fetch()
    }, [params])

    return (
        loading ? <LoadingRoadmapEdit /> :
        <CreateRoadmap roadmap={roadmap} />
    )
}