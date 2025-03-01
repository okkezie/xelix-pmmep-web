'use client'
import { get } from "@/utils/Api"
import { Constants } from "@/utils/Constants"
import CreateRoadmap from "@/components/pages/Roadmap/CreateRoadmap"
import { useEffect, useState } from "react"

export default function EditRoadmapPage({ params }) {
    const [roadmap, setRoadmap] = useState()
    useEffect(() => {
        const fetch = async () => {
            const id = (await params).slug
            const result = await get(`${Constants.ApiPaths.Roadmaps}/${id}`, true)
            setRoadmap(result?.result)
        }
        fetch()
    }, [params])
    return (
        <CreateRoadmap roadmap={roadmap} />
    )
}