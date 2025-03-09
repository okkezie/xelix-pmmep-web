'use client'
import { useState, useEffect } from 'react'
import { get } from "@/utils/Api"
import { Constants } from "@/utils/Constants"
import RoadmapPage from "@/components/pages/Roadmap/Roadmap"
import LoadingRoadmap from './loading'

export default function RoadmapsPage() {
    const [roadmaps, setRoadmaps] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            console.log("insinde use effedt")
            const roadmapData = await get(Constants.ApiPaths.Roadmaps, true)
            console.log({roadmapData})
            setRoadmaps(roadmapData?.result ?? [])
            setLoading(false)
        }
        fetchData()
    }, [])

    return (
        loading ? <LoadingRoadmap /> :
        <RoadmapPage roadmaps={roadmaps} />
    )
}
