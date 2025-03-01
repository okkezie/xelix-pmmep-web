'use client'
import { useState, useEffect } from 'react'
import { get } from "@/utils/Api"
import { Constants } from "@/utils/Constants"
import RoadmapPage from "@/components/pages/Roadmap/Roadmap"

export default function RoadmapsPage() {
    const [roadmaps, setRoadmaps] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const roadmapData = await get(Constants.ApiPaths.Roadmaps, true)
            setRoadmaps(roadmapData?.result ?? [])
        }
        fetchData()
    }, [])

    return (
        <RoadmapPage roadmaps={roadmaps} />
    )
}
