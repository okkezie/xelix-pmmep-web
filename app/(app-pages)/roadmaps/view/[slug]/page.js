'use client'
import ViewRoadmap from "@/components/pages/Roadmap/ViewRoadmap"
import { get } from "@/utils/Api"
import { Constants } from "@/utils/Constants"
import { useEffect, useState } from "react"
import LoadingRoadmapPage from "./loading"

export default function ViewRoadmapPage({ params }) {
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
        loading ? <LoadingRoadmapPage /> :
        <ViewRoadmap roadmap={roadmap} />
    )
}
